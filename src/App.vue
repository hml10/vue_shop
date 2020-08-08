<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
// 引入Header组件
import Header from "./components/Header/index";
// 引入Footer组件
import Footer from "./components/Footer";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
</style>
