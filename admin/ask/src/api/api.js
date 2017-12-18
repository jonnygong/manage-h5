import axios from 'axios';
import qs from 'qs';
// vue 实例
import { vm as Vue } from '@/main.js';

// 确认默认链接
axios.defaults.baseURL = 'https://api.kfw001.com';
// 初始化post header
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;  //是关键 支持跨域携带cookie

/**
 * todo: 预处理Requests数据
 * desc: 进行数据转换，添加默认字段等
 * @return data;
 **/
axios.defaults.transformRequest = function _transformRequest(params = {}) {
  // 返回完整数据，请求ajax
  params.public_id = sessionStorage.getItem('WECHAT_ID');
  return qs.stringify(params);
};

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
  return axios.post('/system/user/code', params);
};
// 登录
export const requestLogin = params => {
  return axios.post('/system/user/login', params);
};

// 获取广告位置
export const getAdspaceList = params => {
  return axios.post('/Caseadmin/Adsplace/list', params);
};
// todo 获取广告位置详细信息
export const getAdspaceDetail = params => {
  return axios.post('/Caseadmin/Adsplace/info', params);
};
// 获取案例分类层级
export const getAdspaceSelect = params => {
  return axios.post('/Caseadmin/Adsplace/select', params);
};
// 添加广告位置
export const addAdspace = params => {
  return axios.post('/Caseadmin/Adsplace/add', params);
};
// 删除广告位置
export const delAdspace = params => {
  return axios.post('/Caseadmin/Adsplace/delete', params);
};
// 修改广告位置
export const editAdspace = params => {
  return axios.post('/Caseadmin/Adsplace/update', params);
};
// todo 修改广告位置状态
export const changeAdspaceState = params => {
  return axios.post('/Caseadmin/Adsplace/status', params);
};

// 获得广告数据
export const getAds = params => {
  return axios.post('/Caseadmin/Ads/list', params);
};
// 获取广告数据详细信息
export const getAdsDetail = params => {
  return axios.post('/Caseadmin/Ads/info', params);
};
// 添加广告数据
export const addAds = params => {
  return axios.post('/Caseadmin/Ads/add', params);
};
// 更新广告数据
export const editAds = params => {
  return axios.post('/Caseadmin/Ads/update', params);
};
// 删除广告数据
export const deleteAds = params => {
  return axios.post('/Caseadmin/Ads/delete', params);
};
// todo 修改广告状态
export const changeAdsState = params => {
  return axios.post('/Caseadmin/Ads/status', params);
};

// 图片上传接口
export const imageUpload = params => {
  return axios.post('/Caseadmin/img/upload', params);
};

// 获取客户来源列表
export const getSourceList = params => {
  return axios.post('/Caseadmin/source/list', params);
};
// 获取客户下拉列表
export const getSourceSelect = params => {
  return axios.post('/Caseadmin/source/select', params);
};
// 获取客户来源详细信息
export const getSourceDetail = params => {
  return axios.post('/Caseadmin/source/info', params);
};
// 添加客户来源
export const addSource = params => {
  return axios.post('/Caseadmin/source/add', params);
};
// 删除客户来源
export const delSource = params => {
  return axios.post('/Caseadmin/source/delete', params);
};
// 修改客户来源
export const editSource = params => {
  return axios.post('/Caseadmin/source/update', params);
};
// 修改客户来源状态
export const changeSourceState = params => {
  return axios.post('/Caseadmin/source/status', params);
};

// 获取案例列表
export const getActList = params => {
  return axios.post('/Caseadmin/Act/list', params);
};
// todo 获取案例详细信息
export const getActDetail = params => {
  return axios.post('/Caseadmin/Act/info', params);
};
// 添加案例
export const addAct = params => {
  return axios.post('/Caseadmin/Act/add', params);
};
// 删除案例
export const delAct = params => {
  return axios.post('/Caseadmin/Act/delete', params);
};
// 修改案例
export const editAct = params => {
  return axios.post('/Caseadmin/Act/update', params);
};
// todo 修改案例状态
export const changeActState = params => {
  return axios.post('/Caseadmin/Act/status', params);
};

// 获取案例分类列表
export const getCategoryList = params => {
  return axios.post('/Caseadmin/category/list', params);
};
// 获取案例分类层级
export const getCategorySelect = params => {
  return axios.post('/Caseadmin/category/select', params);
};
// 获取案例分类详细信息
export const getCategoryDetail = params => {
  return axios.post('/Caseadmin/category/info', params);
};
// 添加案例分类
export const addCategory = params => {
  return axios.post('/Caseadmin/category/add', params);
};
// 删除案例分类
export const delCategory = params => {
  return axios.post('/Caseadmin/category/delete', params);
};
// 修改案例分类
export const editCategory = params => {
  return axios.post('/Caseadmin/category/update', params);
};
// todo 修改案例分类状态
export const changeCategoryState = params => {
  return axios.post('/Caseadmin/category/status', params);
};

// 获取案例分类列表
export const getShareConfigList = params => {
  return axios.post('/Caseadmin/share/list', params);
};
// 获取案例分类详细信息
export const getShareConfigDetail = params => {
  return axios.post('/Caseadmin/share/info', params);
};
// 添加分享配置
export const addShareConfig = params => {
  return axios.post('/Caseadmin/share/add', params);
};
// 删除分享配置
export const delShareConfig = params => {
  return axios.post('/Caseadmin/share/delete', params);
};
// 修改分享配置
export const editShareConfig = params => {
  return axios.post('/Caseadmin/share/update', params);
};
export const changeShareConfigState = params => {
  return axios.post('/Caseadmin/share/status', params);
};

// 爆料分类
// 获取爆料分类列表
export const getRebellionTypeList = params => {
  return axios.post('/Newsadmin/Keyword/list', params);
};
// 获取主分类接口
export const getRebellionTypeInfo = params => {
  return axios.post('/Newsadmin/Keyword/add', params);
};
// 分类添加保存
export const addRebellionType = params => {
  return axios.post('/Newsadmin/Keyword/save', params);
};
// 分类添加保存
export const editRebellionType = params => {
  return axios.post('/Newsadmin/Keyword/save', params);
};
// 分类修改
export const changeRebellionType = params => {
  return axios.post('/Newsadmin/Keyword/edit', params);
};
// 状态修改
export const changeRebellionTypeStatus = params => {
  return axios.post('/Newsadmin/Keyword/status', params);
};
// 状态修改
export const getRebellionTopTypeList = params => {
  return axios.post('/Newsadmin/Keyword/category', params);
};

// 记者列表
// 获取记者列表
export const getReporterList = params => {
  return axios.post('/Newsadmin/Reporter/list', params);
};
// 记者信息添加
export const addReporterInfo = params => {
  return axios.post('/Newsadmin/Reporter/add', params);
};
// 记者信息修改
export const editReporterInfo = params => {
  return axios.post('/Newsadmin/Reporter/edit', params);
};
// 添加记者信息保存
export const addReporter = params => {
  return axios.post('/Newsadmin/Reporter/save', params);
};
// 修改记者信息保存
export const editReporter = params => {
  return axios.post('/Newsadmin/Reporter/save', params);
};
// 记者状态修改
export const changeReporterStatus = params => {
  return axios.post('/Newsadmin/Reporter/status', params);
};

// 爆料列表
// 获取爆料信息列表
export const getQaList = params => {
  return axios.post('/Newsadmin/Qa/list', params);
};
// 记者回复
export const getReporterAnswerInfo = params => {
  return axios.post('/Newsadmin/Qa/answer', params);
};
// 记者回复保存
export const editReporterAnswer = params => {
  return axios.post('/Newsadmin/Qa/save', params);
};
// 获取信息的子分类列表
export const getSonType = params => {
  return axios.post('/Newsadmin/Qa/category', params);
};
// 后续信息列表
export const addAtList = params => {
  return axios.post('/Newsadmin/Qa/atlist', params);
};
// 爆料展示状态修改
export const changeShowStatus = params => {
  return axios.post('/Newsadmin/Qa/status', params);
};

// 快房问题列表
export const getQuestionsList = params => {
  return axios.post('/Newsadmin/Kfqa/addtolist', params);
};
// 专家回复（点击回复时需要访问）
export const getExpertAnswer = params => {
  return axios.post('/Newsadmin/Kfqa/addtoanswer', params);
};
// 追问回答保存
export const addQuestionPump = params => {
  return axios.post('/Newsadmin/Kfqa/addtosave', params);
};
// 状态修改
export const changeQuestionStatus = params => {
  return axios.post('/Newsadmin/Kfqa/status', params);
};
