
//开发配置
const webpackMerge=require('webpack-merge')
const baseConfig=require('./base.config.js')

module.exports=webpackMerge(baseConfig,{
  //本地服务器
  devServer:{
    contentBase:'./dist',
        inline:true
  }
})


