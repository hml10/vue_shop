<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- 在注册和登录页面 隐藏footer组件 -->
    <Footer v-if="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
// 引入Header组件
import Header from "./components/Header";
// 引入Footer组件
import Footer from "./components/Footer";

// 引入api接口测试
// import { reqBaseCategoryList } from "./api";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
  // 页面加载后
  async mounted() {
    // const result = await reqBaseCategoryList();
    // console.log(result);
    // 通过提交actions，使用vuex的方式来发送请求
    // this.$store.dispatch("getBaseCategoryList"); //异步操作
    // console.log(this.$store);
    // console.log(this.$store.state.home.baseCategoryList);
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
</style>
