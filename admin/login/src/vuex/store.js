import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
// import * as getters from './getters'

const state = {
    project_name: '未选择项目',
    wechat_name: '未选择公众号'
};
const mutations = {
    SET_PROJECT_NAME(state, payload) {
        state.project_name = payload;
    },
    SET_WECHAT_NAME(state, payload) {
        state.wechat_name = payload;
    },
    CLEAR_PROJECT_NAME(state, payload) {
        state.project_name = '未选择项目';
    },
    CLEAR_WECHAT_NAME(state, payload) {
        state.wechat_name = '未选择公众号';
    }
};

Vue.use(Vuex);

// 创建 store 实例
export default new Vuex.Store({
    actions,
    // getters,
    state,
    mutations
})