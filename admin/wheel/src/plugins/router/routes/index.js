const Main = () => import( '@/views/Main/Main.vue');

let routes = [
  // 欢迎页
  {
    path: '/',
    component: Main,
    name: '',
    iconCls: 'fa fa-bookmark',
    leaf: true, //只有一个节点
    redirect: {path: '/main'},
    children: [{
      path: '/main',
      component: () =>
        import ('@/views/Welcome/Welcome.vue'),
      name: '欢迎使用',
      meta: {requiresAuth: true}
    }]
  },
  // 地铁管理
  {
    path: '/',
    component: Main,
    name: '活动管理',
    iconCls: 'fa fa-leaf',
    leaf: false, //只有一个节点
    children: [
      {
        path: '/create',
        component: () => import('@/views/Create/Create.vue'),
        name: '创建活动',
        meta: {requiresAuth: true}
      },
      {
        path: '/edit/:id',
        component: () => import('@/views/Edit/Edit.vue'),
        name: '编辑活动',
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
