import systems from '@/configs';
const baseUrl = systems.debug ? '/api/' : 'http://api.mp.kfw001.com/';
export default {
  // 接口请求baseUrl
  // baseUrl: 'http://api.mp.kfw001.com/',
  baseUrl: baseUrl,
  api: {
    // 公共接口
    imageUpload: 'http://api.kfw001.com/Caseadmin/img/upload', // 文件上传

    adminActivityAdd: 'Lottery/adminActivity/add', // 创建活动
    adminActivityList: 'Lottery/adminActivity/list', // 活动列表
    adminActivityInfo: 'Lottery/adminActivity/info', // 活动详情
    adminActivityUpdate: 'Lottery/adminActivity/update', // 修改活动
    adminActivityStatus: 'Lottery/adminActivity/status' // 状态修改
  }
};
