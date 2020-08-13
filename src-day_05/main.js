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

// 引入mock
import "./mock/mockServer";
// 引入swiper样式
import "swiper/css/swiper.css";

Vue.config.productionTip = false; // 关闭浏览器控制台提示信息

// 注册成全局组件--商品分类导航--前面是字符串，注册成全局组件的名字
Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel); // 轮播图全局组件

new Vue({
  render: (h) => h(App),
  // 注册路由器
  router,
  // 注册store仓库
  store,
}).$mount("#app");
