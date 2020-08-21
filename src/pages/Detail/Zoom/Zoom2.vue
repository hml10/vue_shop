<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" ref="event" @mousemove="move"></div>
    <div class="big">
      <img :src="bigImgUrl" :style="{left: bigImgLeft+'px', top: bigImgTop+'px'}" />
    </div>
    <div class="mask" :style="{left: maskLeft+'px', top: maskTop+'px'}"></div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
export default {
  name: "Zoom",

  props: {
    bigImgUrl: String,
    imgUrl: String,
  },

  data() {
    return {
      maskLeft: 0, // 遮罩div的left
      maskTop: 0, // 遮罩div的top
      bigImgLeft: 0, // 大图img的left
      bigImgTop: 0, // 大图img的top
    };
  },

  methods: {
    /* 
      处理鼠标移动
      */
    move: throttle(function (event) {
      console.log("-----");
      // 得到事件坐标(相对于中图左上角)
      const { offsetX, offsetY } = event;
      // 响应move事件div的宽度
      const { eventWidth } = this;
      // 遮罩div的宽度
      const maskWidth = eventWidth / 2;
      // 遮罩div的新的left和top值变量
      let left = 0;
      let top = 0;
      // left和top的最大值
      const maxLeft = maskWidth;
      const maxTop = maxLeft;

      // 计算left
      left = offsetX - maskWidth / 2;
      if (left < 0) {
        left = 0;
      } else if (left > maxLeft) {
        left = maxLeft;
      }
      // 计算top
      top = offsetY - maskWidth / 2;
      if (top < 0) {
        top = 0;
      } else if (top > maxTop) {
        top = maxTop;
      }

      // 更新遮罩div的left和top数据
      this.maskLeft = left;
      this.maskTop = top;

      // 指定大图片的left和top样式
      this.bigImgLeft = -left * 2;
      this.bigImgTop = -top * 2;
    }, 20),
  },

  mounted() {
    // 得到响应move事件div的宽度, 并保存
    this.eventWidth = this.$refs.event.offsetWidth; // eventWidth不需要是响应式的, 不用在data中定义
  },
};
</script>

<style lang="less">
.spec-preview {
  cursor: move;
  position: relative;

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
    border: 1px solid #ccc;
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