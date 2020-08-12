// 引入api接口
import { reqBaseCategoryList, reqBanners, reqFloors } from "@/api";

// home里面的都是子的：访问子的数据，需要通过总的来访问
// export default {
//   name:'小明'
// };
// 访问总的state: this.$store.state.name ---> '小明'
// 访问子的state: this.$store.总的state.模块名字.属性值 this.$store.home.state.name

const state = {
  baseCategoryList: [], //所有三级分类信息数组
  banners: [], //用来存储大轮播图的数据数组
  floors: [], //用来存储楼层的数组
};

const mutations = {
  // 接收，直接修改三级分类数据信息的方法
  RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
    state.baseCategoryList = baseCategoryList.slice(0, -2); //减去遍历出多余的两条数据
  },
  // 直接修改大轮播图的数据
  RECEIVE_BANNERS(state, banners) {
    state.banners = banners;
  },
  // 直接修改楼层的数据
  RECEIVE_FLOORS(state, floors) {
    state.floors = floors;
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

  // 发送请求获取大轮播图数据
  async getBanners({ commit }) {
    const result = await reqBanners();
    if (result.code === 200) {
      commit("RECEIVE_BANNERS", result.data);
    }
  },

  // 发送请求获取楼层数据
  async getFloors({ commit }) {
    const result = await reqFloors();
    if (result.code === 200) {
      commit("RECEIVE_FLOORS", result.data);
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
