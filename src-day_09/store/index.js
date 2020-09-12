// 引入vue
import Vue from "vue";

// 引入vuex
import Vuex from "vuex";

// 声明使用vuex
Vue.use(Vuex);

// 引入state
import state from "./state";
// 引入mutations
import mutations from "./mutations";
// 引入actions
import actions from "./actions";
// 引入getters
import getters from "./getters";

// // 引入home模块
// import home from "./modules/home";
// // 引入user模块
// import user from "../store/modules/user";

// 引入modules
import modules from "./modules";

// 实列化vuex仓库对象，并且暴露
export default new Vuex.Store({
  state, //总的
  mutations, //总的
  actions, //总的
  getters, //总的
  modules,
  // modules: {
  //   home,
  //   user,
  // },
});
