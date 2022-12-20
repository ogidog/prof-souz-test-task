const { defineConfig } = require('@vue/cli-service')
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,

  outputDir: path.resolve(__dirname, "../docker/profsouz-test-task-frontend/build"),

  configureWebpack: {
    devServer: {
      host: "test-task.pfsz.local",
      port: '80'
    }
  }
})
