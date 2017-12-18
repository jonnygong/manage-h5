import Main from './views/Main/Main.vue'
// 欢迎页
import Welcome from './views/Welcome/Welcome.vue'
// 爆料列表
import Rebellion from './views/NewsLeaks/Rebellion/Rebellion.vue'
// 爆料分类
import RebellionType from './views/NewsLeaks/RebellionType/RebellionType.vue'
// 记者列表
import Reporter from './views/NewsLeaks/Reporter/Reporter.vue'

let routes = [
    // 欢迎页
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'fa fa-bookmark',
        leaf: true, //只有一个节点
        children: [
            {
                path: '/',
                component: Welcome,
                name: '欢迎使用',
                meta: {requiresAuth: true}
            }
        ]
    },
    // 爆料列表
    {
        path: '/',
        component: Main,
        name: '爆料列表',
        id: 'build',
        iconCls: 'fa fa-tasks',
        leaf: true,//只有一个节点
        children: [
            {path: '/rebellion', component: Rebellion, name: '爆料列表', meta: {requiresAuth: true}},
        ]
    },
    // 爆料分类列表
    {
        path: '/',
        component: Main,
        name: '',
        id: 'build',
        iconCls: 'fa fa-external-link',
        leaf: true,//只有一个节点
        children: [
            {path: '/rebelliontype', component: RebellionType, name: '爆料分类列表', meta: {requiresAuth: true}}
        ]
    },
    // 记者列表
    {
        path: '/',
        component: Main,
        name: '',
        id: 'build',
        iconCls: 'fa fa-leaf',
        leaf: true,//只有一个节点
        children: [
            {path: '/reporter', component: Reporter, name: '记者列表', meta: {requiresAuth: true}}
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
