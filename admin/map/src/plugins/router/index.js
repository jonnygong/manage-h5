import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import configs from '@/configs'

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    // mode: 'history'
});

router.beforeEach((to, from, next) => {
    document.title = `${configs.title} - ${to.name}`;
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

export default router;