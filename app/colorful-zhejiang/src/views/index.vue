<template>
  <!--modal-open-->
  <div :class="['wrapper', modal ? 'modal-open' : '']">
    <div class="header">
      <img :src="otherData.header" alt="">
    </div>
    <div class="container">
      <div class="notice" v-html="otherData.rule"></div>
      <div class="container__content">
        <div class="category" v-for="(category, index) in listData" :key="index">
          <div class="category__title" :style="{backgroundImage: `url(${otherData.cat})`}">
            <p class="category__title__text">
              {{category.title}}(共{{category.spots.length}}处，已勾选{{category.checkedList.length}}个)</p>
          </div>
          <div class="category__list">
            <div class="point" v-for="(spot, index) in category.spots" :key="spot.id">
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
        <button class="container__footer__btn container__footer__btn--enable" @click="submitVote">马上投票</button>
      </div>
    </div>
    <div class="modal" v-show="modal">
      <div class="detail">
        <div class="detail__close" @click="handleClose"></div>
        <div class="detail__img">
          <img v-lazy="curSpot.img" alt="">
          <a :href="curSpot.url" target="_blank" class="detail__img__url" v-if="curSpot.url !== ''">查看详情</a>
        </div>
        <div class="detail__scroll" ref="wrapper">
          <div class="detail__text">
            <p class="detail__text__title">{{curSpot.title}}（{{voteList[curSpot.id]}}票）</p>
            <p class="detail__text__info" v-html="curSpot.info"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="follow" @touchmove.prevent="" @click="closeFollow" v-show="followDisplay">
      <img :src="otherData.qrcode" alt="" class="follow__img">
      <div class="follow__text" v-html="otherData.attention">
      </div>
    </div>
    <div class="vote-count" v-show="allChecked.length > 0">
      已勾选 {{ allChecked.length }} 个
    </div>
  </div>
</template>

<script>

  // 防止背景遮罩底层滚动
  function _stopPrevent(e) {
    e.preventDefault()
  }

  import BScroll from 'better-scroll'

  export default {
    name: "index",
    data() {
      return {
        modal: false,
        followDisplay: false,
        scroll: null,
        curSpot: {
          "id": 0,
          "img": "",
          "title": "",
          "info": "",
          "url": "",
          "checked": false
        },
        voteList: {
          1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
          11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0,
          21: 0, 22: 0, 23: 0, 24: 0, 25: 0, 26: 0, 27: 0, 28: 0, 29: 0, 30: 0,
          31: 0, 32: 0, 33: 0, 34: 0, 35: 0, 36: 0, 37: 0, 38: 0, 39: 0, 40: 0,
          41: 0, 42: 0, 43: 0, 44: 0, 45: 0, 46: 0, 47: 0, 48: 0, 49: 0, 50: 0,
          51: 0, 52: 0, 53: 0, 54: 0
        },
        allChecked: [],
        listData: [],
        otherData: {
          cat: "",
          header: "",
          qrcode: "",
          rule: "",
          cat_num: "",
          count: "",
          attention: ""
        }
      }
    },
    computed: {
      isShare() {
        return window.isShare
      }
    },
    methods: {
      // 勾选监听
      checkInput(category, spot) {
        // '' 为已关注，反之，则显示关注页面
        if (window.isShare !== '') {
          this.followDisplay = true
          spot.checked = false
        }
        // 当前分类勾选数
        const _checkedList = []
        category.spots.forEach(({checked, id}) => {
          checked && _checkedList.push(id)
        })
        category.checkedList = _checkedList.slice(0)
        // 显示总勾选数
        let _allChecked = []
        this.listData.forEach((category) => {
          _allChecked = _allChecked.concat(category.checkedList)
        })
        this.allChecked = _allChecked.slice(0)
      },
      // 显示详情
      handleClick(spot) {
        this.curSpot = spot
        this.modal = true
        this.$el.addEventListener('touchmove', _stopPrevent, false)
        this.$nextTick(() => {
          this.scroll.refresh()
          this.scroll.scrollTo(0)
        })
      },
      // 关闭闲情
      handleClose() {
        this.modal = false;
        this.$el.removeEventListener('touchmove', _stopPrevent, false)
      },
      // 关闭关注弹窗
      closeFollow() {
        this.followDisplay = false
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
        const {status, param, info} = await this.$http.post('voteData', {})
        if (status === 200) {
          this.otherData = param.otherData
          this.listData = param.listData
          return true
        } else {
          this.$toast(info)
          return false
        }
      },
      // 获取票数信息
      async getVoteShow() {
        const {status, param, info} = await this.$http.post('voteShow', {})
        if (status === 200) {
          this.voteList = JSON.parse(param).vote
        } else {
          this.$toast(info)
        }
      },
      // 提交投票
      async submitVote() {
        for (let i = 0, len = this.listData.length; i < len; i++) {
          const category = this.listData[i]
          if (category.checkedList.length < otherData.cat_num) {
            this.$message('提示', `${category.title}分类下最少勾选${otherData.cat_num}个地点`)
            return
          }
        }
        // 每人每次须投10票（含10票）以上
        if (this.allChecked.length < otherData.count) {
          this.$message('提示', `您勾选了${this.allChecked.length}个地点，还差${otherData.count - this.allChecked.length}个才可投票`)
        } else if (this.isToday(+window.localStorage.getItem('VOTE_RECORD'))) {
          this.$message('提示', '今日已经投过票了！')
        } else {
          // 正常投票
          const res = await this.$http.post('votePoll', {
            jids: this.allChecked
          })
          if (res.status === 200) {
            this.voteList = JSON.parse(res.param).vote
            localStorage.setItem('VOTE_RECORD', new Date().getTime())
            this.$message('提示', '您已投票成功！')
          } else {
            this.$toast(res.info)
          }
        }
      },
      async wechatConfig() {
        // 微信配置文件
        const {status, param, info} = await this.$http.post('apiForConfig', {})
        if(status) {
          wx.config(param);
        } else {
          this.$toast(info)
        }
      }
    },
    mounted() {
      this.wechatConfig()
      const load = new Promise(async (resolve, reject) => {
        if (await this.getVoteData()) {
          try {
            document.body.removeChild(document.querySelector('#loading'))
          } catch (e) {

          }
          resolve()
        } else {
          reject()
        }
      })
      load.then(() => {
        this.getVoteShow()
      })
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {})
      })
    }
  }
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

    &__title {
      width: 100%;
      height: 6.5rem;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      &__text {
        position: absolute;
        left: 5rem;
        top: 1.8rem;
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
      z-index: 1010
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
      background: #fff url("../assets/images/inforbg.png");
      background-size: cover;
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
  }

  // for PC
  @media screen and (min-width: 640px) {
    .header, .container {
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
      background-size: 100% 100%;
    }
    .container__footer__btn {
      width: 15rem;
      height: 3rem;
      line-height: 3rem;
    }
  }

</style>
