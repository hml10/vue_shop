// 引入二次封装的axios文件
import ajax from "./ajax";

// 获取三级分类数据信息列表
export const reqBaseCategoryList = () =>
  ajax.get("/product/getBaseCategoryList");

// 登录的接口 post请求，有参数
export const reqLogin = (mobile, password) =>
  ajax.post("/user/passport/login", { mobile, password });
