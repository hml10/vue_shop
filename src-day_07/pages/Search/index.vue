<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="/search">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类信息的名字显示 -->
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}
              <i @click="removeCategory">×</i>
            </li>

            <!-- 关键字的内容的显示 -->
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <i @click="removeKeyword">×</i>
            </li>

            <!--品牌信息的显示-->
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}
              <i @click="removeTrademark">×</i>
            </li>

            <!--搜索属性条件的显示-->
            <li class="with-x" v-for="(prop,index) in options.props" :key="prop">
              {{prop}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" :addProps="addProps" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActive('1')}" @click="setOrder('1')">
                  <a href="javascript:">综合{{getOrderIcon('1')}}</a>
                </li>
                <li>
                  <a href="javascript:">销量</a>
                </li>
                <li>
                  <a href="javascript:">新品</a>
                </li>
                <li>
                  <a href="javascript:">评价</a>
                </li>
                <li :class="{active:isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:">价格{{getOrderIcon('2')}}</a>
                </li>
                <!-- <li>
                  <a href="javascript:">价格⬇</a>
                </li>-->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="/detail/skuId">
                      <img :src="goods.defaultImg" />
                    </a>-->

                    <!-- 路由跳转detail -->
                    <!-- <router-link :to="{name:'detail',params:{skuId:goods.id}}"> 对象写法 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>

                  <div class="price">
                    <strong>
                      <em>¥ &#32;</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!-- <a href="javascript:" :title="goods.title">{{goods.title}}</a> -->
                    <router-link :to="`/detail/${goods.id}`" :title="goods.title">{{goods.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>999+</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a href="javascript:" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页组件 -->
          <Pagination
            :pageConfig="{total:productList.total,showPageNo:3,pageNo:options.pageNo,pageSize:options.pageSize}"
            @changeCurrentPage="getProductList"
          />
          <!-- 分页部分
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted">
                  <span>...</span>
                </li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div>
                <span>共10页&nbsp;</span>
              </div>
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入搜索条件的组件
import SearchSelector from "./SearchSelector/SearchSelector";
// 引入vuex的辅助函数
import { mapState, mapGetters } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      // data中添加的数据都是响应式数据---数据发生变化，页面就会重新渲染
      options: {
        category1Id: "", // 一级分类的id
        category2Id: "", // 二级分类的id
        category3Id: "", // 三级分类的id
        categoryName: "", // 分类的名字
        // trademark: "", // 品牌      值:  "品牌id:品牌名字"--->"4:小米"
        order: "1:desc", // 排序方式  值: "1:asc" 1--综合,2--价格, asc--升序 desc--降序
        pageNo: 1, // 当前第几页   数字值
        pageSize: 5, // 每页多少条数据  数字值
        keyword: "", // 搜索关键字    在搜索框中输入的内容
        props: [], // 多个属性条件组成的数组, ["属性id:属性值:属性名字"]
      },
    };
  },

  components: {
    // 注册组件
    SearchSelector,
  },

  // 页面加载后回调
  mounted() {
    // const result = this.$store.dispatch("getProductList", {});
    // console.log("reuslt", result);
    // Header组件内部点击搜索按钮跳转到Search组件的时候携带的是params参数,有关键字--keyword
    // TypeNav组件内部点击分类名字的时候跳转到Search组件的时候携带的是query参数,categoryName,(category1Id||category2Id||category3Id)
    // 由于跳转过来后,传递的参数有query也有可能有(都有)params
    const { query, params } = this.$route;
    // 重新设置传递的参数,把query和params参数添加到options(重新覆盖的操作)
    const options = {
      ...this.options,
      ...query,
      ...params,
    };
    // 更新参数对象数据
    this.options = options;
    // this.$store.dispatch("getProductList", this.options); //发送请求携带options参数对象
    this.getProductList();
  },

  // 复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象：
  watch: {
    // from 是从哪来，to是要去哪
    $route(to, from) {
      // console.log(to);
      // 解构出query参数和params参数
      const { query, params } = to;
      // 重新设置传递的参数,把query和params参数添加到options(重新覆盖的操作)
      const options = {
        ...this.options,
        category1Id: "", // 重置
        category2Id: "", // 重置
        category3Id: "", // 重置
        categoryName: "", // 重置
        ...query,
        ...params,
      };
      // 更新参数对象数据
      this.options = options;
      // this.$store.dispatch("getProductList", this.options); //发送请求携带options参数对象
      this.getProductList();
    },
  },

  // 计算属性
  computed: {
    ...mapGetters(["goodsList"]), // 获取商品信息
    ...mapState({
      productList: (state) => state.search.ProductList,
    }),
    // productList() {
    //   console.log(this.$store.state.search.ProductList.total);
    // },
  },

  // 方法
  methods: {
    // 根据参数发送请求,获取数据
    getProductList(pageNo = 1) {
      // 发送请求的时候需要携带页码数
      this.options.pageNo = pageNo;
      this.$store.dispatch("getProductList", this.options); //发送请求携带options参数对象(封装)
    },
    // 移出分类名字信息：一级分类id、二级分类id、三级分类id、分类信息名字---重置后还需要重新发送请求
    removeCategory() {
      this.options.category1Id = "";
      this.options.category2Id = "";
      this.options.category3Id = "";
      this.options.categoryName = "";
      // 重新发送请求
      // this.getProductList(); // 此时有bug,地址栏上的参数是没有清理的
      // 重新跳转当前界面,用于删除query参数,path可能包含keyword
      this.$router.replace(this.$route.path); // 看不懂这个操作可以直接去网址栏上，把后面携带的参数删除试试
      // console.log(this.$route.path);
    },
    // 移出关键字信息
    removeKeyword() {
      // keyword要进行重置
      this.options.keyword = "";
      this.$bus.$emit("removeKeyword"); //事件总线
      // 重新发送请求
      // this.getProductList(); // 此时有bug,地址栏上的参数是没有清理的
      // 重新跳转当前页面,用于删除params参数
      this.$router.replace({ path: "/search", query: this.$route.query }); // 看不懂这个操作可以直接去网址栏上，把后面携带的参数删除试试
    },
    // 点击品牌时，在全部结果中显示
    setTrademark(trademarkId, trademarkName) {
      // 最终在品牌请求的参数中，添加品牌参数，重新发送请求
      // 设置品牌id和名字，添加到对应的请求参数中
      // this.options.trademark = trademarkId + ":" + trademarkName;
      // 重新获取商品列表数据，发送请求
      // this.getProductList();

      // 原因：响应式对象直接添加的属性，内部是没有监视和劫持的--->没有数据绑定
      // 解决：通过Vue.set()方法或者vm.$set()方法---向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新
      // 此时this.options响应式对象，添加了一个响应式trademark属性
      this.$set(this.options, "trademark", trademarkId + ":" + trademarkName); //优化代码
      // 重新获取商品列表数据发送请求
      this.getProductList();
    },
    // 移出品牌信息操作
    removeTrademark() {
      // 请求的接口中的参数干掉，制空方式
      // this.options.trademark = "";
      // 删除响应式数据是不会触发页面不会更新
      // delete this.options.trademark;
      // 推荐方法--删除响应式数据，页面会更新---vue文档
      this.$delete(this.options, "trademark");

      // 重新获取商品列表数据，发送请求
      this.getProductList();
    },
    // 用来点击属性条件，增加搜索条件，发送请求获取数据
    addProps(propId, propVal, propName) {
      // 修改接口的参数数据
      // console.log(propId, propVal, propName);
      const prop = `${propId}:${propVal}:${propName}`;

      // 判断当前属性是否在这个数组中，如果不在数组中，则添加该属性
      if (this.options.props.indexOf(prop) === -1) {
        // 修改接口的参数数据
        this.options.props.push(prop);
        // 发送请求
        this.getProductList();
      }
    },
    // 移出某个属性条件
    removeProp(index) {
      // 移出某个指引索引位置搜索属性条件
      this.options.props.splice(index, 1);
      // 重新发送请求获取商品数据
      this.getProductList();
    },
    // 排序操作-影响对应的条件被选中(综合，价格)
    isActive(flag) {
      return this.options.order.indexOf(flag) === 0;
    },
    // 根据不同标识进行排序操作
    setOrder(flag) {
      // 1、综合 2、价格 asc---升序 desc---降序
      // order:'1:desc'
      // 干掉属性值的空格,获取排序的标识和排序方式
      // const orders = this.options.order.split(":");
      // const orderFlag = orders[0]; //排序标识    1 2
      // const orderType = orders[1]; //排序的类型  asc desc
      let [orderFlag, orderType] = this.options.order.split(":");

      // 判断传入的标识和当前参数中截取出来的标识是否一致---点击的是同一项
      if (orderFlag === flag) {
        // 此时点击的肯定是同一个排序内容，所以切换排序类型，升序或者降序
        orderType = orderType === "desc" ? "asc" : "desc";
      } else {
        // 此时默认选中的是综合---点击的一定是价格
        orderFlag = flag;
        orderType = "desc";
      }
      // 重新跟新请求里面对应的参数
      this.options.order = `${orderFlag}:${orderType}`;
      // 发送请求
      this.getProductList();
    },
    // 排序上下箭头设置
    getOrderIcon(flag) {
      // 获取当前的参数中的标识及类型
      let [orderFlag, orderType] = this.options.order.split(":");
      if (orderFlag === flag) {
        return orderType === "desc" ? "⬇" : "⬆";
      } else {
        return "";
      }
    },
    // 绑定事件，改变当前页数，发送请求，获取该页数的数据
    // changeCurrentPage(page) {
    //   // page是第几页，那么就发送请求获取第几页数据
    //   // 改变发送请求的时候传入的参数数据
    //   // this.options.pageNo = page;
    //   this.getProductList(); //发送请求
    // },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>