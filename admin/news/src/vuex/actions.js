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
    commit('SET_PROJECT', data)
};
