// 引入vue
import Vue from "vue";
// 引入app
import App from "./App.vue";

// 引入router
import router from "./router";
// 引入store
import store from "./store/index";

// 引入商品分类导航组件
import TypeNav from "./components/TypeNav";
// 引入Carousel组件
import Carousel from "./components/Carousel";
// 引入分页组件
import Pagination from "./components/Pagination";

// 引入vue表单验证插件
import "./validate";

// 引入mock
import "./mock/mockServer";
// 引入swiper样式
import "swiper/css/swiper.css";

Vue.config.productionTip = false; // 关闭浏览器控制台提示信息

// 注册成全局组件--商品分类导航--前面是字符串，注册成全局组件的名字
Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel); // 轮播图全局组件
Vue.component("Pagination", Pagination); // 全局分页组件
// 事件总线
// Vue.prototype.$bus = new Vue();// 事件总线---创建vue实列之前---数据初始化之前

new Vue({
  // 创建初始化之前---使用生命周期回调
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  // 注册路由器
  router,
  // 注册store仓库
  store,
}).$mount("#app");
