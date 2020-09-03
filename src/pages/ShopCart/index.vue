<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item) in shopCartList" :key="item.id">
          <li class="cart-list-con1">
            <!-- <input type="checkbox" name="chk_list" v-model="item.isChecked" /> -->
            <!-- <input type="checkbox" name="chk_list" :checked="isChecked(index)" /> -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @click="checkCartItem(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" v-model="item.skuNum" />
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuPrice*item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javaScript:" class="sindelet" @click="deleteCartItem(item.skuId)">删除</a>
            <br />
            <a href="javaScript:">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllCheck" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javaScript:" @click="deleteCartItems">删除选中的商品</a>
        <a href="javaScript:">移到我的关注</a>
        <a href="javaScript:">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{totalCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState, mapGetters } from "vuex";

export default {
  name: "ShopCart",
  // 计算属性
  computed: {
    ...mapState({
      shopCartList: (state) => state.shopcart.shopCartList, // 拿到数据
    }),
    ...mapGetters([
      "totalCount",
      "totalPrice",
      "isAllCheck",
      "selectedCartItems",
    ]),

    // isChecked: {
    //   get(index) {},
    //   set(val) {
    //     // 对应的item设置选中状态的值
    //   },
    // },
  },

  mounted() {
    this.getShopCartList(); // 发送请求获取数据
  },

  methods: {
    // 封装一个方法，用来发送请求，分发异步的action，获取购物车商品列表数据
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },

    // 删除购物车某件商品方法
    async deleteCartItem(skuId) {
      // 友好的提示
      if (window.confirm("您确定要删除吗？")) {
        const errorMsg = await this.$store.dispatch("deleteCartItem", skuId);
        if (!errorMsg) {
          // 成功，重新发送请求，获取购物车的数据
          this.getShopCartList();
        } else {
          // 失败，如果有错误信息就直接显示出来
          alert(errorMsg);
        }
      }
    },

    // 删除选中的商品
    deleteCartItems() {
      // 获取所有选中的购物项
      const { selectedCartItems } = this;
      // 判断，如果没有选中的购物信息，不做处理
      if (selectedCartItems.length === 0) return;
      // 友好的提示
      if (window.confirm("您确定要删除吗？")) {
        // 定义一个数组作统一的处理
        const promises = [];

        // 发送异步请求、对应的actions只能干掉对应的一个商品，需要遍历
        selectedCartItems.forEach((item) => {
          const promise = this.$store.dispatch("deleteCartItem", item.skuId);
          // 保存返回的promise
          promises.push(promise);
        });
        // 所有的商品都删除成功，重新获取购物车数据，再次发送请求
        Promise.all(promises).then(
          (values) => {
            this.getShopCartList(); // 发送请求
          },
          (error) => {
            alert(error.message || "删除错误");
          }
        );
        // 失败，提示错误信息
      }
    },

    // 修改某个购物项的勾选状态
    checkCartItem(item) {
      // 先获取当前的购物项选中状态
      const isChecked = item.isChecked === 1 ? 0 : 1;
      const { skuId } = item;
      console.log(isChecked); // 后台没数据，没看到效果，暂时没有注释的

      // 分发action修改勾选状态
      this.$store.dispatch("checkCartItem", { skuId, isChecked }).then(
        () => {
          // 修改选中状态成功，重新获取购物车商品列表数据
          this.getShopCartList();
        },
        (error) => {
          // 修改状态失败时
          alert(error.message);
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>