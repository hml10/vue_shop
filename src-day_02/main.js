// 引入vue
import Vue from "vue";
// 引入app
import App from "./App.vue";

// 引入router
import router from "./router";

// 引入商品分类导航组件
import TypeNav from "./components/TypeNav";

Vue.config.productionTip = false;

// 注册成全局组件--商品分类导航--前面是字符串，注册成全局组件的名字
Vue.component("TypeNav", TypeNav);

new Vue({
  render: (h) => h(App),
  // 注册路由器
  router,
}).$mount("#app");
