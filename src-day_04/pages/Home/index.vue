<template>
  <div>
    <!-- 商品分类导航、全局组件 -->
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor />
    <!--楼层-->
    <Floor />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
// 引入组件模块 homeModules
import components from "./homeModules";

export default {
  name: "Home",
  // 注册组件
  components,
  // 页面加载
  mounted() {
    // 获取大轮播图数据
    this.$store.dispatch("getBanners");
    // 获取楼层数据
    this.$store.dispatch("getFloors");
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
</style>
