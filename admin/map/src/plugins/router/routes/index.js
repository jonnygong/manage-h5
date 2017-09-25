const Main = () => import( '@/views/Main/Main.vue');

let routes = [
    // 登录页
    {
        path: '/login',
        component: () => import('@/views/Login/Login.vue'),
        name: '用户登录',
        hidden: true
    },
    // 欢迎页
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'fa fa-bookmark',
        leaf: true, //只有一个节点
        children: [{
            path: '/main',
            component: () =>
                import ('@/views/Welcome/Welcome.vue'),
            name: '欢迎使用',
            meta: { requiresAuth: true }
        }]
    },
    // 楼盘列表
    {
        path: '/',
        component: Main,
        name: '楼盘列表',
        iconCls: 'fa fa-edit',
        leaf: true, //只有一个节点
        children: [
            {
                path: '/estate',
                component: () => import('@/views/Estate/Estate.vue'),
                name: '楼盘列表',
                meta: {requiresAuth: true}
            },
            {
                path: '/specs/:id',
                component: () => import('@/views/Estate/Specs.vue'),
                name: '规划参数',
                meta: {requiresAuth: true}
            },
            {
                path: '/album/:id',
                component: () => import('@/views/Estate/Album.vue'),
                name: '楼盘相册',
                meta: {requiresAuth: true}
            }
        ]
    },
    // 地铁管理
    {
        path: '/',
        component: Main,
        name: '地铁管理',
        iconCls: 'fa fa-leaf',
        leaf: true, //只有一个节点
        children: [
            {
                path: '/subway',
                component: () => import('@/views/Subway/Subway.vue'),
                name: '线路管理',
                meta: {requiresAuth: true}
            },
            {
                path: '/plate/:id',
                component: () => import('@/views/Subway/SubwayPlate.vue'),
                name: '站点管理',
                hidden: true,
                meta: {requiresAuth: true}
            },
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
