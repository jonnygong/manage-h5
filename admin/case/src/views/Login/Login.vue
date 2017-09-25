<template>
    <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container" @keyup.enter.native="handleSubmit">
        <h3 class="title">快房传媒案例展示管理后台</h3>
        <el-form-item prop="user">
            <el-input type="text" v-model="loginForm.user" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input type="password" v-model="loginForm.pwd" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-col :span="17">
                <el-input type="text" v-model="loginForm.code" auto-complete="off" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="6" :offset="1" class="code-wrapper">
                <!-- 验证码显示-->
                <canvas ref="code" width='90' height='40' @click="getCode">
                    您的浏览器不支持 Canvas 特性，请更新至最新版本。
                </canvas>
            </el-col>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import api from '@/api'

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
                        {required: true, len: 4,message: '请输入验证码', trigger: 'blur'},
                    ]
                },
                checked: true
            };
        },
        methods: {
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
                        _this.$message.error("请正确填写表单后提交！");
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
    }

</script>

<style lang="scss" scoped>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0 auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0 0 35px 0;
        }
    }

    .code-wrapper {
        height: 40px;
    }

    #code {
        cursor: pointer;
    }
</style>