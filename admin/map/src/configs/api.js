export default {
    // 接口请求baseUrl
    baseUrl: 'https://api.kfw001.com/',
    // 接口文档地址
    // document: http://git.kfw001.com:9090/root/pmg-kfw001/tree/master/doc
    api: {
        // 公共接口
        imageUpload: '/pmsadmin/Upload/picture', // 文件上传
        sysinfoProvince: '/pmsadmin/Sysinfo/province', // 省市级三级联动
        sysinfoCity: '/pmsadmin/Sysinfo/city', // 省市级三级联动
        sysinfoZone: '/pmsadmin/Sysinfo/zone', // 省市级三级联动
        adminMenu: '/pmsadmin/admin/menu', // 用户权限
        login: '/pmsadmin/Login/login', // 登录接口
        logout: '/pmsadmin/Login/logout', // 退出接口
        code: '/pmsadmin/Login/code', // 二维码生成接口
        personData: '/pmsadmin/Personal/data', // 个人资料接口
        logRecord: '/pmsadmin/Log/record', // 日志管理接口
        projectSelect: '/pmsadmin/Project/select', // 项目列表接口

        mapadminListList: '/Mapadmin/List/list',// 楼盘列表接口
        mapadminListEdit: '/Mapadmin/List/edit',
        mapadminListAddsave: '/Mapadmin/List/addsave',
        mapadminListEditsave: '/Mapadmin/List/editsave',
        mapadminListStatus: '/Mapadmin/List/status',
        mapadminListArray: '/Mapadmin/List/array',
        mapadminListGetplate: '/Mapadmin/List/getplate',
        mapadminListGetzone: '/Mapadmin/List/getzone',


        mapadminSubwayList: '/Mapadmin/Subway/list',// 地铁列表接口
        mapadminSubwayArray: '/Mapadmin/Subway/array',
        mapadminSubwayAddsave: '/Mapadmin/Subway/addsave',
        mapadminSubwayEdit: '/Mapadmin/Subway/edit',
        mapadminSubwayEditsave: '/Mapadmin/Subway/editsave',
        mapadminSubwayStatus: '/Mapadmin/Subway/status',
        mapadminSubwaySlist: '/Mapadmin/Subway/slist',
        mapadminSubwaySaddsave: '/Mapadmin/Subway/saddsave',
        mapadminSubwaySedit: '/Mapadmin/Subway/sedit',
        mapadminSubwaySeditsave: '/Mapadmin/Subway/seditsave',

        mapadminPhotoList: '/Mapadmin/Photo/list',// 相册列表接口
        mapadminPhotoArray: '/Mapadmin/Photo/array',
        mapadminPhotoAddsave: '/Mapadmin/Photo/addsave',
        mapadminPhotoEdit: '/Mapadmin/Photo/edit',
        mapadminPhotoEditsave: '/Mapadmin/Photo/editsave',
        mapadminPhotoStatus: '/Mapadmin/Photo/status',
        mapadminPhotoUpload: '/Mapadmin/Photo/upload',

        mapadminSpecsEdit: '/Mapadmin/Specs/edit',// 规划参数接口
        mapadminSpecsSave: '/Mapadmin/Specs/save',

        mapadminAdList: '/Mapadmin/Ad/list',// 广告列表接口
        mapadminAdInfo: '/Mapadmin/Ad/info',
        mapadminAdAdd: '/Mapadmin/Ad/add',
        mapadminAdUpdate: '/Mapadmin/Ad/update',
        mapadminAdStatus: '/Mapadmin/Ad/status',
        mapadminAdDelete: '/Mapadmin/Ad/delete',

        mapadminAreaList: '/Mapadmin/Area/list',// 区域列表接口
        mapadminAreaInfo: '/Mapadmin/Area/info',
        mapadminAreaAdd: '/Mapadmin/Area/add',
        mapadminAreaUpdate: '/Mapadmin/Area/update',
        mapadminAreaStatus: '/Mapadmin/Area/status',
        mapadminAreaDelete: '/Mapadmin/Area/delete',
        mapadminAreaSelect: '/Mapadmin/Area/select',
    }
};
