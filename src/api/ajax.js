// 封装axios,设置请求拦截器和响应拦截器

// 引入axios
import axios from 'axios';

// 引入nprogress以及样式
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';

// 配置一个通用的axios 基础路径和请求超时时间
const ajax = axios.create({
  // 注意大小写
  baseURL: '/api', // 前缀路径
  timeout: 10000, // 连接请求超时时间
});

// 请求拦截器
ajax.interceptors.request.use(
  (config) => {
    //显示请求中的水平进度条(请求成功或者失败后需要隐藏进度条)
    Nprogress.start();

    // 5、所有的请求头都需要携带userTempId
    config.headers['userTempId'] = store.state.user.userTempId; // 用户零时id凭证--->vuex--->store.state.userTempId

    // 6、如果有token 请求的时候就自动携带token
    const token = store.state.user.userInfo.token;
    // console.log(token);
    if (token) {
      config.headers['token'] = token;
    }

    return config; // 必须返回配置对象 牛逼
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
ajax.interceptors.response.use(
  (response) => {
    // 隐藏进度条
    Nprogress.done();

    // 返回响应体数据 响应成功后返回的是数据response.data，不是response
    return response.data;
  },
  (error) => {
    // 隐藏进度条
    Nprogress.done();

    //统一处理一下错误
    alert(`请求出错:${error.message || '未知错误'}`);

    return Promise.reject(error);
  }
);

// 向外暴露ajax
export default ajax;
