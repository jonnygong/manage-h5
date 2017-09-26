import axios from 'axios';
import qs from 'qs'
// vue 实例
import {vm as Vue} from '@/main.js'

// 确认默认链接
axios.defaults.baseURL = 'https://api.kfw001.com';
// 初始化post header
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;  //是关键 支持跨域携带cookie

// 处理服务器返回的数据
axios.defaults.transformResponse = [function (data) {
    // Do whatever you want to transform the data
    // 接口错误统一处理
    // console.log(JSON.parse(data));
    let _data = JSON.parse(data);
    _data.status = Number(_data.status); // 错误码统一转为 Number
    // 状态正常
    if (_data.status !== 200) {
        switch (_data.status) {
            case 102: // 请登录
            case 304: // 非法访问
            case 305: // 授权错误
            case 306: // 身份信息过期
                // 需要跳转路由，清除登录状态
                Vue.$store.dispatch('login_out');
                Vue.$router.push('/login');
                Vue.$message({
                    message: _data.info,
                    type: 'error'
                });
                break;
            default:
                // 其他错误提示错误信息，返回data
                Vue.$message({
                    message: _data.info,
                    type: 'error'
                });
                break;
        }
    }
    return _data;
}];


// 获取验证码
export const requestCode = params => {
    return axios.post('/system/user/code', qs.stringify(params))
};
// 登录
export const requestLogin = params => {
    return axios.post('/system/user/login', qs.stringify(params))
};

// 获取验证码
export const getWechatList = params => {
    return axios.post('/System/User/wechat', qs.stringify(params))
};
// 登录
export const getProjectList = params => {
    return axios.post('/System/User/modules', qs.stringify(params))
};