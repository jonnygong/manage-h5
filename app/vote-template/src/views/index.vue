<template>
  <!--modal-open-->
  <div :class="['wrapper', modal ? 'modal-open' : '']"
       :style="{backgroundColor: `${otherData.body_bgc}`}">
    <div class="header">
      <img :src="otherData.header" alt="">
    </div>
    <div class="container">
      <div :class="['notice', loadMore ? 'notice--display' : 'notice--hidden']"
           :style="{fontSize: `${otherData.rule_fontsize}rem`, color: `${otherData.rule_color}`}"
           v-html="otherData.rule"></div>
      <div class="load-more">
        <span class="load-more__btn load-more__btn--enable"
              :style="{backgroundColor: `${otherData.button_bgc}`, color: `${otherData.button_color}`}"
              @click="handleMore">{{loadMore ? '隐藏': '显示'}}更多规则</span>
      </div>
      <div class="container__content">
        <div class="category" v-for="(category, index) in listData" :key="index">
          <div class="category__title" :style="{backgroundColor: `${otherData.cat_bgc}`}">
            <div class="category__title__icon" :style="{backgroundImage: `url(${otherData.cat_icon})`}">
            </div>
            <p class="category__title__text">
              {{category.title}}(共{{category.spots.length}}处，已勾选{{category.checkedList.length}}个)</p>
          </div>
          <div class="category__list">
            <div class="point"
                 :style="{flexBasis: `${100 / otherData.col_num}%`}"
                 v-for="(spot, index) in category.spots" :key="spot.id">
              <div class="point__img" @click="handleClick(spot)">
                <img v-lazy="spot.img" alt="">
              </div>
              <div class="point__text">{{`${spot.title}（${voteList[spot.id]}票）`}}`</div>
              <div class="point__action">
                <input type="checkbox"
                       :id="spot.id"
                       :value="spot.id"
                       v-model="spot.checked" @change="checkInput(category, spot)">
                <label :for="spot.id">投它一票</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container__footer">
        <button class="container__footer__btn container__footer__btn--enable"
                :style="{backgroundColor: `${otherData.button_bgc}`, color: `${otherData.button_color}`}"
                @click="submitVote">马上投票
        </button>
      </div>
    </div>
    <div class="modal" v-show="modal" @click="handleClose">
      <div class="detail"
           :style="{backgroundImage: `url('${otherData.modal_bg}')`, backgroundColor: `${otherData.modal_color}`, backgroundSize: 'cover' }"
           @click.stop="">
        <div class="detail__close" @click="handleClose"></div>
        <div class="detail__img">
          <img v-lazy="curSpot.img" alt="">
          <a :href="curSpot.url"
             target="_blank"
             class="detail__img__url" v-if="curSpot.url !== ''">查看详情</a>
        </div>
        <div class="detail__scroll" ref="wrapper">
          <div class="detail__text">
            <p class="detail__text__title">{{curSpot.title}}（{{voteList[curSpot.id]}}票）</p>
            <p class="detail__text__info"
               v-html="curSpot.info"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="follow"
         @touchmove.prevent=""
         @click="closeFollow"
         v-show="followDisplay">
      <img :src="otherData.qrcode" alt="" class="follow__img">
      <div class="follow__text"
           v-html="otherData.attention">
      </div>
    </div>
    <div class="vote-count"
         v-show="allChecked.length > 0">
      已勾选 {{ allChecked.length }} 个
    </div>
    <div class="partner"
         v-show="otherData.follow.length > 0">
      <a class="partner__item"
         v-for="(item, index) in otherData.follow"
         :key="index"
         :href="item.url">{{item.name}}</a>
    </div>
  </div>
</template>

<script>
  // 防止背景遮罩底层滚动
  function _stopPrevent(e) {
    e.preventDefault();
  }

  import BScroll from 'better-scroll';

  export default {
    name: 'index',
    data() {
      return {
        modal: false,
        followDisplay: false,
        scroll: null,
        loadMore: false,
        curSpot: {
          id: 0,
          img: '',
          title: '',
          info: '',
          url: '',
          checked: false
        },
        voteList: {},
        allChecked: [],
        listData: [],
        otherData: {
          'follow': [
            {
              'name': '',
              'url': ''
            }
          ],
          'header': '',
          'qrcode': '',
          'rule': '',
          'attention': '',
          'rule_fontsize': '1.4',
          'cat_icon': '',
          'cat_bgc': '#eb4036',
          'body_bgc': '#f9e4d7',
          'rule_color': '#f9e4d7',
          'button_bgc': '#f6b51d',
          'button_color': '#e2812b',
          'col_num': 3,
          'cat_max_vote': 0,
          'least_vote':
            ['=', '3'],
          'link': '',
          'modal_color': '',
          'modal_bg': ''
        }
      };
    },
    computed: {
      isShare() {
        return window.isShare;
      }
    },
    methods: {
      // loadmore
      handleMore() {
        this.loadMore = !this.loadMore;
      },
      // 勾选监听
      checkInput(category, spot) {
        // '' 为已关注，反之，则显示关注页面
        if (window.isShare !== '') {
          this.followDisplay = true;
          spot.checked = false;
        }
        // 当前分类勾选数
        const _checkedList = [];
        category.spots.forEach(({checked, id}) => {
          checked && _checkedList.push(id);
        });
        category.checkedList = _checkedList.slice(0);
        // 显示总勾选数
        let _allChecked = [];
        this.listData.forEach(category => {
          _allChecked = _allChecked.concat(category.checkedList);
        });
        this.allChecked = _allChecked.slice(0);

        const least_vote = +this.otherData.least_vote[1];
        if (least_vote === 0) return;
        switch (this.otherData.least_vote[0]) {
          case '=' :
            if (this.allChecked.length > least_vote) {
              spot.checked = false;
              this.$message(
                '提示',
                `投票数量必须等于${least_vote}个`
              );
              // 当前分类勾选数
              const _checkedList = [];
              category.spots.forEach(({checked, id}) => {
                checked && _checkedList.push(id);
              });
              category.checkedList = _checkedList.slice(0);
              // 显示总勾选数
              let _allChecked = [];
              this.listData.forEach(category => {
                _allChecked = _allChecked.concat(category.checkedList);
              });
              this.allChecked = _allChecked.slice(0);
            }
            break;
          case '<':
            if (this.allChecked.length >= least_vote) {
              spot.checked = false;
              this.$message(
                '提示',
                `投票数量必须小于${least_vote}个`
              );
              // 当前分类勾选数
              const _checkedList = [];
              category.spots.forEach(({checked, id}) => {
                checked && _checkedList.push(id);
              });
              category.checkedList = _checkedList.slice(0);
              // 显示总勾选数
              let _allChecked = [];
              this.listData.forEach(category => {
                _allChecked = _allChecked.concat(category.checkedList);
              });
              this.allChecked = _allChecked.slice(0);
            }
            break;
          case '<=':
            if (this.allChecked.length > least_vote) {
              spot.checked = false;
              this.$message(
                '提示',
                `投票数量必须小于等于${least_vote}个`
              );
              // 当前分类勾选数
              const _checkedList = [];
              category.spots.forEach(({checked, id}) => {
                checked && _checkedList.push(id);
              });
              category.checkedList = _checkedList.slice(0);
              // 显示总勾选数
              let _allChecked = [];
              this.listData.forEach(category => {
                _allChecked = _allChecked.concat(category.checkedList);
              });
              this.allChecked = _allChecked.slice(0);
            }
            break;
        }
      },
      // 显示详情
      handleClick(spot) {
        this.curSpot = spot;
        this.modal = true;
        this.$el.addEventListener('touchmove', _stopPrevent, false);
        this.$nextTick(() => {
          this.scroll.refresh();
          this.scroll.scrollTo(0);
        });
      },
      // 关闭闲情
      handleClose() {
        this.modal = false;
        this.$el.removeEventListener('touchmove', _stopPrevent, false);
      },
      // 关闭关注弹窗
      closeFollow() {
        this.followDisplay = false;
      },
      /**
       * 用时间戳判断是否为当日
       * @param str 接收时间戳
       * @returns {boolean} 返回是否为当日
       */
      isToday(str) {
        return new Date(str).toDateString() === new Date().toDateString();
      },
      // 获取投票列表数据
      async getVoteData() {
        const {status, param, info} = await this.$http.post('voteData', {});
        if (status === 200) {
          this.otherData = param.otherData;
          this.listData = param.listData;
          if (this.listData.length > 0) {
            await this.listData.forEach(item => {
              item.spots.forEach(spot => {
                this.voteList[spot.id] = 0;
              });
            });
          }
          return true;
        } else {
          this.$toast(info);
          return false;
        }
      },
      // 获取票数信息
      async getVoteShow() {
        const {status, param, info} = await this.$http.post('voteShow', {});
        if (status === 200) {
          this.voteList = JSON.parse(param).vote;
        } else {
          this.$toast(info);
        }
      },
      // 提交投票
      async submitVote() {
        for (let i = 0, len = this.listData.length; i < len; i++) {
          if (this.otherData.cat_max_vote !== 0) {
            const category = this.listData[i];
            if (category.checkedList.length < this.otherData.cat_max_vote) {
              this.$message(
                '提示',
                `${category.title}分类下最少勾选${this.otherData.cat_max_vote}个`
              );
              return;
            }
          }
        }
        let isValidated = true;
        // 每人每次须投10票（含10票）以上
        const least_vote = +this.otherData.least_vote[1];
        switch (this.otherData.least_vote[0]) {
          case '>' :
            if (this.allChecked.length <= least_vote) {
              isValidated = false;
              this.$message(
                '提示',
                `投票数量必须大于${least_vote}个`
              );
            }
            break;
          case '>=':
            if (this.allChecked.length < least_vote) {
              isValidated = false;
              this.$message(
                '提示',
                `投票数量必须大于等于${least_vote}个`
              );
            }
            break;
        }
        if (!isValidated) return;
        if (window.localStorage.getItem('VOTE_RECORD') !== null && this.isToday(+window.localStorage.getItem('VOTE_RECORD'))) {
          this.$message({
            title: '提示',
            message: '今日已经投过票了！',
            confirmButtonText: this.otherData.link === '' ? '确定' : '马上抽奖',
            closeOnClickModal: false,
            showCancelButton: true
          }).then(action => {
            if (action === 'confirm') {
              // redirect
              if (this.otherData.link !== '') {
                window.location.href = this.otherData.link;
              } else {
                this.getVoteShow();
              }
            }
          });
        } else {
          // 正常投票
          const res = await this.$http.post('votePoll', {
            jids: this.allChecked
          });
          if (res.status === 200) {
            this.voteList = JSON.parse(res.param).vote;
            localStorage.setItem('VOTE_RECORD', new Date().getTime());
            this.$message({
              title: '提示',
              message: '您已投票成功！',
              confirmButtonText: this.otherData.link === '' ? '确定' : '马上抽奖',
              closeOnClickModal: false,
              showCancelButton: true
            }).then(action => {
              if (action === 'confirm') {
                // redirect
                if (this.otherData.link !== '') {
                  window.location.href = this.otherData.link;
                } else {
                  this.getVoteShow();
                }
              }
            });
          } else {
            this.$toast(res.info);
          }
        }
      },
      async wechatConfig() {
        // 微信配置文件
        const {status, param, info} = await this.$http.post('apiForConfig', {});
        if (status) {
          wx.config(param);
        } else {
          this.$toast(info);
        }
      }
    },
    mounted() {
      this.wechatConfig();
      const load = new Promise(async (resolve, reject) => {
        if (await this.getVoteData()) {
          try {
            document.body.removeChild(document.querySelector('#loading'));
          } catch (e) {}
          resolve();
        } else {
          reject();
        }
      });
      load.then(() => {
        this.getVoteShow();
      });
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {});
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "~scss_vars";

  .wrapper {
    width: 100%;
    height: 100%;
    background: rgb(181, 29, 42);
    font-size: $fontSize;
  }

  .container {
    width: 100%;
    height: auto;
    padding: $padding * 2 $padding 0 $padding;
    box-sizing: border-box;

    &__content {
      padding-bottom: $padding;
      border-radius: $padding;
      background-color: #fff;
    }

    &__footer {
      &__btn {
        display: block;
        width: 16.6rem;
        height: 4rem;
        line-height: 1.5rem;
        margin: $padding auto;
        border-radius: 4px;
        text-align: center;
        font-size: $fontSize;
        font-weight: bold;
        border: 0;
        &--enable {
          background-color: #f6b51d;
          color: #eb4036;
        }
        &--disable {
          background-color: #adabad;
          color: #484848;
        }
      }
    }
  }

  .category {
    width: 100%;
    padding-top: 1rem;
    &__title {
      width: 100%;
      height: 3.2rem;
      margin-top: 1rem;
      /*background-repeat: no-repeat;*/
      /*background-size: cover;*/
      position: relative;
      &__icon {
        position: absolute;
        top: -0.5rem;
        width: 4.5rem;
        height: 4.5rem;
        background-size: cover;
        background-repeat: no-repeat;
      }
      &__text {
        position: absolute;
        left: 5rem;
        top: 1rem;
        font-size: $fontSize;
        color: #fff;
      }
    }
    &__list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      /*justify-content: flex-start;*/
      height: auto;
    }
  }

  .point {
    position: relative;
    flex-basis: 33.33%;
    /*flex-grow: 1;*/
    /*flex-shrink: 1;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    box-sizing: border-box;
    &__img {
      width: 8rem;
      height: 8rem;
      border: 0.5rem solid #cfcfcf;
      border-radius: 50%;
      overflow: hidden;
      /*box-sizing: border-box;*/
      background-color: #cfcfcf;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    &__text {
      /*height: 4rem;*/
      padding: $padding;
      margin-bottom: $padding;
      text-align: center;
      font-size: 14rem / $rem;
      font-weight: bold;
    }
    &__action {
      position: absolute;
      bottom: 0;
      font-size: 12rem / $rem;
      input {
        margin-right: $padding;
        vertical-align: middle;
      }
    }
  }

  .follow {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;

    &__img {
      display: block;
      width: 70%;
      height: auto;
      z-index: 1010;
    }
    &__text {
      padding: 3 * $padding;
      line-height: 1.5;
      font-size: 18rem / $rem;
      color: #fff;
      z-index: 1010;

      &--focus {
        font-size: 22rem / $rem;
        color: #f00;
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: $padding;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.4);
    z-index: 900;

    .detail {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 100%;
      max-width: 35rem;
      height: 23rem;
      padding: 4 * $padding 3 * $padding;
      padding-bottom: 0;
      border-radius: 0.5rem;
      box-sizing: border-box;
      z-index: 1100;

      &__close {
        position: absolute;
        top: -1rem;
        right: -1rem;
        width: 3rem;
        height: 3rem;
        background: url("../assets/images/del-coin.png") no-repeat;
        background-size: cover;
      }

      &__img {
        flex: 10rem 0 0;
        margin-right: $padding;
        text-align: center;

        &__url {
          color: #666;
        }
      }

      &__scroll {
        height: 13rem;
        /*overflow-y: scroll;*/
        overflow: hidden;
      }
      &__text {
        width: 100%;
        height: auto;

        &__title {
          margin-bottom: $padding;
          font-size: $fontSize;
          font-weight: bold;
          text-align: center;
        }
        &__info {
          letter-spacing: 2px;
          font-size: 12rem / $rem;
          text-indent: 2em;
        }
      }
    }
  }

  .vote-count {
    position: fixed;
    right: 0;
    top: 5rem;
    width: 9rem;
    height: 3rem;
    line-height: 3rem;
    color: #fff;
    font-size: 14rem / $rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
  }

  .notice {
    width: 100%;
    margin-bottom: 2 * $padding;
    line-height: 1.5;
    color: #fff;
    font-size: $fontSize;
    text-align: left;
    p {
      text-indent: 2em;
      padding: 0.5rem 0;
    }

    &--hidden {
      max-height: 8rem;
      overflow: hidden;
    }
    &--display {
      height: auto;
    }
  }

  .load-more {
    text-align: center;
    &__btn {
      display: block;
      width: 16.6rem;
      height: 3rem;
      line-height: 3rem;
      margin: $padding auto;
      border-radius: 4px;
      text-align: center;
      font-size: $fontSize;
      font-weight: bold;
      border: 0;
      &--enable {
        background-color: #f6b51d;
        color: #eb4036;
      }
      &--disable {
        background-color: #adabad;
        color: #484848;
      }
    }
  }

  .partner {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 3rem;
    background: rgb(237, 244, 138);

    &__item {
      color: #333;
      text-decoration: #333 underline;
      font-size: 14rem / $rem;
    }
  }

  // for PC
  @media screen and (min-width: 640px) {
    .header,
    .container {
      height: 100%;
      margin: 0 auto;
    }
    .header {
      width: 640px;
    }
    .container {
      width: 680px;
    }
  }

  // for iPhone 5
  @media all and (max-width: 320px) {
    .point__img {
      width: 7rem;
      height: 7rem;
      border: 0.3rem solid #cfcfcf;
    }
    .modal .detail {
      background-size: 100% 100%!important;
    }
    .container__footer__btn {
      width: 15rem;
      height: 3rem;
      line-height: 3rem;
    }
  }
</style>
