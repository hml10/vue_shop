# Vue-电商项目

## 基于 vue 脚手架三(准备工作) day_01

- 下载 vue create vue_shop、 运行测试 npm run serve、 打包 npm run build、运行 serve dist 确认脚手架没有问题

- 开始清空脚手架里面没有用的一些目录 随手可以设置一下浏览器是否自动打开 再次运行项目测试打开

- 安装相关插件 npm install axios,vue-router,vuex,less less-loader

### 创建当前项目需要的对应目录(暂时有七个)

- api-存放 ajax 及接口目录、components-普通组件、mock-模拟后台数据
- pages-路由组件目录、router-配置路由、store-组件 vuex 目录、utils-缓存的操作

### 在对应的目录中创建组件并拆分组件(普通组件-components 目录下、路由组件-pages 目录下)

- 头部 ---> 普通组件 ---> Header 组件
- 底部 ---> 普通组件 ---> Footer 组件

- 中间 ---> 路由组件 ---> Home 组件
- 登录 ---> 路由组件 ---> Login 组件
- 注册 ---> 路由组件 ---> Register 组件
- 搜索 ---> 路由组件 ---> Search 组件

## 配置基本路由+拆分组件 day_02-上午

- 搭建 router 里面的路由最终在 App.vue 中引入<Header/> <router-view></router-view> <Footer/> 然后在 main.js 中引入并注册路由器 记得测试路由

- 拆分组件---辉鸿目录---->home.html--->header-结构和样式--->进行组件的拆分--->public 新建 css 文件在 index.html 中引入样式重置(需要重启项目)

- 拆分组件---辉鸿目录---->home.html--->footer-结构和样式--->进行组件的拆分(需要重启项目)

- 拆分组件---辉鸿目录---->home.html--->home-所有的结构和样式--->进行组件的拆分--->样式会乱--->样式中搜索-swiper-把所有的轮播图注释只留一张图片

- 完善 header 里面点击请登录、免费注册的基础路由跳转--->解决编程式路由跳转报错的 BUG

- 编写 header 组件内部路由跳转传参--->路由传参的方式---[params，query，props，meta]

## 拆分登录+注册+Home 组件 day_02-下午

- 为了便捷操作把 header 里面 logo 图片替换、把它的 a 标签改为 router-link 实现点击 logo 返回主页面

- 编程式路由 query 以对象方式传参和 params 以对象方式传参

- 点击登录或者注册页面让 footer 组件可以隐藏起来--->routes、App 里面设置、使用了路由 meta

### 拆分登录和注册组件

- 拆分组件登录---志远目录---->logo.html--->login-结构和样式+图片

- 拆分组件注册---志远目录---->register.html--->register-结构和样式-样式错误调为 390px

- 拆分商品分类导航组件,提高复用性在 components 下新建一个 TypeNav 文件引入其结构和样式--->并且在 main.js 中注册为全局组件

- 拆分 Home 中各个组件--list-container--today-recommend--rank--like--floor--brand--在 Home 下创建六个文件夹并拆分

- @符号智能配置 创建 jsconfig.json 文件配置即可--->测试接口

- 封装 axios 请求拦截器和响应拦截器，并暴露 ajax

## axios 跨域 vuex day_03-上午

- 在请求拦截器添加进度条效果 网址：https://github.com/rstacruz/nprogress 基本用法：网址或-axios.js

- 封装接口函数查看---api-index.js + ajax.js---封装完成后在 app 界面加载完成后做个测试操作

- 脚手架三解决跨域问题新建一个 vue.config.js 文件配置、lintOnSave:false 关闭脚手架三 eslint 语法检查

#### 脚手架二和脚手架三的跨域配置

1. 脚手架二的跨域可以在 config 目录中的 index.js 文件中: proxyTable: {} 里面进行跨域的配置
2. 脚手架三的跨域可以在 vue.config.js 文件中:devServer:{} 里面进行跨域的配置

#### 脚手架二和脚手架三的 eslint 检测

1. 脚手架二中可以在 .eslintignore 文件或者在 eslintrc.js 中单个对 eslint 语法进行进行关闭操作
2. 脚手架三中可以在 package.json 文件中的"rules": {}关闭相关的 eslint 语法检查、或者 vue.config.js 文件中进行配置关闭

#### 搭建-vuex 涉及到的状态数据比较多,管理起来不是特别方便,而且多个组件之间要进行通信,所以使用 vuex

- vuex 模块化搭建--->store--->modules

## TypeNav 总体实现 day_03-下午

- 删除 TypeNav index.vue 中静态数据、遍历实现 TypeNav 三级分类列表数据展示

- 遍历实现二、三级分类列表，鼠标滑动显示高亮，实现三级分类列表点击时跳转路由---函数节流防抖

## 节流+菜单列表 day_04-上午

- 解决 TypeNav 菜单鼠标滑动不流畅问题--->节流防抖--->CDN、印记中文搜索--->lodash 插件库引入或下载使用

- 解决 TypeNav 组件中因路由跳转和传参出现大量的 router-link 问题---优化操作

- 使用编程式路由跳转携带参数---通过事件委托的方式---home 组件内部引入使用模块化引入，以便代码优化

- 项目一级菜单列表只在首页显示，其他页面隐藏起来

- 当鼠标移入到分类列表之后，把一级分类列表显示出来，鼠标离开再隐藏，解决鼠标移出卡顿问题

## mock+vuex 管理数据 day_04-下午

- 减少请求次数优化，把请求放到 App 中钩子函数 mounted 中发送

1. 完成 ListContainer、Floor 组件内部通过，调用数据接口、发送异步请求、获取数据、动态显示到页面中
2. 模拟后台制造数据--->保证前端页面能先在页面中可以正常显示--->[注意：此组件后台没有数据]
3. 制造数据---调用接口---发送请求----获取数据---显示到页面中
4. 制造数据---把数据存放在 json 文件中(本地)---调用接口---发送请求---获取数据---显示到页面中-->mock.js
5. mock 的使用 先下载引入--->调用相关方法--->设定指定模式的接口--->准备好要响应回去的数据即可
6. mock 的 拦截数据，设计接口函数和测试 mock 使用 vuex 管理数据

## swiper+轮播图 day_05-上午

- 使用 Swiper 实现轮播图效果 npm install swiper 下载引入然后配置

1. 配置 ListContainer 里面大轮播图
2. 配置 floor 里面轮播图
3. 进行优化重复代码样式 放入到 main.js 文件里面
4. 解决 floor 轮播图里面存在不流畅问题
5. 从 vuex 中获取 ListContainer 里面轮播图数据
6. 因为 mounted 页面加载后执行,所以大轮播图只能在第一次进去才有效果
   因为 swiper 对象创建完之后,轮播图才开始执行问题,套个计时器可解决问题
7. 监视 watch 使用 this.\$nextTick 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新

- 楼层---从 vuex 中获取数据,遍历出所有的真实数据在页面中显示

- 抽取轮播图组件为全局组件---在多个组件中使用---高复用组件

## 轮播图 BUG+Search 组件 day_05-下午

- 楼层里面轮播图出现的 BUG 使用 watch 和 immediate---该回调作用，将会在监听开始的时候立刻被调用

- Search 组件拆分---接口分析---封装接口---遍历显示组件中数据

## Search 组件 day_06-上午

- 获取 vuex 中的数据遍历出真实数据到页面显示---解决组件发送请求 bug---组件路由跳转 bug

- 点击菜单后隐藏菜单 header 组件内部跳转 bug---组件中监视部分数据，进行重置

## Search 组件 day_06-下午

- search 中重置搜索条件---使用事件总线方式重置关键字，同时干掉 header 组件上的搜索信息

- search 中点击品牌实现搜索功能

- search 组件中点击左侧商品属性信息，添加到搜索、全部结果栏---出现 bug 进行移出某个属性---点击重复报错 bug 解决

- search 综合、价格、排序显示高亮效果

## Search 组件 day_07-上午

- search 价格升降排序操作

- search 组件内部优化请求参数和响应式对象操作、actions 里面删除所有空串

- pagination 仓建分页组件、注册成全局组件引入使用---实现分页点击，改变当前页数

- pagination 分页组件代码分析---设置通用组件基本思路

## Pagination 商品详情组件 day_07-下午

- 设计分页、全局组件 Pagination 静态页面

- Pagination 组件连续页码算法---Pagination 组件实现及解决一些小 bug

- Detail 商品详情组件、引入静态页面、注册路由、实现页面点击跳转、默认滚动位置到详情顶部

- 测试商品详情接口、书写 api、并且封装为 vuex 测试数据 (vue 中空格符 &#32; &nbsp;)

## detail 组件轮播图、放大镜 day_08-上午

- 封装商品详情 api 接口和 vuex 遍历详情页面数据动态显示

- 商品详情实现点击选择颜色显示高亮、和轮播图组件

- imageList 和 detail 组件同信、实现点击轮播图高亮显示和切换对应的图片显示出来

- 鼠标移入实现放大镜效果 + throttle 节流函数、放大镜的两种实现方式

## 加入购物车 day_08-下午

- AddCartSuccess 加入购物车组件、注册路由跳转，实现静态页面并携带参数跳转

- 测试 detail 组件内部，添加购物车接口、并封装接口函数、使用 vuex 管理发送请求

- 问题：如何根据提交的异步 action 成功或者失败来做不同的处理？方式一：使用 callback 回调处理、方式二：使用 async 函数处理

- 引入购物车详情组件、并注册成路由组件，生成零时用户 id (https://www.npmjs.com/package/uuidjs) 并存储

- 测试购物车一系列接口函数(添加购物车、获取购物车、选中状态、删除购物车接口)，并封装成接口函数

## 购物车操作 day_09-上午

- 项目步骤：1、测试接口 2、api 目录封装接口函数 3、封装 vuex 4、组件内部使用数据

- 封装 vuex 获取购物车数据列表、然后从 vuex 中取出数据遍历现实到 shopCart 页面上

- shopCart 组件内部 vuex 计算属性，计算商品总数量、计算商品总价格、计算商品是否全选

- 删除指定购物项操作、删除也有成功或失败的 actions、详情在 shopCart 中

- 删除 shopCart 组件中、所有选中的商品、及购物选项中状态改变操作

## 购物车操作 + register 页面 day_09-下午

- shopCart 改变所有购物项的选中状态(全选全不选)

- shopCart 组件内、点击改变购物项的数据,修改购物项数量、加或减-------优化

- 点击结算、跳转到 "注册登陆页面"

- 测试接口(图形码、注册、登陆、退出登陆)--->封装成接口函数--->封装成 vuex

- 注册组件实现功能---> vue 中使用表单验证、插件(安装 npm install vue-validate@2.2.13)
  插件网址：https://blog.csdn.net/xfcy514728/article/details/80277653

## 注册、登陆页面 day_10-上午

- 实现登陆功能跳转到首页、header 组件显示登陆用户信息以及退出登陆操作

- 使用 localStorage 实现存储用户登录的信息、退出登录再删除用户信息---解决了刷新又要重新登陆的问题

- 在请求拦截器中、请求头携带 token

- 拆分订单以及支付相关组件，个人中心、支付、支付成功、交易(center、pay、paySuccess、trade)

- 引入组件并且、配置以上四个组件的路由、及 center 里面的二级路由组件
