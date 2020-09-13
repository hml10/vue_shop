// 引入api接口函数
import { reqLogin, reqLogout, reqRegister } from '@/api';

// 引入utils中产生的uuid函数
import { getUUID } from '@/utils/storageUtils';

const state = {
  // userInfo: {}, // 用户信息数据对象
  userInfo: JSON.parse(localStorage.getItem('user_info_key')) || {}, // 用户信息数据对象
  userTempId: getUUID(), // 零时用户id
};

const mutations = {
  // 修改用户信息的数据
  RECEIVE_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },

  // 清空用户信息
  RESET_USER_INFO(state) {
    state.userInfo = {};
  },
};

const actions = {
  // 登陆
  async login({ commit }, { mobile, password }) {
    const result = await reqLogin(mobile, password);
    // 登陆也有可能是成功或者失败的
    if (result.code === 200) {
      // 成功
      // 1、把用户信息存储到localStorage中
      const userInfo = result.data;
      localStorage.setItem('user_info_key', JSON.stringify(userInfo));

      // 2、再把用户信息更新到vuex的state状态数据对象中
      commit('RECEIVE_USER_INFO', userInfo);
    } else {
      // 失败
      throw new Error(result.message || '登陆失败');
    }
  },

  // 注册
  async register({ commit }, userInfo) {
    const result = await reqRegister(userInfo);
    // 注册成功不需要做任何处理，失败给提示信息
    if (result.code !== 200) {
      throw new Error(result.message || '注册失败');
    }
  },

  // 退出登陆
  async logout({ commit }) {
    const result = await reqLogout();
    // 成功和失败处理
    if (result.code !== 200) {
      // 失败处理
      throw new Error(result.message || '退出失败');
    } else {
      // 成功处理、重置vuex中state用户信息
      commit('RESET_USER_INFO');
      // 清空缓存
      localStorage.removeItem('user_info_key');
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
