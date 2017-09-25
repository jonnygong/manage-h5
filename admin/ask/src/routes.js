import Main from './views/Main/Main.vue'
// 欢迎页
import Welcome from './views/Welcome/Welcome.vue'
// 用户问题列表
import Questions from './views/KfwQA/Questions/Questions.vue'
// 用户追问列表
import Pump from './views/KfwQA/Questions/Pump.vue'
// 问题分类
import QuestionsType from './views/KfwQA/QuestionsType/QuestionsType.vue'
// 专家列表
import Expert from './views/KfwQA/Expert/Expert.vue'


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

    // 快房问答
    {
        path: '/',
        component: Main,
        name: '快房问答',
        id: 'qa',
        iconCls: 'fa fa-bar-chart',
        children: [
            {path: '/questions', component: Questions, name: '用户问题列表', meta: {requiresAuth: true}},
            {path: '/pump', component: Pump, name: '用户追问列表', meta: {requiresAuth: true}}
        ]
    },
    // 问题分类列表
    {
        path: '/',
        component: Main,
        name: '问题分类列表',
        id: 'qa',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            {path: '/questionstype', component: QuestionsType, name: '问题分类列表', meta: {requiresAuth: true}}
        ]
    },
    // 专家列表
    {
        path: '/',
        component: Main,
        name: '',
        id: 'qa',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            {path: '/expert', component: Expert, name: '专家列表', meta: {requiresAuth: true}}
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
