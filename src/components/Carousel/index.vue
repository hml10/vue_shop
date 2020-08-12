<template>
  <div class="swiper-container" id="sw1" ref="sw">
    <!-- 图片区域 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carouse in carouselList" :key="carouse.id">
        <img :src="carouse.imgUrl" alt="轮播图" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";

export default {
  props: ["carouselList"], // 接收ListContainer父组件传来的数据
  name: "Carousel",
  // 监视
  watch: {
    carouselList() {
      this.$nextTick(() => {
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。---vue api 中 vm.$nextTick
        var mySwiper = new Swiper(this.$refs.sw, {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            autoplay: true,
            delay: 1000, //1秒切换一次
          },
        });
        //鼠标覆盖停止自动切换
        mySwiper.el.onmouseover = function () {
          mySwiper.autoplay.stop();
        };

        //鼠标离开开始自动切换
        mySwiper.el.onmouseout = function () {
          mySwiper.autoplay.start();
        };
      });
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.swiper-container {
  cursor: pointer;
}
</style>
