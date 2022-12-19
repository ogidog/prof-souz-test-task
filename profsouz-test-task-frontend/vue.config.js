const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      host: "test-task.pfsz.local",
      port: '80'
    }
  }
})
