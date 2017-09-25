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


// 获取广告位置
export const getAdspaceList = params => {
    return axios.post('/Caseadmin/Adsplace/list', qs.stringify(params))
};
// todo 获取广告位置详细信息
export const getAdspaceDetail = para => {
    return axios.get('/Caseadmin/Adsplace/info', {
        params: para
    })
};
// 获取案例分类层级
export const getAdspaceSelect = params => {
    return axios.post('/Caseadmin/Adsplace/select', qs.stringify(params))
};
// 添加广告位置
export const addAdspace = params => {
    return axios.post('/Caseadmin/Adsplace/add', qs.stringify(params))
};
// 删除广告位置
export const delAdspace = params => {
    return axios.post('/Caseadmin/Adsplace/delete', qs.stringify(params))
};
// 修改广告位置
export const editAdspace = params => {
    return axios.post('/Caseadmin/Adsplace/update', qs.stringify(params))
};
// todo 修改广告位置状态
export const changeAdspaceState = params => {
    return axios.post('/Caseadmin/Adsplace/status', qs.stringify(params))
};


// 获得广告数据
export const getAds = params => {
    return axios.post('/Caseadmin/Ads/list', qs.stringify(params))
};
// 获取广告数据详细信息
export const getAdsDetail = para => {
    return axios.get('/Caseadmin/Ads/info', {
        params: para
    })
};
// 添加广告数据
export const addAds = params => {
    return axios.post('/Caseadmin/Ads/add', qs.stringify(params))
};
// 更新广告数据
export const editAds = params => {
    return axios.post('/Caseadmin/Ads/update', qs.stringify(params))
};
// 删除广告数据
export const deleteAds = params => {
    return axios.post('/Caseadmin/Ads/delete', qs.stringify(params))
};
// todo 修改广告状态
export const changeAdsState = params => {
    return axios.post('/Caseadmin/Ads/status', qs.stringify(params))
};


// 图片上传接口
export const imageUpload = params => {
    return axios.post('/Caseadmin/img/upload', qs.stringify(params))
};


// 获取客户来源列表
export const getSourceList = params => {
    return axios.post('/Caseadmin/source/list', qs.stringify(params))
};
// 获取客户下拉列表
export const getSourceSelect = params => {
    return axios.post('/Caseadmin/source/select', qs.stringify(params))
};
// 获取客户来源详细信息
export const getSourceDetail = para => {
    return axios.get('/Caseadmin/source/info', {
        params: para
    })
};
// 添加客户来源
export const addSource = params => {
    return axios.post('/Caseadmin/source/add', qs.stringify(params))
};
// 删除客户来源
export const delSource = params => {
    return axios.post('/Caseadmin/source/delete', qs.stringify(params))
};
// 修改客户来源
export const editSource = params => {
    return axios.post('/Caseadmin/source/update', qs.stringify(params))
};
// 修改客户来源状态
export const changeSourceState = params => {
    return axios.post('/Caseadmin/source/status', qs.stringify(params))
};


// 获取案例列表
export const getActList = params => {
    return axios.post('/Caseadmin/Act/list', qs.stringify(params))
};
// todo 获取案例详细信息
export const getActDetail = para => {
    return axios.get('/Caseadmin/Act/info', {
        params: para
    })
};
// 添加案例
export const addAct = params => {
    return axios.post('/Caseadmin/Act/add', qs.stringify(params))
};
// 删除案例
export const delAct = params => {
    return axios.post('/Caseadmin/Act/delete', qs.stringify(params))
};
// 修改案例
export const editAct = params => {
    return axios.post('/Caseadmin/Act/update', qs.stringify(params))
};
// todo 修改案例状态
export const changeActState = params => {
    return axios.post('/Caseadmin/Act/status', qs.stringify(params))
};


// 获取案例分类列表
export const getCategoryList = params => {
    return axios.post('/Caseadmin/category/list', qs.stringify(params))
};
// 获取案例分类层级
export const getCategorySelect = params => {
    return axios.post('/Caseadmin/category/select', qs.stringify(params))
};
// 获取案例分类详细信息
export const getCategoryDetail = para => {
    return axios.get('/Caseadmin/category/info', {
        params: para
    })
};
// 添加案例分类
export const addCategory = params => {
    return axios.post('/Caseadmin/category/add', qs.stringify(params))
};
// 删除案例分类
export const delCategory = params => {
    return axios.post('/Caseadmin/category/delete', qs.stringify(params))
};
// 修改案例分类
export const editCategory = params => {
    return axios.post('/Caseadmin/category/update', qs.stringify(params))
};
// todo 修改案例分类状态
export const changeCategoryState = params => {
    return axios.post('/Caseadmin/category/status', qs.stringify(params))
};


// 获取案例分类列表
export const getShareConfigList = params => {
    return axios.post('/Caseadmin/share/list', qs.stringify(params))
};
// 获取案例分类详细信息
export const getShareConfigDetail = para => {
    return axios.get('/Caseadmin/share/info', {
        params: para
    })
};
// 添加分享配置
export const addShareConfig = params => {
    return axios.post('/Caseadmin/share/add', qs.stringify(params))
};
// 删除分享配置
export const delShareConfig = params => {
    return axios.post('/Caseadmin/share/delete', qs.stringify(params))
};
// 修改分享配置
export const editShareConfig = params => {
    return axios.post('/Caseadmin/share/update', qs.stringify(params))
};
export const changeShareConfigState = params => {
    return axios.post('/Caseadmin/share/status', qs.stringify(params))
};
