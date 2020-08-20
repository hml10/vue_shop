// 引入vue
import Vue from "vue";

// 引入Vue-Router
import VueRouter from "vue-router";

// 引入routes
import routes from "./routes";

// 解决路由跳转的bug 从Header组件内部 点击搜索按钮跳转的bug过来的 编写统一的解决方案 重写它原型上的push和replace方法，给它添加一个成功回调
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

// 1、给成功的回调指定一个默认为空的函数参数即可 onComplete = () => {}
VueRouter.prototype.push = function(location, onComplete = () => {}, onAbort) {
  return originPush.call(this, location, onComplete, onAbort);
};
// 2、给失败的回调指定一个默认为空的函数参数即可
VueRouter.prototype.replace = function(
  location,
  onComplete,
  onAbort = () => {}
) {
  return originReplace.call(this, location, onComplete, onAbort);
};

// 3、指定catch也可以
// VueRouter.prototype.push = function(location, onComplete = () => {}, onAbort) {
//   return originPush.call(this, location, onComplete, onAbort).catch(() => {});
// };

// 声明使用
Vue.use(VueRouter);

// 创建路由对象并且暴露
export default new VueRouter({
  mode: "history", //路由地址两种模式---hash带#---history不带#
  routes, //路由组件注册数组

  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 };
  },
});
