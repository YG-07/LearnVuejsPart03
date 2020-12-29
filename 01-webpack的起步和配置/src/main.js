
//1.使用commonJS模块化规范
//7.将ES6语法转ES5，使用babel,3个东西
//npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
const {add,mul} = require('./clac.js')
//2.使用ES6模块化规范
import * as info from './info.js'

console.log(add(18, 10));
console.log(mul(4, 7));
console.log(info.name,info.age,info.height);

/*
3.依赖css文件,需要loader
  npm install --save-dev css-loader@2.0.2
  npm install style-loader@0.23.1 --save-dev
5.url依赖
  npm install --save-dev url-loader@1.1.2
6.文件依赖，对于大图片、文件的依赖
  npm install --save-dev file-loader@3.0.1
*/
require('./css/normal.css')

//4.依赖less文件
//npm install --save-dev less-loader@4.1.0 less
require('./css/special.less')