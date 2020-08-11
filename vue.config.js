// 解决跨域问题

module.exports = {
  lintOnSave: false, //关闭eslint语法检查
  devServer: {
    proxy: {
      // 只对请求路由以/api开头的请求进行代理转发
      "/api": {
        // target: "http://47.93.148.192", // 转发目标地址
        target: "http://182.92.128.115", // 转发目标地址
        changeOrigin: true, //是否进行跨域
        // pathRewrite: {
        //   "^/api": "", // 请求的时候 /api就会替换成 ''
        // },
      },
    },
  },
};
