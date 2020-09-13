// 引入组件，并且注册成路由组件-----@相当于src路径---现在用是没有提示的，需要配置jsconfig.json文件

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '../pages/Register';
import Search from '../pages/Search';
// 引入detail组件
import Detail from '@/pages/Detail';
// 引入AddCartSuccess加入购物车组件
import AddCartSuccess from '@/pages/AddCartSuccess';
// 引入购物车组件
import ShopCart from '@/pages/ShopCart';

// 引入交易组件
import Trade from '@/pages/Trade';
// 引入支付组件
import Pay from '@/pages/Pay';
// 引入支付成功组件
import PaySuccess from '@/pages/PaySuccess';
// 引入个人中心组件
import Center from '@/pages/Center';

// 引入个人中心我的订单组件
import MyOrder from '@/pages/Center/MyOrder';
// 引入个人中心团购组件
import GroupBuy from '@/pages/Center/GroupBuy';

export default [
  // 首页路由组件
  {
    path: '/',
    component: Home,
  },

  // 登录路由组件
  {
    path: '/login',
    component: Login,
    // 隐藏footer组件
    meta: {
      isHideFooter: true,
    },
  },

  // 注册路由组件
  {
    path: '/register',
    component: Register,
    // 隐藏footer组件
    meta: {
      isHideFooter: true,
    },
  },

  // 搜索路由组件
  {
    //路由传参
    name: 'search', //命名路由
    path: '/search/:keyword?', //params 方式--->后面加的问号代表params参数可传可不传(解决没参数不能跳转)
    component: Search,
  },

  // {
  //   //路由传参
  //   path: "/search", //query 方式
  //   component: Search,
  // },
  // 重定向

  // 详情路由组件
  {
    name: 'detail', //命名路由、商品详情
    path: '/detail/:skuId',
    component: Detail,
  },

  // 加入购物车路由组件
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
  },

  // 引入购物车组件
  {
    path: '/shopcart',
    component: ShopCart,
  },

  // 交易路由组件
  {
    path: '/trade',
    component: Trade,
  },

  // 支付路由组件
  {
    path: '/pay',
    component: Pay,
  },

  // 支付成功路由组件
  {
    path: '/paysuccess',
    component: PaySuccess,
  },

  // 个人中心路由组件
  {
    path: '/center',
    component: Center,
    children: [
      // 二级路由 我的订单组件
      {
        path: '/center/myorder',
        component: MyOrder,
      },
      // 团购组件
      {
        path: '/center/groupbuy',
        component: GroupBuy,
      },
      // 重定向
      {
        path: '/center',
        redirect: '/center/myorder',
      },
    ],
  },

  {
    path: '/',
    redirect: '/',
  },
];
