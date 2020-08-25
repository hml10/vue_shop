// 引入utils中产生的uuid函数
import { getUUID } from "@/utils/storageUtils";

const state = {
  userInfo: {}, //用户信息数据对象
  userTempId: getUUID(), // 零时用户id
};

const mutations = {
  // 修改用户信息的数据
  // RECEIVE_USERINFO(state, userInfo) {
  //   state.userInfo = userInfo;
  // },
};

const actions = {};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
