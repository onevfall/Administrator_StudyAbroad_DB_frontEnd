const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        //target为后端数据接口的地址
        target:'http://49.235.72.134:8888/',
        //target:'http://43.142.41.192:6001/',
        ws: false,
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }  
      }
      // '/api/spring':{
      //   target:'http://43.143.84.166:8888/', 
      //   changeOrigin:true,
      //   pathRewrite:{
      //     '^/api/spring':''
      //   }
      // },
      // // /api为后端数据接口的上下文路径
      // '/api':{
      //   //target为后端数据接口的地址
      //   target:'http://43.142.41.192:6001/',
      //   changeOrigin:true
      // }
    }
  }
})
