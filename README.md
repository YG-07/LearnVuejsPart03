# LearnVuejsPart03  
学习webpack的知识  
### 一.资料整理来源  
coderwhy老师  B站账号：ilovecoding  
bilibili URL：https://space.bilibili.com/36139192  
视频(76-94p) URL：https://www.bilibili.com/video/BV15741177Eh?p=76  
  
### 二.webpack简介  
webpack 对 CommonJS（require() 语句）  
  AMD（define 和 require 语句） 、ES6（export、import 语句）  
  css/sass/less（@import 语句）  
  样式(url ...)或 HTML 文件(img src=...)中的图片链接  
  等的语法做了兼容  
  
### 三.运行此项目方法：  
此项目是对webpack的初步使用，所以配置文件是手动生成。  
有助于初学者了解webpack的打包原理，并为之后的vue-cli脚手架奠定基础。  
#### 1.首先安装node模块  
在cmd使用查看版本号:  
node -v  
npm -v  
  
#### 2.通过npm工具安装webpack 3.6.0  
全局安装：  
npm install webpack@3.6.0 -g  
局部安装：  
cd 项目路径  
npm install webpack@3.6.0 --save-dev  
  
注：在项目的cmd中执行命令对main打包,自动寻找依赖文件：  
  webpack ./src/main.js ./dist/bundle.js  
  写了配置文件js就能直接使用"webpack"指令  
  json配置了"build": "webpack"会优先寻找本地的node_modules/.bin路径的，  
  没有就找全局的  
  
#### 3.创建webpack.config.js和package.json  
 详见“webpack笔记 3”  
   
#### 4.构建和运行  
构造：  
npm run build  
运行：  
打开./dist目录的bundle.html运行  
