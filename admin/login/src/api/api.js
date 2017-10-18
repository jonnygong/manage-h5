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
// 图片上传
export const imgUpload = params => {
    return axios.post('/System/img/upload', qs.stringify(params))
};

// 获取验证码
export const getWechatList = params => {
    return axios.post('/System/User/wechat', qs.stringify(params))
};
// 登录
export const getProjectList = params => {
    return axios.post('/System/User/modules', qs.stringify(params))
};

// 用户管理
export const getAdminList = params => {
    return axios.post('/System/Admin/list', qs.stringify(params))
};
export const getAdmintInfo = params => {
    return axios.post('/System/Admin/info', qs.stringify(params))
};
export const getAdminAdd = params => {
    return axios.post('/System/Admin/add', qs.stringify(params))
};
export const getAdmintUpdate = params => {
    return axios.post('/System/Admin/update', qs.stringify(params))
};
export const getAdmintStatus = params => {
    return axios.post('/System/Admin/status', qs.stringify(params))
};
export const getAdmintDelete = params => {
    return axios.post('/System/Admin/delete', qs.stringify(params))
};
export const getAdmintModule = params => {
    return axios.post('/System/Admin/module', qs.stringify(params))
};
export const getAdmintModules = params => {
    return axios.post('/System/Admin/modules', qs.stringify(params))
};


// 模块管理
export const geModuleList = params => {
    return axios.post('/System/Module/list', qs.stringify(params))
};
export const getModuleInfo = params => {
    return axios.post('/System/Module/info', qs.stringify(params))
};
export const geModuleAdd = params => {
    return axios.post('/System/Module/add', qs.stringify(params))
};
export const getModuleUpdate = params => {
    return axios.post('/System/Module/update', qs.stringify(params))
};
export const getModuleStatus = params => {
    return axios.post('/System/Module/status', qs.stringify(params))
};
export const getModuleDelete = params => {
    return axios.post('/System/Module/delete', qs.stringify(params))
};

// 公众号
export const gePublicList = params => {
  return axios.post('/System/Public/list', qs.stringify(params))
};
export const getPublicInfo = params => {
  return axios.post('/System/Public/info', qs.stringify(params))
};
export const gePublicAdd = params => {
  return axios.post('/System/Public/add', qs.stringify(params))
};
export const getPublicUpdate = params => {
  return axios.post('/System/Public/update', qs.stringify(params))
};