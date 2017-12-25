import Author from '@/components/author/author.vue'
import Index from '@/views/index.vue'

// 微信授权不能异步加载组件
export default [
  {
    path: '/',
    component: Index,
    name: 'index'
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
