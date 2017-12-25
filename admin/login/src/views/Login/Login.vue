<template>
    <div class="login-panel">
        <el-row>
            <el-col :span="14">
                <div class="company-info">
                    <div class="logo">
                        <img src="../../assets/images/logo.png" style="width:120px;height:20px">
                    </div>
                    <h5 class="title">快房传媒管理系统后台登录</h5>
                    <ul class="intro">
                        <li><i class="fa fa-arrow-circle-o-right mr5"></i>
                            杭州快房传媒有限公司座落于钱江新城CBD核心商圈，是都市快报控股子公司，年营业额过亿，是都市快报全媒体阵营的重要一员。
                        </li>
                        <li><i class="fa fa-arrow-circle-o-right mr5"></i>
                            公司设有媒体中心、运营中心、家居中心、网络中心、客服中心及宁波分中心，主要经营都市快报的房产广告及快房网的运营。都市快报的房产广告，位列浙江省房产投放量第一，最受房产商青睐。
                        </li>
                        <li><i class="fa fa-arrow-circle-o-right mr5"></i> 公司拥有一支年轻，活力四射，具有激情的团队。团队内有员工100多名，平均年龄29.1岁。
                        </li>
                        <li><i class="fa fa-arrow-circle-o-right mr5"></i>
                            都市快报由杭州日报报业集团主办，于1999年1月1日创刊，是中国第一份四开异型加长报；全国发行，重点覆盖浙江省各地市县，是浙江省发行量最大的报纸。
                        </li>
                        <li><i class="fa fa-arrow-circle-o-right mr5"></i> 公司网址： http://www.kfw001.com/</li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="10">
                <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-position="left" label-width="0px"
                         class="demo-ruleForm login-container" @keyup.enter.native="handleSubmit">
                    <h3 class="title">登录</h3>
                    <el-form-item prop="user">
                        <el-input type="text" v-model="loginForm.user" auto-complete="off"
                                  placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="pwd">
                        <el-input type="password" v-model="loginForm.pwd" auto-complete="off"
                                  placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-col :span="15">
                            <el-input type="text"
                                      v-model="loginForm.code"
                                      auto-complete="off"
                                      placeholder="验证码"></el-input>
                        </el-col>
                        <el-col :span="7" :offset="1" class="code-wrapper">
                            <canvas ref="code" width='90' height='35' @click="getCode">
                                您的浏览器不支持 Canvas 特性，请更新至最新版本。
                            </canvas>
                        </el-col>
                    </el-form-item>
                    <el-form-item style="width:100%;">
                        <span class="forgot-pwd" @click="handleEdit">忘记密码？</span>
                    </el-form-item>

                    <el-form-item style="width:100%;">
                        <el-button type="primary"
                                   style="width:100%;"
                                   @click.native.prevent="handleSubmit"
                                   :loading="logining">登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div class="login-footer">
            <div class="copyright">
                © 2017 版权所有：杭州快房传媒有限公司 浙ICP备09096541号
            </div>
            <div class="author">
                Created By: 快房传媒
            </div>
        </div>
        <!--编辑界面-->
        <el-dialog title="忘记密码？" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" style="width: 450px;">
                <el-form-item label="手机号码" prop="rcontent">
                    <el-input v-model="editForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="rcontent">
                    <el-col :span="15">
                        <el-input v-model="editForm.code"></el-input>
                    </el-col>
                    <el-col :span="8" :offset="1" class="code-wrapper">
                        <el-button @click.native="" style="width: 125px;">获取验证码</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input v-model.number="editForm.password"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repassword">
                    <el-input v-model.number="editForm.repassword"
                              auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import api from '@/api';

  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          user: '',
          pwd: '',
          code: ''
        },
        codeShow: '', // 获取到的验证码
        loginRule: {
          user: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          code: [
            {required: true, len: 4, message: '请输入验证码', trigger: 'blur'},
          ]
        },
        checked: true,
        editFormVisible: false, //编辑界面是否显示
        editLoading: false,
        editFormRules: {},
        //编辑界面数据
        editForm: {
          code: '',
          tel: '',
          password: '',
          repassword: '',
        },
      };
    },
    methods: {
      //显示编辑界面
      async handleEdit(index, row) {
        this.editFormVisible = true;
        let params = {
          id: row.id,
          pid: row.pid,
        };
        const res = await this.$http.post(`${MODEL_NAME}/reply`, params);
        if (res === null) return;
        this.editForm = res.param;
      },
      //编辑
      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(async () => {
              this.editLoading = true;
              let params = {
                id: this.editForm.id,
                rcontent: this.editForm.rcontent,
                pid: this.selectRow.pid,
              };
              const res = await this.$http.post(`${MODEL_NAME}/rsave`, params);
              this.editLoading = false;
              if (res === null) return;
              this.$message({
                message: res.info,
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getListData();
            });
          }
        });
      },
      handleSubmit(ev) {
        let _this = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            const loginParams = {
              user: this.loginForm.user,
              pwd: this.loginForm.pwd,
              code: this.loginForm.code
            };
            api.requestLogin(loginParams).then(res => {
              this.logining = false;
              if (res.data.status === 200) {
                // 存储 用户名 信息
                _this.$message.success(res.data.info);
                this.$store.dispatch('login', {
                  user: this.loginForm.user
                });
                this.$router.push({
                  path: '/'
                });
              } else { // 错误后，重新获取验证码
                _this.getCode();
                _this.$message.error(res.data.info);
              }
            });
          } else {
            _this.$message.error('请正确填写表单后提交！');
            return false;
          }
        });
      },
      // 获取验证码
      getCode() {
        let _this = this;
        api.requestCode()
          .then(function (res) {
            if (res.data.status === 200) {
              _this.codeShow = res.data.param.code.toUpperCase();
              _this.generateCode();
            }
          });
      },
      // 干扰线的随机x坐标值
      _lineX() {
        return Math.floor(Math.random() * 90);
      },
      // 干扰线的随机y坐标值
      _lineY() {
        return Math.floor(Math.random() * 40);
      },
      // 生成验证码图片
      generateCode() {
        let cxt = this.$refs['code'].getContext('2d');
        cxt.fillStyle = '#fff';
        cxt.fillRect(0, 0, 90, 40);
        // 生成干扰线20条
        for (let j = 0; j < 20; j++) {
          cxt.strokeStyle = '#ccc';
          cxt.beginPath(); // 若省略beginPath，则每点击一次验证码会累积干扰线的条数
          cxt.moveTo(this._lineX(), this._lineY());
          cxt.lineTo(this._lineX(), this._lineY());
          cxt.lineWidth = 0.5;
          cxt.closePath();
          cxt.stroke();
        }
        cxt.fillStyle = '#666';
        cxt.font = 'bold 20px Arial';
        cxt.fillText(this.codeShow, 25, 25); // 把rand()生成的随机数文本填充到canvas中
      }
    },
    mounted() {
      // 获取验证码
      this.getCode();
    }
  };

</script>

<style lang="scss" scoped>
    @import "Login";
</style>