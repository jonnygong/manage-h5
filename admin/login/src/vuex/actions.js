//test
export const login = ({commit}, data) => {
  window.sessionStorage.setItem('IS_LOGIN', true);
  window.sessionStorage.setItem('USER_NAME', data.user);
};
export const login_out = ({commit}) => {
  window.sessionStorage.removeItem('IS_LOGIN');
  window.sessionStorage.removeItem('USER_NAME');
  commit('LOGIN_OUT')
};
export const set_project = ({commit}, data) => {
  window.sessionStorage.setItem('PROJECT_ID', data.id);
  window.sessionStorage.setItem('PROJECT_NAME', data.name);
  commit('SET_PROJECT_NAME', data.name);
};
export const set_wechat = ({commit}, data) => {
  window.sessionStorage.setItem('WECHAT_ID', data.id);
  window.sessionStorage.setItem('WECHAT_NAME', data.name);
  commit('SET_WECHAT_NAME', data.name);
};
export const clear_project = ({commit}) => {
  window.sessionStorage.removeItem('PROJECT_ID');
  window.sessionStorage.removeItem('PROJECT_NAME');
  commit('CLEAR_PROJECT_NAME');
};
export const clear_wechat = ({commit}) => {
  window.sessionStorage.removeItem('WECHAT_ID');
  window.sessionStorage.removeItem('WECHAT_NAME');
  commit('CLEAR_WECHAT_NAME');
};

export const add_setting_nav = ({commit}) => {
  commit('ADD_SETTING_NAV', {
    name: '系统管理',
    iconCls: 'fa fa-archive',
    url: '',
    children: [{
      name: '选择公众号',
      url: '/wechat'
    }, {
      name: '模块管理',
      url: '/modules'
    }, {
      name: '用户管理',
      url: '/users'
    }]
  });
  commit('SET_TO_SUPER')
};