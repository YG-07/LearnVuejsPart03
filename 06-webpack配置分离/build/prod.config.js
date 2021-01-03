
//生产配置,将公共js合并，导出
const UglifyjsWebpackPlugin=require('uglifyjs-webpack-plugin')
const webpackMerge=require('webpack-merge')
const baseConfig=require('./base.config.js')

module.exports=webpackMerge(baseConfig,{
  plugins:[
    //开发过程中暂时不用js丑化
    new UglifyjsWebpackPlugin()
  ]
})
