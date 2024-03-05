const backendIP = require('./backendIP');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    proxy: {
      '/socket.io': {
        target: 'http://'+backendIP+':3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
};
