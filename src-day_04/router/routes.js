// 引入组件，并且注册成路由组件-----@相当于src路径---现在用是没有提示的，需要配置jsconfig.json文件

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";

export default [
  // 首页路由组件
  {
    path: "/",
    component: Home,
  },
  // 登录路由组件
  {
    path: "/login",
    component: Login,
    // 隐藏footer组件
    meta: {
      isHideFooter: true,
    },
  },
  // 注册路由组件
  {
    path: "/register",
    component: Register,
    // 隐藏footer组件
    meta: {
      isHideFooter: true,
    },
  },
  // 搜索路由组件
  {
    //路由传参
    name: "search", //命名路由
    path: "/search/:keyword?", //params 方式--->后面加的问号代表params参数可传可不传(解决没参数不能跳转)
    component: Search,
  },
  // {
  //   //路由传参
  //   path: "/search", //query 方式
  //   component: Search,
  // },
  // 重定向
  {
    path: "/",
    redirect: "/",
  },
];
