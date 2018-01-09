import Author from '@/components/author/author.vue';
import Layout from '@/views/layout/layout.vue';
import Index from '@/views/index/index.vue';
import Rule from '@/views/index/rule.vue';
import Join from '@/views/index/join.vue';

// 微信授权不能异步加载组件
export default [
  {
    path: '/',
    component: Layout,
    name: 'layout',
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: Index,
        name: 'index'
      },
      {
        path: '/rule',
        component: Rule,
        name: 'rule'
      },
      {
        path: '/join',
        component: Join,
        name: 'join'
      }
    ]
  },
  {
    path: '/author/:auth',
    name: 'Author',
    component: Author
  },
  {
    path: '*',
    name: '404',
    redirect: '/'
  }
];
