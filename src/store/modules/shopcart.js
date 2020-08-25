// 引入api接口
import { reqAddToCart } from "@/api";
// console.log(reqAddToCart(6, 6)); //测试成功

const state = {
  // 所有购物车列表
  shopCartList: [],
};

const mutations = {};

// 方式二
const actions = {
  // 添加购物车操作---这里面的commit属于占位，添加购物车发送请求，可能成功、也有可能失败
  async addToCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum);
    return result.code === 200 ? "" : result.message || "添加购物车失败";
  },
};

// 方式一
// const actions = {
//   // 添加购物车操作---这里面的commit属于占位，添加购物车发送请求，可能成功、也有可能失败
//   async addToCart({ commit }, { skuId, skuNum, callback }) {
//     const result = await reqAddToCart(skuId, skuNum);
//     if (result.code === 200) {
//       // 添加成功
//       // console.log("成功");
//       callback(""); // 成功传入一个空串
//     } else {
//       // 添加失败
//       // console.log("失败");
//       callback(result.message || "添加商品购物车失败");
//     }
//   },
// };

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
