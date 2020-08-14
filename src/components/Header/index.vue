<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>

            <!-- <a href="###">登录</a>
            <a href="###" class="register">免费注册</a>-->
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 点击图片返回主页面操作 -->
        <router-link class="logo" title="京东" to="/">
          <img src="./images/logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="javascript:" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            @keyup.13="toSearch"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "", //搜索关键字
    };
  },
  // 方法
  methods: {
    // 跳转到search组件
    toSearch() {
      // 编程式路由跳转
      // this.$router.replace(); //没有记录
      // this.$router.push("/search"); // 有记录 此时多次点击按钮，进行编程式路由跳转 控制台中会出现错误信息

      // 1、方式一，每次路由跳转都要设置，一个成功的回调或者失败的回调即可(push和replace解决原理相同)
      // this.$router.push("/search", () => {}); // 成功回调
      // this.$router.push("/search", undefined, () => {}); // 失败回调
      // this.$router.push("/search").then(() => {}); // then方法无法解决
      // this.$router.push("/search").catch(() => {}); // 指定catch传入回调可以解决
      // this.$router.push("/search", () => {
      //   console.log("哈哈哈"); // 成功回调，内部的代码是可以执行的
      // });
      // 2、方式二，使用统一种方式，解决项目中所有路由的跳转bug-->去router目录中的index.js文件中为路由器重写push或者replace方法
      // this.$router.push("/search");

      // 编程式路由传参：可以通过字符串方式，也可以通过对象方式，但是parmas方式和query在以对象方式传递时，是有区别的(注意：query传参path也可以使用name方式)
      // this.$router.push("/search/123");
      // this.$router.push(`/search/${this.keyword}`); //parmas 字符串方式
      // 或者 对象方式的parmas传递--(也称为 命名的路由：在路由传参时给他起一个名字name，将来编程式路由进行跳转传参的时候，根据对象模式书写对应的name)

      // this.$router.push({ name: "search", params: { keyword: this.keyword } }); // 对象方式的params传递 不带参数跳转有警告 加个判断

      // 获取当前路由地址和query参数
      const { path, query } = this.$route;

      // 判断是否有关键字
      if (this.keyword) {
        // 再次判断，当前的路径是不是在search中，路径/search,没有考虑过 /search?xxx这种情况
        // 此时页面可以说明，当前是在search页面中点击搜索按钮进行跳转的
        if (path.indexOf("/search") === 0) {
          // 需要携带query参数和params参数
          this.$router.push({
            name: "search",
            params: { keyword: this.keyword },
            query,
          });
        } else {
          // 说明当前跳转的时候不在search页面中,只需要携带自己的params参数即可
          // 有参数的情况下，携带参数并跳转
          this.$router.push({
            name: "search",
            params: { keyword: this.keyword },
          });
        }
      } else {
        // 再次判断
        if (path.indexOf("/search") === 0) {
          // 没有参数也需要跳转，并且携带query参数
          this.$router.push({ name: "search", query });
        } else {
          // 没有参数也需要跳转
          this.$router.push({ name: "search" });
        }
      }
      this.keyword = ""; // 清空搜索框

      // this.$router.push(`/search?keyword=${this.keyword}`); // query 字符串方式
      // 或者 对象方式的query传递
      // this.$router.push({ path: "/search", query: { keyword: this.keyword } });
    },
  },
};
// 路由器一旦注册后，每个组件中都会出现两个对象
// $router路由器对象，可以调用相关方法，实现编程式路由跳转
// $route 路由组件信息对象，可以获取路由传递的参数数据信息
</script>

<style lang="less" rel="stylesheet/less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .typeList {
        float: right;
        a {
          padding: 0 10px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .logoArea {
      float: left;
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
          height: 56px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;
          &:focus {
            outline: none;
          }
        }
        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
