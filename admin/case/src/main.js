import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    // 获取当前路由是否需要验证
    if (to.meta.requiresAuth) {
        // 判断该路由是否需要登录权限
        if (window.sessionStorage.getItem("IS_LOGIN")) {
            // 通过 store 中 isLogin 判断是否已登录
            next()
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
                // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }
});

// 导出 vue 实例
export const vm = new Vue({
    router,
    store,
    ...App
}).$mount('#app');

