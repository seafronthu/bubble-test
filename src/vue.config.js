// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join, resolve } = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const zopfli = require('@gfx/zopfli')
// const BrotliPlugin = require('brotli-webpack-plugin')
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const pathResolve = dir => {
  return join(__dirname, dir);
};
const externals = isProduction
  ? {
      vue: "Vue",
      "@antv/g2": "G2",
      "ant-design-vue": "antd",
      jsencrypt: "JSEncrypt",
      moment: "moment"
    }
  : {};

function addStyleResource(rule, relativePath) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: relativePath.map(v => resolve(__dirname, v)) //[resolve(__dirname, "./src/assets/css/var.less")]
    });
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/", // 项目相对路径
  // assetsDir: './',
  chainWebpack: config => {
    config.resolve.alias
      .set("@", pathResolve("src")) // key,value自行定义，比如.set('@@', pathResolve('src/components'))
      .set("@assets", pathResolve("src/assets")) // key,value自行定义，比如.set('@@', pathResolve('src/components'))
      .set("@api", pathResolve("src/api"))
      .set("@stores", pathResolve("src/stores"))
      .set("@views", pathResolve("src/views"))
      .set("@libs", pathResolve("src/libs"))
      .set("@basic", pathResolve("src/components/basic-components"))
      .set("@business", pathResolve("src/components/business-components"))
      .end()
      .parent.output.chunkFilename("js/[name].[contenthash].js");
    // less全局变量配置
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("stylus").oneOf(type), [
        "./src/assets/css/global.styl"
        // "./src/assets/css/mixins.less"
      ])
    );
    // addStyleResource(config.module.rule("less"), [
    //   "./src/assets/css/var.less",
    //   "./src/assets/css/mixins.less"
    // ]);
    // 开启比gzip体验更好的Zopfli压缩
  },
  // 修改webpack的配置
  configureWebpack: () => {
    // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
    let plugins = [];
    if (process.env.NODE_ENV === "production") {
      plugins = [
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据进行压缩 服务端需判断是否有gz文件
          deleteOriginalAssets: false // 是否删除原文件
        })
      ];
    }
    return {
      plugins,
      externals
    };
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // pluginOptions: {
  //   "style-resources-loader": {
  //     preProcessor: "less",
  //     patterns: [
  //       resolve(__dirname, "./src/assets/css/var.less"),
  //       resolve(__dirname, "./src/assets/css/mixins.less")
  //     ] // 引入全局样式变量
  //   }
  // },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false
    // proxy: "http://127.0.0.1:9527"
    // proxy: {
    //   '/Home': {
    //     target: 'http://dev.hahaipi.com/', // 域名
    //     ws: false, // 是否启用websockets
    //     changOrigin: true // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   // pathRequiresRewrite: {
    //   //   '^Home': '/'
    //   // }
    //   }
    // }
  }
};
