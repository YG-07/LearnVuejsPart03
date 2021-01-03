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
* 在main.js和webpack.config.js的rules数组中的操作：
<!-- 
```Shell

```
```javaScript

```
cmd指令
安装：<table><tr><td bgcolor=black><font color=white> </font></td></tr></table>
main.js
导入：<table><tr><td bgcolor=#7FFF00> </td></tr></table>
webpack.config.js
配置：<table><tr><td bgcolor=#FF7F50> </td></tr></table>
 -->
 （注意代码配置的位置，黑底代码在CMD中、绿底在main.js中、橙底在webpack.config.js中，其他则是对应的依赖文件中！）  
* 1.使用commonJS模块化规范
导入：<table><tr><td bgcolor=#7FFF00>const {add,mul} = require('./clac.js')</td></tr></table>  
calc.js导出：`module.exports={add,mul}`  
  
* 2.使用ES6模块化规范
导入：<table><tr><td bgcolor=#7FFF00>import * as info from './info.js'</td></tr></table>  
info.js导出：`export {name,age,height}`  
  
* 3.依赖css文件,需要loader
导入：<table><tr><td bgcolor=#7FFF00>require('./css/normal.css')</td></tr></table>  
下载2个loader：
安装：<table><tr><td bgcolor=black><font color=white>
  npm install --save-dev css-loader@2.0.2  
  npm install style-loader@0.23.1 --save-dev</font></td></tr></table>  
配置css样式依赖规则：  
//css
      {
        test: /\.css$/,
        use: ['style-loader','css-loader' ]
      },

* 4.依赖less文件
require('./css/special.less')
  npm install --save-dev less-loader@4.1.0 less
配置：//less
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

* 5.url小图片依赖
  npm install --save-dev url-loader@1.1.2
如：样式里的：background: url("../img/bg.jpg");
配置//img
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

* 6.文件依赖，对于大图片、文件的依赖
  npm install --save-dev file-loader@3.0.1

* 7.将ES6语法转ES5，使用babel,3个东西，打包的js文件就没有ES6语法了
  npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
const {add,mul} = require('./clac.js')
配置：//js语法转换
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

-----------文件夹 04-webpack的Vue配置 知识-----------  
### 一、webpack对Vue的使用配置 (83-)
-----------文件夹 06-webpack配置分离 知识-----------  
