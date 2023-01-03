const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 3000, // CHANGE YOUR PORT HERE!
    https: false,
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:9526/',
  //     changeOrigin: true,
  //     secure: false,
  //     // eslint-disable-next-line no-shadow
  //     rewrite: (path) => path.replace('/api', '')
  //   }
  // }
})
