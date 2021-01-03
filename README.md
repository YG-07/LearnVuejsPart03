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
### 一、webpack的原理和基本使用 (76-78)
#### 1.1 webpack安装
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
  * 在package.json的script属性里面映射指令，使用npm run 名字
```JSON
"build": "webpack",
"install": "npm install webpack@3.6.0 --save-dev"
```
  * 安装局部webpack，配置了"build"映射，使用局部webpack打包
```Shell
npm run build
```

-----------文件夹 04-webpack的Vue配置 知识-----------  

-----------文件夹 06-webpack配置分离 知识-----------  
