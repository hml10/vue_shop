// 引入搜索商品api接口
import { reqProductList } from "@/api";

const state = {
  ProductList: {}, //搜索到的商品数据对象
};

const mutations = {
  RECEIVE_PRODUCT_LIST(state, ProductList) {
    state.ProductList = ProductList;
  },
};

const actions = {
  // 获取商品搜索数据，携带参数对象
  async getProductList({ commit }, searchParams) {
    // console.log("执行下");
    // 调用接口发送异步请求，获取搜索到的商品列表对象
    const result = await reqProductList(searchParams);
    if (result.code === 200) {
      // 提交对应的mutations，并修改状态数据
      commit("RECEIVE_PRODUCT_LIST", result.data);
    }
  },
};

const getters = {
  // 品牌列表数据
  trademarkList(state) {
    return state.ProductList.trademarkList;
  },
  // 属性列表数据
  attrsList(state) {
    return state.ProductList.attrsList;
  },
  // 商品列表数据
  goodsList(state) {
    return state.ProductList.goodsList;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
