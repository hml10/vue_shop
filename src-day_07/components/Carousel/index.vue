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
    carouselList: {
      // 该回调将会在侦听开始之后被立即调用
      handler: function () {
        // console.log("watch执行次数", this.carouselList.length); // 此时，执行4次。会导致swiper对象也创建4次。需要优化watch内部代码执行次数
        if (this.carouselList.length === 0) return;
        // console.log("watch执行次数", this.carouselList.length); // 优化成功
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
      // 该回调将会在侦听开始之后被立即调用
      immediate: true,
    },
  },
  // 页面加载后
  mounted() {
    // 出现问题：大轮播图可以正常使用，楼层的两个(通过遍历的)不能正常使用。Carousel组件使用了三次会执行三次。
    // 自己分析的结果: 第一次进入mounted的时候有4个数据,二次和三次都是3个数据,3个数据
    // 但是,真实的结果,不是这样的,第一次进入到mounted的时候,数据是0个,第二次和第三次进来的时候的数据都是3个
    // 结论：真实的数据是对的，分析的也是对的。因为，内部代码肯定是在页面加载后才执行，mounted回调中代码而且只会执行一次。
    // ListContainer组件中Carousel是如何创建的：(这里面的数据不是通过遍历生成的，所以代码从上往下执行，数据还没被请求回来，页面就已经被渲染了，组件也被创建，所以数据为0)
    // Floor组件中Carousel是如何创建的：(遍历，数组有数据才能遍历，遍历才能创建Floor组件)因为数据是发送请求回来的，页面加载完毕时，还没有数据，Floor组件不会被创建，页面加载完后，请求回来数据。才创建Floor组件，所以是有数据的
    // console.log("执行了", this.carouselList.length);
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.swiper-container {
  cursor: pointer;
}
</style>
