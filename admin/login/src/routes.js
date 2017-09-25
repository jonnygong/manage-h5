import Login from './views/Login/Login.vue'
import Main from './views/Main/Main.vue'
// 欢迎页
import Wechat from './views/Welcome/Wechat.vue'
import Project from './views/Welcome/Project.vue'

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
                meta: {requiresAuth: true}
            },
            {
                path: '/project',
                component: Project,
                name: '选择项目',
                meta: {requiresAuth: true}
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