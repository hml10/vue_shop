// 引入mock
import Mock from "mockjs";

// 引入banners 首页大轮播图
import banners from "./banners.json";
// 引入floors 首页楼层数据
import floors from "./floors.json";

// 使用mock的相关方法，进行接口的拦截及返回数据操作
// 自己确定banners数据的接口地址--> /mock/banners 和floors数据的接口地址--> /mock/floors

// 参数1 要拦截的接口地址 参数2 要返回的数据模块
Mock.mock("/mock/banners", { code: 200, message: "成功", data: banners });
Mock.mock("/mock/floors", { code: 200, message: "成功", data: floors });

// 注意：此里面的代码，不需要声明使用，不需要进行暴露，但是必须要先执行一次
// 在main.js中引入mock  import "./mock/mockServer";

// console.log("hello");
