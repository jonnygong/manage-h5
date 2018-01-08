<template>
    <div class="edit-activity">
        <div class="web-view">
            <div class="web-view__phone">
                <iframe class="web-view__iframe"
                        :src="previewSrc"
                        frameborder="0"
                        width="320"></iframe>
            </div>
        </div>
        <div class="options">

            <!-- 步骤条 -->
            <div class="options__step-bar">
                <el-steps :active="active" :center="true" finish-status="success">
                    <el-step v-for="(step,index) in stepOptions"
                             :key="index"
                             :title="step.title"></el-step>
                </el-steps>
            </div>
            <!-- 活动设置 -->
            <div class="options__content" v-show="active === 0">
                <el-form :model="formData['activity']"
                         :rules="rules['activity']"
                         ref="activityForm"
                         label-width="110px"
                         class="demo-ruleForm">
                    <el-form-item label="活动标题" prop="active_title">
                        <el-input v-model="formData['activity'].active_title"></el-input>
                    </el-form-item>
                    <el-form-item label="活动时间" prop="active_time">
                        <!-- 活动时间列表 -->
                        <el-row v-for="(time,index) in formData['activity'].active_time"
                                :key="index"
                                style="margin-bottom: 20px;">
                            <el-col :span="2">时间{{index+1}}</el-col>
                            <el-col :span="10">
                                <el-form-item prop="start">
                                    <el-date-picker v-model.date="time.start"
                                                    align="right"
                                                    type="datetime"
                                                    placeholder="选择开始日期"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="1">-</el-col>
                            <el-col :span="10">
                                <el-form-item prop="end">
                                    <el-date-picker v-model.date="time.end"
                                                    align="right"
                                                    type="datetime"
                                                    placeholder="选择结束日期"
                                                    style="width: 100%;"
                                    ></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <el-button type="danger"
                                           icon="delete"
                                           size="mini"
                                           style="margin-left: 5px;"
                                           @click="removeTime(index)"
                                ></el-button>
                            </el-col>
                        </el-row>
                        <el-button type="success"
                                   icon="plus"
                                   size="mini"
                                   @click="addTime"
                        >添加活动时间
                        </el-button>
                    </el-form-item>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="每场最多可分享" prop="max_share">
                                <el-input v-model.number="formData['activity'].max_share"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="每场最多可玩" prop="max_eplay">
                                <el-input v-model.number="formData['activity'].max_eplay"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="最多可玩次数" prop="max_play">
                                <el-input v-model.number="formData['activity'].max_play"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="每场最多中奖数" prop="max_prize">
                                <el-input v-model.number="formData['activity'].max_prize"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="虚拟人数" prop="virtual">
                        <el-input v-model.number="formData['activity'].virtual"></el-input>
                    </el-form-item>
                    <el-form-item label="模板类型" prop="template">
                        <el-radio class="radio"
                                  v-model.number="formData['activity'].template"
                                  :label="10">刮刮卡
                        </el-radio>
                        <el-radio class="radio"
                                  v-model.number="formData['activity'].template"
                                  :label="11">大转盘
                        </el-radio>
                        <el-radio class="radio"
                                  v-model.number="formData['activity'].template"
                                  :label="12">红包
                        </el-radio>
                    </el-form-item>

                    <el-form-item label="活动类型" prop="active_type">
                        <el-radio class="radio"
                                  v-model.number="formData['activity'].active_type"
                                  :label="1">普通
                        </el-radio>
                        <el-radio class="radio"
                                  v-model.number="formData['activity'].active_type"
                                  :label="2">奖励
                        </el-radio>
                    </el-form-item>
                    <el-form-item label="是否启用活动" prop="status">
                        <el-switch on-text="启用"
                                   off-text="停用"
                                   :on-value="1"
                                   :off-value="0"
                                   v-model.number="formData['activity'].status"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 奖品设置 -->
            <div class="options__content" v-show="active === 1">

                <el-alert style="margin-bottom: 10px;"
                          title="注意：活动一旦正式开始请勿删除任何奖品、修改奖品，只能添加奖品或修改概率，奖品数量只可增加，否则数据错位后果自负。"
                          type="error"
                          :closable="false">
                </el-alert>


                <el-button type="success"
                           icon="plus"
                           size="small"
                           @click="addTab(prizeTabs)">添加奖品
                </el-button>

                <el-tabs class="prize-tabs"
                         v-model="prizeTabsValue"
                         type="card"
                         closable
                         @tab-remove="removeTab">
                    <el-tab-pane
                            v-for="(item, index) in prizeTabs"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name"
                    ></el-tab-pane>
                </el-tabs>
                <el-form :model="formData['prize']"
                         ref="prizeForm"
                         label-width="100px">
                    <el-row :gutter="24"
                            class="prize__item"
                            v-for="(prize,index) in formData['prize'].prize"
                            :key="index"
                            v-show="prize.id === prizeTabsValue">
                        <el-col :span="24">
                            <el-form-item label="奖品名称" prop="name" required>
                                <el-input v-model="prize.name"></el-input>
                            </el-form-item>
                            <el-form-item label="奖品描述" prop="desc" required>
                                <el-input type="textarea" v-model="prize.desc"></el-input>
                            </el-form-item>
                            <el-form-item label="奖品图片" prop="img" required>
                                <i-uploader v-model="prize.img"></i-uploader>
                            </el-form-item>
                            <el-form-item label="奖品类型" prop="type" required>
                                <el-radio class="radio"
                                          v-for="(item, index) in prizeType"
                                          :key="index"
                                          v-model.number="prize.type"
                                          :label="item.value">
                                    {{item.label}}
                                </el-radio>
                            </el-form-item>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="奖品数量(个)" prop="sum" required>
                                        <el-input v-model.number="prize.sum"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="中奖概率(%)" prop="chance" required>
                                        <el-input v-model.number="prize.chance"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8" v-if="prize.type !== 'physical' && prize.type !== 'coupon'">
                                    <el-form-item label="最小金额" prop="min" required>
                                        <el-input v-model.number="prize.min"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" v-if="prize.type !== 'physical' && prize.type !== 'coupon'">
                                    <el-form-item label="最大金额" prop="max" required>
                                        <el-input v-model.number="prize.max"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" v-if="prize.type !== 'physical' && prize.type !== 'coupon'">
                                    <el-form-item label="红包总额" prop="money" required>
                                        <el-input v-model.number="prize.money"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24"> <el-alert style="margin-top: 10px;" title="注意：当最小金额和最大金额相等的时候，为定额红包，否则为区间红包。" type="info" :closable="false" v-if="prize.type === 'red'">
                                </el-alert></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-form>

            </div>
            <!-- 自定义设置 -->
            <div class="options__content" v-show="active === 2">
                <el-form :model="formData['config']"
                         :rules="rules['config']"
                         ref="configForm"
                         label-width="100px">
                    <el-form-item label="顶部版权图片" prop="header_img">
                        <i-uploader v-model="formData['config'].header_img"></i-uploader>
                    </el-form-item>
                    <el-row type="flex" justify="space-around">
                        <el-col :span="8">
                            <el-form-item label="背景颜色" prop="config">
                                <el-input v-model="formData['config'].config.body_color"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-color-picker v-model="formData['config'].config.body_color"
                            ></el-color-picker>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="按钮颜色" prop="config">
                                <el-input v-model="formData['config'].config.btn_color"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-color-picker v-model="formData['config'].config.btn_color"
                            ></el-color-picker>
                        </el-col>
                    </el-row>
                    <el-form-item label="领奖说明软文" prop="rule_link">
                        <el-input v-model="formData['config'].rule_link"></el-input>
                    </el-form-item>
                    <el-form-item label="规则说明" prop="rule">
                        <UE :defaultMsg="formData['config'].rule" ref="ue"></UE>
                    </el-form-item>
                    <el-form-item label="是否填写地址" prop="need_address">
                        <el-switch on-text="是"
                                   off-text="否"
                                   :on-value="1"
                                   :off-value="0"
                                   v-model.number="formData['config'].need_address"></el-switch>
                    </el-form-item>
                    <el-form-item label="超过中奖数量提示" prop="tips">
                        <el-input v-model="formData['config'].tips.have_award"></el-input>
                    </el-form-item>
                    <el-form-item label="超过抽奖次数提示" prop="tips">
                        <el-input v-model="formData['config'].tips.no_times"></el-input>
                    </el-form-item>
                    <el-form-item label="未中奖提示" prop="tips">
                        <el-input v-model="formData['config'].tips.no_award"></el-input>
                    </el-form-item>
                    <el-form-item label="活动结束提示" prop="tips">
                        <el-input v-model="formData['config'].tips.game_over"></el-input>
                    </el-form-item>
                    <el-form-item label="默认提示" prop="tips">
                        <el-input v-model="formData['config'].tips.default"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 分享设置 -->
            <div class="options__content" v-show="active === 3">
                <el-form :model="formData['share']"
                         :rules="rules['share']"
                         ref="shareForm"
                         label-width="100px">
                    <el-form-item label="分享标题" prop="share_title">
                        <el-input v-model="formData['share'].share_title"></el-input>
                    </el-form-item>
                    <el-form-item label="分享链接" prop="share_link">
                        <el-input v-model="formData['share'].share_link"></el-input>
                    </el-form-item>
                    <el-form-item label="分享介绍" prop="share_desc">
                        <el-input type="textarea" v-model="formData['share'].share_desc"></el-input>
                    </el-form-item>
                    <el-form-item label="分享图片" prop="share_img">
                        <i-uploader v-model="formData['share'].share_img"></i-uploader>
                    </el-form-item>
                    <!--<el-form-item label="公众号" prop="uniacid">-->
                        <!--<el-input v-model="formData['share'].uniacid"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="关联rid" prop="rid">-->
                        <!--<el-input v-model="formData['share'].rid"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="是否允许分享" prop="isshare">
                        <el-switch on-text="是"
                                   off-text="否"
                                   :on-value="1"
                                   :off-value="0"
                                   v-model.number="formData['share'].isshare"></el-switch>
                    </el-form-item>
                </el-form>


            </div>
            <!--发布成功-->
            <div class="options__content" v-if="active === 4">
                <div class="options__content--finished">
                    <el-alert
                            title="活动发布成功"
                            type="success"
                            description="您的活动已发布。"
                            :closable="false"
                            show-icon>
                    </el-alert>
                    <!--<div class="qrcode-wrapper">-->
                        <!--<div id="qrcode" ref="qrcode"></div>-->
                    <!--</div>-->
                </div>
            </div>

            <div class="options__btns">
                <el-button @click="prev"
                           v-if="active > 0 && active < 4">上一步
                </el-button>
                <el-button type="primary"
                           v-if="active === 3"
                           :loading="submitLoading"
                           @click="submitForm">立即创建
                </el-button>
                <el-button @click="next" v-if="active < 3">下一步</el-button>
            </div>

        </div>
    </div>
</template>

<script>
  import QRCode from 'qrcodejs2';
  import UE from '@/components/UEditor';
  import Uploader from '@/components/Uploader';

  export default {
    data() {
      return {
        // todo 放 demo 地址修改
        previewSrc: `http://api.mp.kfw001.com/Lottery/Activity/index?code=5TXyCDjE00w`,
        // 奖品列表标签
        prizeTabsValue: '0',
        prizeTabs: [{
          title: '奖品 1',
          name: '0'
        }],
        tabIndex: 0,
        // 当前激活的步骤
        active: 0,
        // 所有步骤表单列表，用于表单验证
        activeForm: [
          'activityForm',
          'prizeForm',
          'configForm',
          'shareForm'
        ],
        // 奖品字段中英对照
        prizeKeys: {
          name: '奖品名称',
          type: '奖品类型',
          sum: '奖品数量',
          chance: '中奖概率',
          link: 'http://',
          min: '最小金额',
          max: '最大金额',
          money: '红包总额',
          img: '奖品图片',
          desc: '奖品描述'
        },
        formData: {
          activity: {
            active_title: '',
            status: 0,
            active_time: [{
              start: new Date(),
              end: new Date(new Date().getTime() + 3600 * 1000 * 24 * 7)
            }],
            max_share: '',
            max_eplay: '',
            max_play: '',
            max_prize: '',
            virtual: '',
            template: '',
            active_type: ''
          },
          share: {
            share_title: '',
            share_link: '',
            share_desc: '',
            share_img: '',
            uniacid: '',
            rid: '',
            isshare: 0
          },
          config: {
            tips: {
              have_award: '今天已经获奖过咯~不要贪心哦！',
              no_times: '可次数已用完了！',
              no_award: '居然没有中奖？不如休息一下赞个手气！',
              game_over: '本场活动已结束，请等待下一场活动',
              default: '谢谢！'
            },
            config: {
              body_color: '',
              btn_color: ''
            },
            header_img: '',
            rule_link: '',
            need_address: '',
            rule: ''
          },
          prize: {
            prize: [{
              id: '0',
              name: '奖品 1',
              type: 'physical',
              sum: 0,
              chance: 0,
              link: 'http://',
              min: 0,
              max: 0,
              money: 0,
              img: '',
              desc: '',
              saved: false
            }]
          }
        },
        rules: {
          activity: {
            active_title: [
              {required: true, message: '请输入活动名称', trigger: 'blur'}
            ],
            status: [
              {type: 'number', required: true, message: '请选择活动状态', trigger: 'change'}
            ],
            active_time: [
              {type: 'array', min: 1, required: true, message: '请至少添加一个活动时间', trigger: 'change'}
            ],
            max_share: [
              {type: 'number', required: true, message: '请输入每场最多可分享', trigger: 'blur'}
            ],
            max_eplay: [
              {type: 'number', required: true, message: '请输入每场最多可玩', trigger: 'blur'}
            ],
            max_play: [
              {type: 'number', required: true, message: '请输入最多可玩次数', trigger: 'blur'}
            ],
            max_prize: [
              {type: 'number', required: true, message: '请输入每场最多中几次', trigger: 'blur'}
            ],
            virtual: [
              {type: 'number', required: true, message: '请输入虚拟人数', trigger: 'blur'}
            ],
            template: [
              {type: 'number', required: true, message: '请输入类型类型', trigger: 'change'}
            ],
            active_type: [
              {type: 'number', required: true, message: '请输入活动类型', trigger: 'change'}
            ]
          },
          share: {
            isshare: [
              {type: 'number', required: true, message: '请选择是否分享', trigger: 'change'}
            ],
            rid: [
              {required: true, message: '请输入rid', trigger: 'blur'}
            ],
            uniacid: [
              {required: true, message: '请输入公众号', trigger: 'blur'}
            ],
          },
          config: {
            tips: [
              {type: 'object', required: true, message: '请输入活动名称', trigger: 'blur'}
            ],
            header_img: [
              {required: true, message: '请输入顶部版权图片', trigger: 'blur'}
            ],
            rule_link: [
              {required: true, message: '请输入领奖说明软文', trigger: 'blur'}
            ],
            need_address: [
              {type: 'number', required: true, message: '请选择地址是否需要填写', trigger: 'change'}
            ],
            rule: [
              {required: true, message: '请输入规则说明', trigger: 'blur'}
            ]
          },
          prize: {
            prize: [
              {type: 'array', required: true, message: '请输入奖品信息', trigger: 'blur'}
            ]
          }
        },
        // 实物physical、红包red、劵码coupon
        prizeType: [
          {
            value: 'physical',
            label: '实物'
          },
          {
            value: 'red',
            label: '红包'
          },
          {
            value: 'coupon',
            label: '劵码'
          }
        ],
        stepOptions: [
          {
            title: '活动设置'
          },
          {
            title: '奖品设置'
          },
          {
            title: '自定义设置'
          },
          {
            title: '分享设置'
          },
        ],
        submitLoading: false
      };
    },
    methods: {
      // 添加奖品按钮
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        targetName.push({
          title: `奖品 ${+newTabName + 1}`,
          name: newTabName
        });
        this.prizeTabsValue = newTabName;
        this._addPrize(newTabName);
      },
      // 移除奖品按钮
      removeTab(targetName) {
        let tabs = this.prizeTabs; // 标签列表
        let activeName = this.prizeTabsValue; // 当前激活项
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        if (this.formData['prize'].prize.length === 0) return;
        this.formData['prize'].prize.forEach((item, index) => {
          if (item.id === targetName) {
            if (item.saved) {
              this.$message({
                message: '不能删除已保存的奖品',
                type: 'error'
              });
            } else {
              this.formData['prize'].prize.splice(index, 1);
              this.prizeTabsValue = activeName;
              this.prizeTabs = tabs.filter(tab => tab.name !== targetName);
            }
          }
        });

      },
      // 增加奖品
      _addPrize(id) {
        this.formData['prize'].prize.push({
          id: id,
          name: '奖品' + (+id + 1),
          type: 'physical',
          sum: 0,
          chance: 0,
          link: 'http://',
          min: 0,
          max: 0,
          money: 0,
          img: '',
          desc: '',
          saved: false
        });
      },
      // 添加活动时间
      addTime() {
        this.formData.activity.active_time.push({
          start: new Date(),
          end: new Date(new Date().getTime() + 3600 * 1000 * 24 * 7)
        });
      },
      // 删除活动时间
      removeTime(index) {
        this.formData.activity.active_time.splice(index, 1);
      },
      // 上一步
      prev() {
        this.active--;
      },
      // 下一步
      next() {
        // 奖品表单验证单独校验
        if (this.activeForm[this.active] === 'prizeForm') {
          if (this.formData.prize.prize.length === 0) {
            this.$message({
              message: '至少添加一个奖品',
              type: 'warning'
            });
          } else {
            // 对奖品做表单校验，防止空数据提交
            let result = true;
            for (let i = 0; i < this.formData.prize.prize.length; i++) {
              const item = this.formData.prize.prize[i];
              for (let key in item) {
                if (item[key] === '') {
                  this.$message({
                    message: `请填写「${this.prizeTabs[i].title}」表单「${this.prizeKeys[key]}」字段内容`,
                    type: 'warning'
                  });
                  result = false;
                  break;
                }
              }
            }
            // 验证通过，则下一步
            if (result) {
              if (this.active++ > 3) {
                // generate qr-code
                this.active = 0;
              }
            }
          }
        } else {
          if(this.activeForm[this.active] === 'configForm') {
            this.formData['config'].rule = this.getUEContent('ue');
          }
          this.$refs[this.activeForm[this.active]].validate((valid) => {
            if (valid) {
              if (this.active++ > 3) {
                // generate qr-code
                this.active = 0;
              }
            } else {
              this.$message({
                message: `请填写表单内容`,
                type: 'warning'
              });
              return false;
            }
          });
        }
      },
      // 提交创建活动
      async submitForm() {

        this.submitLoading = true;

        let params = Object.assign({},
          this.formData.prize,
          this.formData.activity,
          this.formData.config,
          this.formData.share
        );
        // 转换指定字段为 JSON
        params.tips = JSON.stringify(params.tips);
        params.config = JSON.stringify(params.config);
        params.active_time = JSON.stringify(params.active_time);
        params.prize = JSON.stringify(params.prize);

        console.log(params);
        const res = await this.$http.post(`adminActivityAdd`, params);
        this.submitLoading = false;
        if (res === null) return;
        this.$message({
          message: res.info,
          type: 'success'
        });
        this.$nextTick(() => {
          // todo demo 地址修改
          new QRCode(this.$refs.qrcode, { // eslint-disable-line no-new
            text: `http://api.mp.kfw001.com/Lottery/Activity/index?code=5TXyCDjE00w`,
            width: 250,
            height: 250,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          });
        });
        this.active++;
      },
      // Ueditor 获取内容
      getUEContent(ele) {
        return this.$refs[ele].getUEContent();
      },
    },
    components: {
      UE,
      'i-uploader': Uploader
    }
  };
</script>

<style lang="scss" scoped>
    @import "Create";
</style>