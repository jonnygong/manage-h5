import babelpolyfill from 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
// import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router';
import store from './vuex/store';
import Vuex from 'vuex';
import routes from './routes';
import 'font-awesome/css/font-awesome.min.css';
import { Message } from 'element-ui';

import Main from './views/Main/Main.vue';
// 系统管理
import Modules from './views/Manage/Project.vue';
import WechatManage from './views/Manage/Wechat.vue';
import Users from './views/Manage/User.vue';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // 获取access_token
  let isLogin = sessionStorage.getItem('IS_LOGIN');
  // 判断是否为登录页，删除上次登录信息
  if (to.path === '/login') {
    sessionStorage.removeItem('IS_LOGIN');
    return next();
  }
  // 判断是否已登录，未登录则跳转至登录页
  if (!isLogin && to.path !== '/login') {
    return next({path: '/login'});
  } else {
    if (to.meta.isSuper) {
      if (to.meta.isSuper === store.state.isSuper) {
        return next();
      } else {
        // 错误提示
        Message.error({
          message: '无权访问',
          showClose: true,
        });
        return next({path: '/'});
      }
    } else {
      if (to.meta.requiresAuth) {
        // 若已登录，则检查是否已选择公众号
        let wechatId = sessionStorage.getItem('WECHAT_ID');
        if (!wechatId && to.path !== '/') {
          // 错误提示
          Message.error({
            message: '请先选择公众号',
            showClose: true,
          });
          return next({path: '/'});
        } else {
          next();
        }
      } else {
        next();
      }
    }
  }
});

// 导出 vue 实例
export const vm = new Vue({
  router,
  store,
  ...App
}).$mount('#app');

