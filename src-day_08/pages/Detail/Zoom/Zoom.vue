<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" ref="event" @mousemove="handleMove"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
// 引入lodash节流函数
import throttle from "lodash/throttle";

export default {
  name: "Zoom",
  // 接收父组件传过来的图片
  props: {
    imgUrl: String,
    bigImgUrl: String,
  },
  // 页面加载后回调
  mounted() {
    // 获取event的宽度
    this.maskWidth = this.$refs.event.clientWidth / 2;
    // console.log(this.maskWidth);
  },
  // 方法
  methods: {
    // // 鼠标移动事件
    // handleMove() {
    //   // console.log("测试");
    // },

    // 鼠标移动事件
    handleMove: throttle(function (event) {
      // console.log("测试");
      // console.log(event); // event事件对象
      // 获取鼠标移动的坐标
      const { offsetX, offsetY } = event;
      // console.log(offsetX, offsetY); // 得到鼠标移动的坐标信息
      // 计算mask的宽度---上面已经得到了
      const maskWidth = this.maskWidth;
      // 设置left和top值、让鼠标在遮挡层的中间位置
      let left = 0;
      let top = 0;
      left = offsetX - maskWidth / 2;
      top = offsetY - maskWidth / 2;
      // console.log(left, top);

      // 限制left和top的范围
      if (left < 0) {
        left = 0;
      } else if (left > maskWidth) {
        left = maskWidth;
      }

      if (top < 0) {
        top = 0;
      } else if (top > maskWidth) {
        top = maskWidth;
      }

      // 获取mask这个div
      const maskDiv = this.$refs.mask;
      // 移动遮挡层
      maskDiv.style.left = left + "px";
      maskDiv.style.top = top + "px";

      // 获取右侧大图移动
      const bigImg = this.$refs.bigImg;
      bigImg.style.left = -2 * left + "px";
      bigImg.style.top = -2 * top + "px";
    }, 5),
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  cursor: move;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #ccc; // 外层边框
    overflow: hidden;
    z-index: 998;
    display: none;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>