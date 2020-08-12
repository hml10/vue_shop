// 引入二次封装的axios文件
import ajax from "./ajax";
// 引入二次封装的axios文件----给mock使用的
import mockAjax from "./mockAjax";

// 获取三级分类数据信息列表
export const reqBaseCategoryList = () =>
  ajax.get("/product/getBaseCategoryList");

// 登录的接口 post请求，有参数
export const reqLogin = (mobile, password) =>
  ajax.post("/user/passport/login", { mobile, password });

// 引入mock数据测试
export const reqBanners = () => mockAjax.get("/banners");
export const reqFloors = () => mockAjax.get("/floors");

// 调用mock接口测试
// reqBanners().then((resolve) => {
//   console.log(resolve);
// });

// reqFloors().then((resolve1) => {
//   console.log(resolve1);
// });
