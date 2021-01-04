# LearnVuejsPart03  
学习webpack的知识  
### 一.资料整理来源  
coderwhy老师  B站账号：ilovecoding  
bilibili URL：https://space.bilibili.com/36139192  
视频(76-94p) URL：https://www.bilibili.com/video/BV15741177Eh?p=76  
  
### 二.webpack简介  
* webpack官方的解释：
  
<font color=brown>At its core，**webpack** is a *static module bundler* for modern JavaScript applications.  
从本质上来讲，webpack是一个现代的JavaScript应用的静态**模块打包**工具。</font>  
  
它对 CommonJS（require() 语句）AMD（define 和 require 语句） 、ES6（export、import 语句）css/sass/less（@import 语句）样式(url ...)或 HTML 文件(img src=...)中的图片链接等的语法做了兼容  
  
* webpack模块化打包
webpack为了可以正常运行，必须依赖node环境  
node环境为了可以正集的执行很多代码，必须封中包含各种依赖的包，npm工具（node packages manager）  

# 三、本部分知识大纲
(数字表示视频URL分p)  
-----------文件夹 01-webpack的起步和配置 知识-----------  
### 一、webpack的原理和基本使用 (76-82)
#### 1.1 webpack安装 (76-78)
* 1.首先需要去node官网下载安装Node.js，自带npm工具
  node官网 URL：http://nodejs.cn/download/  
* 2.全局安装webpack
```Shell
npm -v
# 3.6.0 webpack，因为此版本支持vue cli2
npm install webpack@3.6.0 -g
# 安装后查看版本，是否安装
webpack --version
```
* 3.局部安装webpack
```Shell
cd 项目目录
npm install webpack@3.6.0 --save-dev
```
#### 1.2 webpack的基本使用
* 创建项目
  * index.html
  * dist 发布版本文件夹(打包后包括打包js文件bundle.js)
  * src 源码文件夹(包括css、js、img等文件夹和入口js文件main.js)
* webpack打包操作
```Shell
webpack ./src/main.js ./dist/bundle.js
# 映射build之后使用，修改了项目都要编译再运行！
npm run build
```
#### 1.3 配置webpack.config.js和package.json  
* 1.创建webpack.config.js,入口和出口属性，出口需要动态获取绝对路径
```javaScript
const path=require('path')
module.exports={
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
    // 指定打包后文件夹，之后可以直接使用webpack指令打包
    publicPath:'dist/'
  },
  // ...
}
```
* 2.生成package.json，显示项目的版本信息等  
```Shell
npm init
# 如果直接下载的项目，要使用以下指令下载依赖的工具
npm install
```  
* 3.在package.json的script属性里面映射指令，使用npm run 名字
```JSON
"build": "webpack",
"install": "npm install webpack@3.6.0 --save-dev"
```
* 4.安装局部webpack(见`1.1.3`)之后，配置了"build"映射，使用局部webpack打包
```Shell
npm run build
```
### 二、各种依赖文件的loader安装和配置 (79-82)
#### 2.1 认识并安装loader
*loader* 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件  
#### 2.2 安装loader处理main.js依赖文件
* 本节是手动配置loader！利于理解loader的工作原理，步骤：**导出、导入、安装、配置**
`注意代码块使用位置，安装loader在CMD中、导入在main.js中、配置在webpack.config.js的rules属性中添加，导出则使用对应js语法`   
#### 2.2.1.使用commonJS模块化规范
导入：`const {add,mul} = require('./clac.js')`  
，calc.js导出：`module.exports={add,mul}`  
#### 2.2.2.使用ES6模块化规范
导入：`import * as info from './info.js'`  
，info.js导出：`export {name,age,height}`  
#### 2.2.3.依赖css文件,需要loader
导入：`require('./css/normal.css')`  
下载2个loader，安装：`npm install --save-dev css-loader@2.0.2 `和`npm install style-loader@0.23.1 --save-dev`  
配置：  
```javaScript
//css样式依赖规则
{
  test: /\.css$/,
  use: ['style-loader','css-loader' ]
},
```
#### 2.2.4.依赖less文件
导入：`require('./css/special.less')`  
安装：`npm install --save-dev less-loader@4.1.0 less`  
配置：
```javaScript
//less
{
  test: /\.less$/,
  use: [{
    loader: "style-loader" // creates style nodes from JS strings
  }, {
    loader: "css-loader" // translates CSS into CommonJS
  }, {
    loader: "less-loader" // compiles Less to CSS
  }]
},
```
#### 2.2.5.url小图片(文件)依赖
安装：`npm install --save-dev url-loader@1.1.2`  
使用，如：样式里的：`background: url("../img/bg.jpg");`  
配置:
```javaScript
//img
{
  test: /\.(png|jpg|gif|jpeg)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        //默认:8KB,8192,图片大小bytes
        // 小于limit用url-loader，否则用file-loader,
        // 自动通过32位hash值命名
        limit: 30000,
        //打包输出规范命名，默认变量：文件名，去8位hash值，原后缀
        name:'img/[name].[hash:8].[ext]'
      }
    }
  ]
},
```
#### 2.2.6.文件依赖，对于大图片、文件的依赖
之前基础上安装：`npm install --save-dev file-loader@3.0.1`  
#### 2.2.7.将ES6语法转ES5，使用babel,3个东西，打包的js文件就没有ES6语法了
安装：`npm install --save-dev babel-loader@7 babel-core babel-preset-es2015`  
```Shell
babel是一个JS编译器，用来转换最新的JS语法，比如把ES6, ES7等语法转  
化成ES5语法，从而能够在大部分浏览器中运行。像箭头函数，就可以做转换。  
babel在执行过程中，分三步：先分析(parsing)、再转化、最后生成代码。  
```
导入：`const {add,mul} = require('./clac.js')`  
配置：
```javaScript
//ES6语法转换
{
  test: /\.js$/,
  //exclude排除，不用转换webpack的js文件，include包含
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['es2015']
    }
  }
}
```
  
-----------文件夹 04-webpack的Vue配置 知识-----------  
### 一、webpack引入Vue.js 配置并优化 (83-85)
#### 1.1 安装Vue模块的loader
#### 1.1.1 依赖Vue模块：
* 注：vue的安装方式：1.直接下载Vue.js，2.CDN引入，3.npm安装Vue模块(使用)
(发布时也依赖)安装：`npm install vue --save`  
导入并使用：`import App from './vue/App.vue'`  
```javaScript
new Vue({
  el:'#app',
  //component注册组件，template使用组件
  template:'<App/>',
  components:{
    App
  }
})
```
配置：  
```javaScript
//vue
{
  test: /\.vue$/,
  use:{
    loader:'vue-loader'
  }
}
```
#### 1.1.2 Vue实例编译问题，解决：
  * runtime-only: 不能有任何template  
  * runtime-compiler: 可以使用template  
指定打包的版本，添加**resolve**属性，设置别名**alias**属性，配置：  
```javaScript
//vue的template构建解决方案，配置根属性
  resolve:{
    //可省略的后缀
    extensions:['.js','.css','.vue'],
    //alias:别名
    alias:{
      //$表示结尾,vue.esm(es module)包含compiler
      'vue$':'vue/dist/vue.esm.js'
    }
  },
```
使用时，利用别名导入：`import Vue from 'vue'`  

#### 1.1.3 对Vue实例进行优化
【文本笔记-web单&多页面方式】(了解)
* 新建vue/app.js，之后可以新建其他组件的js  
```javaScript
//导出App组件
export default {
  template: `
    <div>
      <h2>{{message}}</h2>
      <button @click="btnClick">按钮</button>
      <h2>{{name}}</h2>
    </div>
  `,
  data(){return {...}},
  methods:{...},...
}
```
* template和el属性同时存在，el会绑定template定义的模板，组件只使用template属性  
导入：`import App from './vue/app.js`  

#### 1.1.4 Vue的最终解决方案.vue文件
对.vue文件封装，安装vue-loader和vue-template-compiler，加载和编译  
* .vue文件将template、script、style分离成3个标签
安装：`npm install --save-dev vue-loader@13.0.0 vue-template-compiler@2.5.21`  
导入：`import App from './vue/App.vue'`  
配置：
```javaScript
//vue
{
  test: /\.vue$/,
  use:{
    loader:'vue-loader'
  }
}
```
#### 1.2 关于后缀的省略
在配置文件的resolve添加extensions属性的数组  
```javaScript
resolve:{
    //可省略的后缀
    extensions:['.js','.css','.vue'],
}
```
  
### 二、webpack的plugin插件原理和使用 (86-89)
#### 2.1 plugin是什么？
* plugin是插件的意思，通常是用于对某个现有的架构进行扩展。
* webpack中的插件，就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等。
#### 2.2 loader和plugin区别
* loader主要用于转换某些类型的模块，它是一个转换器。
* plugin是插件，它是对webpack本身的扩展，是一个扩展器。
#### 2.1 安装使用plugin插件的步骤
1. 通过npm安装（webpack内置了一下插件）
2. 在webpack.config.js的`plugins:\[...\]`属性里配置插件
#### 2.1.1 添加版权的Plugin
配置导入和使用：  
```javaScript
const webpack=require('webpack')
new webpack.BannerPlugin('最终版权归aaa所有')
```
  
#### 2.1.2 打包html的plugin
将index.html打包到dist，安装：`npm install html-webpack-plugin@3.2.0 --save-dev`  
配置导入和使用：  
```javaScript
const HtmlWebpackPlugin=require('html-webpack-plugin')
//使用插件打包时，注释输出文件夹路径
//publicPath:'dist/'
new HtmlWebpackPlugin({
  template: 'index.html'
}),
```
  
#### 2.1.3 js压缩(丑化)的plugin
对打包的bundle.js压缩，删除注释、变量简化等，安装：`npm install uglifyjs-webpack-plugin@1.1.1 --save-dev`  
配置导入和使用：  
```javaScript
const UglifyjsWebpackPlugin=require('uglifyjs-webpack-plugin')
//开发过程中不用js丑化，避免变量名的改变
new UglifyjsWebpackPlugin()
```
  
#### 2.2 搭建本地服务器
基于node，使用express框架，自动刷新。真正发布时，再build  
安装：`npm install webpack-dev-server@2.9.1 --save-dev`  
配置：
```javaScript
//根option的属性，开发时使用
devServer:{
  //先是本地服务的文件夹，inline页面实时刷新，--open配置是编译并打开浏览器
  contentBase:'./dist',
  inline:true
  //还有其他属性：port端口默认8080，historyApiFallback在SPA中。
 }
```
再配置json映射：`"dev":"webpack-dev-server --open"`，之后使用`npm run dev`开启  
-----------文件夹 06-webpack配置分离 知识-----------  

