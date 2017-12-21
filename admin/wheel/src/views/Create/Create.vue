<template>
    <div class="edit-activity">
        <div class="web-view">
            <div class="web-view__phone">
                <iframe class="web-view__iframe" src="//elemefe.github.io/mint-ui/#/" frameborder="0"
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
            <div class="options__content" v-if="active === 0">
                <el-form :model="ruleForm" :rules="rules['activity']" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="活动名称0" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动名称0" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 奖品设置 -->
            <div class="options__content" v-if="active === 1">


                <el-button type="primary" icon="el-icon-plus" @click="addPrize">添加奖品</el-button>

                <el-form v-for="(prize,index) in prizeList"  :key="index" :model="prize" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称3" prop="name">
                        <el-input v-model="prize.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动名称3" prop="name">
                        <el-input v-model="prize.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 风格设置 -->
            <div class="options__content" v-if="active === 2">
                <el-form :model="ruleForm" :rules="rules['activity']" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="活动名称2" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 分享设置 -->
            <div class="options__content" v-if="active === 3">
                <el-form :model="ruleForm" :rules="rules['activity']" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="活动名称1" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-form>


            </div>
            <div class="options__content" v-if="active === 4">
                <div class="options__content--finished">
                    <el-alert
                            title="活动创建成功"
                            type="success"
                            description="您创建的活动已发布，下方为本活动二维码，扫码可访问。"
                            :closable="false"
                            show-icon>
                    </el-alert>
                    <div class="qrcode-wrapper">
                        <div id="qrcode" ref="qrcode"></div>
                    </div>
                </div>
            </div>

            <div class="options__btns">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="next">下一步</el-button>
            </div>

        </div>
    </div>
</template>

<script>
  import QRCode from 'qrcodejs2';

  export default {
    data() {
      return {
        active: 0,
        prizeList: [
          {
            name: '奖品名称',
            type: 1,
            count: 10,
            chance: 0.1,
            img: ''
          }
        ],
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          'activity': {
            name: [
              {required: true, message: '请输入活动名称', trigger: 'blur'},
              {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ]
          }
        },
        stepOptions: [
          {
            title: '活动设置'
          },
          {
            title: '奖品设置'
          },
          {
            title: '风格设置'
          },
          {
            title: '分享设置'
          },
        ]
      };
    },
    methods: {
      addPrize() {
        this.prizeList.push({
          name: '奖品名称',
          type: 'physical',
          sum: 10,
          chance: 0.1,
          link: '',
          min: 0,
          max: 0,
          total: 0,
          img: 0
        });
      },
      next() {
        if (this.active++ > 3) {
          // generate qr-code
          this.active = 0;
        }
        if (this.active === 4) {
          this.$nextTick(() => {
            new QRCode(this.$refs.qrcode, { // eslint-disable-line no-new
              text: `${window.location.host}${window.location.pathname}`,
              width: 250,
              height: 250,
              colorDark: '#000000',
              colorLight: '#ffffff',
              correctLevel: QRCode.CorrectLevel.H
            });
          });

        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
    @import "Create";
</style>