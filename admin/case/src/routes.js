import Login from './views/Login/Login.vue'
import Main from './views/Main/Main.vue'
// 欢迎页
import Welcome from './views/Welcome/Welcome.vue'
// 客户管理
import Client from './views/Client/Client.vue'
// 广告管理
import {Ads, AdsPosition} from './views/Ads'
// 案例管理
import { CaseAct, Category } from './views/Case'
// 分享配置
import ShareConfig from './views/Share/Share.vue'
// 访问统计
import Analysis from './views/Analysis/Analysis.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    // 欢迎页
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'fa fa-bookmark',
        leaf: true, //只有一个节点
        children: [
            {path: '/', component: Welcome, name: '欢迎使用', meta: {requiresAuth: true}}
        ]
    },
    // 客户管理
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'fa fa-users',
        leaf: true,//只有一个节点
        children: [
            {path: '/client', component: Client, name: '客户管理', meta: {requiresAuth: true}}
        ]
    },
    // 广告管理
    {
        path: '/',
        component: Main,
        name: '广告',
        iconCls: 'fa fa-podcast',//图标样式class
        children: [
            {path: '/ads/position', component: AdsPosition, name: '广告位管理', meta: {requiresAuth: true}},
            {path: '/ads/list', component: Ads, name: '广告管理', meta: {requiresAuth: true}}
        ]
    },
    // 案例管理
    {
        path: '/',
        component: Main,
        name: '案例',
        iconCls: 'fa fa-cube',
        children: [
            {path: '/case/category', component: Category, name: '分类管理', meta: {requiresAuth: true}},
            {path: '/case/list', component: CaseAct, name: '案例管理', meta: {requiresAuth: true}}
        ]
    },
    // 分享配置
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'fa fa-share-square-o',
        leaf: true,//只有一个节点
        children: [
            {path: '/share', component: ShareConfig, name: '分享配置', meta: {requiresAuth: true}}
        ]
    },
    // 访问统计
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            {path: '/analysis', component: Analysis, name: '访问统计', meta: {requiresAuth: true}}
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