
/*
8.依赖Vue模块： npm install vue --save
  runtime-only: 不能有任何template
  runtime-compiler: 可以使用template
  指定打包的版本，添加resolve属性，设置别名
 */
/*
 Web应用模式：
SPA（single page web application）单页Web应用，
 MPA（multi page web application）多页Web应用
*/
import Vue from 'vue'
// import App from './vue/app.js'
/*
9.对.vue文件封装，安装vue-loader和vue-template-compiler
  npm install --save-dev vue-loader@13.0.0 vue-template-compiler@2.5.21
 */
import App from './vue/App.vue'

new Vue({
  el:'#app',
  //component注册组件，template使用组件,单标签也可
  template:'<App/>',
  components:{
    App
  }
})

document.writeln('<h1>搭建本地服务器，实时刷新</h1>')
document.writeln('<h2>搭建本地服务器，实时刷新</h2>')

/*
10.打包html的plugin，自动生成index.html，自动使用<script>标签引用打包的js
  npm install html-webpack-plugin@3.2.0 --save-dev
11.对打包的js进行压缩，使用插件uglifyjs-webpack-plugin,
  丑化代码，删除注释（包括版权信息），压缩变量名等等
  npm install uglifyjs-webpack-plugin@1.1.1 --save-dev

12.搭建本地服务器，webpack-dev-server，
  基于node，使用express框架，自动刷新。真正发布时，再build一下
  npm install webpack-dev-server@2.9.1 --save-dev
 */