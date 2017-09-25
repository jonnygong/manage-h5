//test
export const login = ({commit}, data) => {
    window.sessionStorage.setItem("IS_LOGIN", true);
    window.sessionStorage.setItem("USER_NAME", data.user);
};
export const login_out = ({commit}) => {
    window.sessionStorage.removeItem("IS_LOGIN");
    window.sessionStorage.removeItem("USER_NAME");
};
export const set_project = ({commit}, data) => {
    window.sessionStorage.setItem('PROJECT_ID', data.id);
    window.sessionStorage.setItem('PROJECT_NAME', data.name);
    commit('SET_PROJECT_NAME', data.name)
};
export const set_wechat = ({commit}, data) => {
    window.sessionStorage.setItem('WECHAT_ID', data.id);
    window.sessionStorage.setItem('WECHAT_NAME', data.name);
    commit('SET_WECHAT_NAME', data.name)
};
export const clear_project = ({commit}) => {
    window.sessionStorage.removeItem('PROJECT_ID');
    window.sessionStorage.removeItem('PROJECT_NAME');
    commit('CLEAR_PROJECT_NAME')
};
export const clear_wechat = ({commit}) => {
    window.sessionStorage.removeItem('WECHAT_ID');
    window.sessionStorage.removeItem('WECHAT_NAME');
    commit('CLEAR_WECHAT_NAME')
};