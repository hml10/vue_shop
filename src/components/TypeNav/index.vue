<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <p>{{baseCategoryList}}</p> 测试数据用的 -->

    <div class="container">
      <div @mouseenter="isShowFirst=true" @mouseleave="firstHide">
        <h2 class="all">全部商品分类</h2>

        <!-- 一级菜单分类列表 -->
        <div class="sort" @mouseleave="currentIndex=-2" @click="toSearch" v-if="isShowFirst">
          <div class="all-sort-list2">
            <!-- 遍历三级菜单数据 实现鼠标进入离开添加颜色 -->
            <div
              class="item"
              v-for="(c1,index) in baseCategoryList"
              :key="c1.categoryId"
              :class="{item_on:currentIndex===index}"
              @mouseenter="showSubCategorys(index)"
            >
              <h3>
                <!-- Search?categoryName=图书、音像、电子书刊&category1Id=1 -->
                <!-- 显示一级菜单 -->
                <a
                  href="javascript:"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                >{{c1.categoryName}}</a>
                <!-- <router-link
                :to="{path:'Search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}"
                >{{c1.categoryName}}</router-link>-->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <!-- 遍历二级菜单数据 -->
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <!-- 显示二级菜单 -->
                      <a
                        href="javascript:"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                      >{{c2.categoryName}}</a>
                      <!-- <router-link
                      :to="{path:'Search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}"
                      >{{c2.categoryName}}</router-link>-->
                    </dt>

                    <dd>
                      <!-- 遍历三级菜单数据 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <!-- 显示三级菜单 -->
                        <a
                          href="javascript:"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                        >{{c3.categoryName}}</a>
                        <!-- <router-link
                        :to="{path:'Search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}"
                        >{{c3.categoryName}}</router-link>-->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState } from "vuex";

// 引入lodash插件库
// import _ from "lodash"; //缺点：会把整个库引入，加大内存。以下按需引入，只引进throttle函数
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -2, // 默认储存的索引值为-2，用来储存鼠标进入某个菜单后，当前菜单索引值
      isShowFirst: true, //默认显示一级分类列表
    };
  },
  // 页面加载后
  mounted() {
    // 提交对应的action 目的：获取三级分类数据
    // console.log(this.$store.state.home.baseCategoryList);
    this.$store.dispatch("getBaseCategoryList");

    // 判断当前路径是不是 / 决定显示不显示
    if (this.$route.path !== "/") {
      this.isShowFirst = false;
    }
  },
  computed: {
    // ...mapState(), // 适合总的state中的数据写法
    // 通过辅助函数已经获取到三级分类数据
    ...mapState({
      baseCategoryList: (state) => state.home.baseCategoryList,
    }),
  },
  // 方法
  methods: {
    // 所有一级菜单的鼠标进入事件的回调
    // showSubCategorys(index) {
    //   this.currentIndex = index;
    // },

    // 使用lodash插件库的节流函数优化三级菜单卡顿问题--缺陷加大了内存
    // showSubCategorys: _.throttle(function (index) {
    //   this.currentIndex = index;
    //   console.log(index);
    // }, 200),

    // 按需引入throttle实现节流优化
    showSubCategorys: throttle(function (index) {
      this.currentIndex = index; // 鼠标滑动改变样式
      // console.log(index); //节流测试
    }, 200),

    // 通过事件委托方式，实现编程式路由跳转，同时携带相对应的参数数据
    toSearch(event) {
      // 目前该事件确实可以在点击a时标签触发，缺点：点击空白处也触发该事件
      // console.log("我被点了"); // 缺点：点击空白处也触发该事件
      // console.dir(event.target);
      // console.log(event.target.tagName); //获取到事件源的标签名字
      if (event.target.tagName === "A") {
        // this.$router.push({ path: "Search" }); // 跳转到search
        // console.log(event.target.dataset); //可以得到用data-储存的参数对象
        // 通过编程式路由跳转，同时，传递query对应参数
        const {
          categoryname,
          category1id,
          category2id,
          category3id,
        } = event.target.dataset;

        // 准备query参数
        const query = { categoryName: categoryname };
        // 判断对应的参数中是否有数据,有了数据才能准备query参数
        // 第一种写法：(基本操作)
        // if (category1id) query.category1Id = category1id;
        // if (category2id) query.category2Id = category2id;
        // if (category3id) query.category3Id = category3id;

        // 第二种写法:不容易理解(提升)---编程想法的提升
        const id = category1id
          ? "1"
          : category2id
          ? "2"
          : category3id
          ? "3"
          : "";
        query["category" + id + "Id"] =
          category1id || category2id || category3id;

        // 编程式路由跳转，同时传递参数
        this.$router.push({ path: "Search", query });
      }
    },

    // 控制一级分类菜单列表只在首页显示(/)其他页面隐藏 / 相当于home
    // 在search组件内部先引入当前组件
    // 判断当前路由地址是不是(/)再决定是否显示 可使用v-show或者v-if指令
    // 当鼠标进入到列表中之后，要把一级分类列表展示出来，鼠标离开就隐藏 鼠标进入和离开事件
    firstHide() {
      this.currentIndex = -2; //重新设置索引值

      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                &.fore {
                  border-top: 0;
                }
                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }
                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
          &.item_on {
            background-color: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
