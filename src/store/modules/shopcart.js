// 引入api接口
import {
  reqAddToCart, // 添加购物车的接口
  reqCartList, // 获取购物车数据列表接口
  reqCheckCartItem, // 指定购物车中商品选项状态接口
  reqDeleteCartItem, // 删除购物车商品接口
} from "@/api";
// console.log(reqAddToCart(6, 6)); //测试成功

const state = {
  // 所有购物车列表
  shopCartList: [],
};

const mutations = {
  RECEIVE_SHOP_CART_LIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};

const actions = {
  // 方式一 使用回调函数的方式 (在detail页中使用，现在用的是addToCart2)
  // 添加购物车操作---这里面的commit属于占位，添加购物车发送请求，可能成功、也有可能失败
  async addToCart1({ commit }, { skuId, skuNum, callback }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      // 添加成功
      // console.log("成功");
      callback(""); // 成功传入一个空串
    } else {
      // 添加失败
      // console.log("失败");
      callback(result.message || "添加商品购物车失败");
    }
  },

  // 方式二 使用async配合await
  // 添加购物车操作---这里面的commit属于占位，添加购物车发送请求，可能成功、也有可能失败
  async addToCart2({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum);
    return result.code === 200 ? "" : result.message || "添加购物车失败";
  },

  // 方式二、(加优化) 使用async配合await
  // 添加购物车操作---这里面的commit属于占位，添加购物车发送请求，可能成功、也有可能失败
  async addToCart3({ commit, dispatch }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum);
    // return result.code === 200 ? "" : result.message || "添加购物车失败";
    if (result.code === 200) {
      dispatch("getShopCartList");
    } else {
      alert(result.message || "添加购物车失败");
      // return result.message || "添加购物车失败"
    }
  },

  // 获取购物车数据列表接口
  async getShopCartList({ commit }) {
    const result = await reqCartList();
    if (result.code === 200) {
      commit("RECEIVE_SHOP_CART_LIST", result.data);
    }
  },

  // 删除购物车中的某一项(删除指定商品,skuId)
  async deleteCartItem({ commit }, skuId) {
    const result = await reqDeleteCartItem(skuId);
    if (result.code !== 200) {
      // 删除失败，抛出错误信息error
      throw new Error("删除购物项失败");
      // return Promise.reject(new Error("删除购物项失败"));
    }
    // 删除也是有可能失败的
    // return result.code === 200 ? "" : result.message || "删除商品失败";
  },

  // 修改商品状态，全选全不选
  async checkCartItem({ commit }, { skuId, isChecked }) {
    const result = await reqCheckCartItem(skuId, isChecked);
    // 处理失败的情况
    if (result.code !== 200) {
      throw new Error("切换购物车选中失败");
    }
  },
};

const getters = {
  // 计算商品的总数量
  totalCount(state) {
    // return state.shopCartList.reduce((pre, item) => {
    //   // 判断已经选中的
    //   if (item.isChecked === 1) {
    //     return pre + item.skuNum;
    //   } else {
    //     return pre;
    //   }
    // }, 0);

    return state.shopCartList.reduce((pre, item) => {
      // 判断已经选中的
      return item.isChecked === 1 ? pre + item.skuNum : pre;
    }, 0);
  },

  // 计算商品的总价格
  totalPrice(state) {
    return state.shopCartList.reduce((pre, item) => {
      return item.isChecked === 1 ? pre + item.skuPrice * item.skuNum : pre;
    }, 0);
  },

  // 计算商品是否全选
  isAllCheck(state) {
    return (
      state.shopCartList.length > 0 &&
      state.shopCartList.every((item, index) => item.isChecked === 1)
    );
    // return state.shopCartList.length > 0 && state.shopCartList.every((item, index) => item.isChecked === 1)
  },

  // 计算所有商品中选中的购物项，产生一个数组
  selectedCartItems(state) {
    return state.shopCartList.filter((item, index) => item.isChecked === 1);

    // let cartItems=[]
    // state.shopCartList.forEach(item=>{
    //   if(item.isChecked===1){
    //     cartItems.push(item)
    //   }
    // })
    // return cartItems
    // return state.shopCartList.reduce((pre, item) => {
    //   if (item.isChecked === 1) {
    //     pre.push(item)
    //   } else {
    //     return pre
    //   }
    // }, [])
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
