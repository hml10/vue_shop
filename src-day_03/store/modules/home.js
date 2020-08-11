// 引入api接口
import { reqBaseCategoryList } from "@/api";

// home里面的都是子的：访问子的数据，需要通过总的来访问
// export default {
//   name:'小明'
// };
// 访问总的state: this.$store.state.name ---> '小明'
// 访问子的state: this.$store.总的state.模块名字.属性值 this.$store.home.state.name

const state = {
  baseCategoryList: [], //所有三级分类信息数组
};

const mutations = {
  // 接收，直接修改三级分类数据信息的方法
  RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
    state.baseCategoryList = baseCategoryList.slice(0, -2); //减去遍历出多余的两条数据
  },
};

const actions = {
  // 异步获取三级分类信息数据
  async getBaseCategoryList({ commit }) {
    // 调用接口发送异步请求
    const result = await reqBaseCategoryList();
    if (result.code === 200) {
      // 提交对应的mutations，并修改状态数据
      commit("RECEIVE_BASE_CATEGORY_LIST", result.data);
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
