
const path=require('path')
const webpack=require('webpack')
const HtmlWebpackPlugin=require('html-webpack-plugin')
// const UglifyjsWebpackPlugin=require('uglifyjs-webpack-plugin')

module.exports={
  //入口
  entry:'./src/main.js',
  //输出
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
    //没有插件打包index之前添加的路径
    // publicPath:'dist/'
  },
  //依赖方法和规则
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
      },
      //vue
      {
        test: /\.vue$/,
        use:{
          loader:'vue-loader'
        }
      }

    ]
  },
  //解决方案
  resolve:{
    //可省略的后缀
    extensions:['.js','.css','.vue'],
    //alias:别名
    alias:{
      //$表示结尾,vue.esm(es module)包含compiler
      'vue$':'vue/dist/vue.esm.js'
    }
  },
  //插件
  plugins:[
      new webpack.BannerPlugin('最终版权归aaa所有'),
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      //开发过程中暂时不用js丑化
      // new UglifyjsWebpackPlugin()
  ],
  //本地服务器
  devServer:{
    //本地服务的文件夹，页面实时刷新
    //其他属性：port端口，historyApiFallback在SPA中。
    contentBase:'./dist',
    inline:true
  }
}

