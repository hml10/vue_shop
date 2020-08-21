<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImg,index) in skuImageList" :key="skuImg.id">
        <img
          :src="skuImg.imgUrl"
          :class="{active:currentIndex===index}"
          @click="changCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";
// 引入vuex的辅助函数
import { mapGetters } from "vuex";

export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0, // 当前图标的下标、默认值选择第一个
    };
  },

  // 计算属性
  computed: {
    ...mapGetters(["skuImageList"]),
  },

  // 监视
  watch: {
    skuImageList: {
      // 该回调将会在侦听开始之后被立即调用
      handler: function (val) {
        // console.log("watch执行次数", this.carouselList.length); // 此时，执行4次。会导致swiper对象也创建4次。需要优化watch内部代码执行次数
        if (val.length === 0) return;
        // console.log("watch执行次数", this.carouselList.length); // 优化成功
        this.$nextTick(() => {
          // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。---vue api 中 vm.$nextTick
          new Swiper(this.$refs.swiper, {
            slidesPerView: 5, // 设置一次显示多少张图片
            slidesPerGroup: 2, // 设置每次翻页3张图片
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true,
    },
  },

  // 方法
  methods: {
    changCurrentIndex(index) {
      this.currentIndex = index; //设置当前图标的下标，点击时显示高亮选中效果

      // 分发自定义事件、通知外部父级组件
      this.$emit("changCurrentIndex", index);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>