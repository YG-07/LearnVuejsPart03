
const path=require('path')

module.exports={
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
    publicPath:'dist/'
  },
  module: {
    rules: [
      //css
      {
        test: /\.css$/,
        use: ['style-loader','css-loader' ]
      },
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
      //js语法转换
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


    ]
  }
}
//对项目的node初始化，生成一个json配置文件：npm init
//安装依赖node文件时：npm install
//.resolve(__dirname,'dist')拼接nodejs的常量“当前路径”和文件夹名