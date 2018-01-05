import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex);

// 应用初始状态
const state = {
    project: {
        name: '尚未选择任何项目',
        id: ''
    }
};

// 定义所需的 mutations
const mutations = {
    'SET_PROJECT': (state, {id, name}) => {
        state.project.id = id;
        state.project.name = name;
    },
    'CLEAR_PROJECT': (state) => {
        state.project.id = '';
        state.project.name = '尚未选择任何项目';
    },
};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    // getters,
    state,
    mutations
})