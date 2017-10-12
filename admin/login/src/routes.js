import Login from './views/Login/Login.vue'
import Main from './views/Main/Main.vue'
// 欢迎页
import Wechat from './views/Entry/Wechat.vue'
import Project from './views/Entry/Project.vue'
// 系统管理
import Modules from './views/Manage/Project.vue'
import WechatManage from './views/Manage/Wechat.vue'
import Users from './views/Manage/User.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '用户登录',
        hidden: true
    },
    // 欢迎页
    {
        path: '/',
        component: Main,
        name: '欢迎使用',
        iconCls: 'fa fa-bookmark',
        children: [
            {
                path: '/',
                component: Wechat,
                name: '选择公众号',
                meta: {requiresAuth: false}
            },
            {
                path: '/project',
                component: Project,
                name: '选择项目',
                meta: {requiresAuth: true}
            }
        ]
    },
    {
        path: '/',
        component: Main,
        name: '系统管理',
        iconCls: 'fa fa-archive',
        children: [
            {
                path: '/wechat',
                component: WechatManage,
                name: '公众号管理',
                meta: {requiresAuth: false}
            },
            {
                path: '/modules',
                component: Modules,
                name: '模块管理',
                meta: {requiresAuth: false}
            },
            {
                path: '/users',
                component: Users,
                name: '用户管理',
                meta: {requiresAuth: false}
            }
        ]
    },
    // 404 页面跳转
    {
        path: '*',
        hidden: true,
        redirect: {path: '/'}
    }
];

export default routes;