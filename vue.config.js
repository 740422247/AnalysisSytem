/* eslint-disable*/
const path = require("path");
const fs = require("fs");
// 去除多余无效的 css
const glob = require("glob-all");
const PurgecssPlugin = require("purgecss-webpack-plugin");
// 添加打包分析
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
//开启  Zopfli 压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const zopfli = require("@gfx/zopfli");
const BrotliPlugin = require("brotli-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// 添加 IE 兼容

const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
// 生成雪碧图 为解耦版
const SpritesmithPlugin = require("webpack-spritesmith");
let has_sprite = true;
let files = [];
const icons = {};
//SpritesInit();

function SpritesInit() {
  try {
    fs.statSync(resolve("./src/assets/icons"));
    files = fs.readdirSync(resolve("./src/assets/icons"));
    files.forEach(item => {
      let filename = item.toLocaleLowerCase().replace(/_/g, "-");
      icons[filename] = true;
    });
  } catch (error) {
    fs.mkdirSync(resolve("./src/assets/icons"));
  }

  if (!files.length) {
    has_sprite = false;
  } else {
    try {
      let iconsObj = fs.readFileSync(resolve("./icons.json"), "utf8");
      iconsObj = JSON.parse(iconsObj);
      has_sprite = files.some(item => {
        let filename = item.toLocaleLowerCase().replace(/_/g, "-");
        return !iconsObj[filename];
      });
      if (has_sprite) {
        fs.writeFileSync(
          resolve("./icons.json"),
          JSON.stringify(icons, null, 2)
        );
      }
    } catch (error) {
      fs.writeFileSync(resolve("./icons.json"), JSON.stringify(icons, null, 2));
      has_sprite = true;
    }
  }
}

// 雪碧图样式处理模板
function SpritesmithTemplate(data) {
  // pc
  let icons = {};
  let tpl = `.ico {
		display: inline-block;
		background-image: url(${data.sprites[0].image});
		background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;
	}`;

  data.sprites.forEach(sprite => {
    const name = "" + sprite.name.toLocaleLowerCase().replace(/_/g, "-");
    icons[`${name}.png`] = true;
    tpl = `${tpl}
			.ico-${name}{
			width: ${sprite.width}px;
			height: ${sprite.height}px;
			background-position: ${sprite.offset_x}px ${sprite.offset_y}px;
		}`;
  });
  return tpl;
}

module.exports = {
  // 默认'/'，部署应用包时的基本 URL
  publicPath: "/",

  //输出文件目录
  outputDir: "dist",

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",

  //以多页模式构建应用程序。
  pages: undefined,

  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require("os").cpus().length > 1,

  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  // 生产环境的 source map
  productionSourceMap: !IS_PROD,

  devServer: {
    open: true,
    port: 9006,
    host: "0.0.0.0",
    disableHostCheck: true,
    overlay: {
      //打包关闭js lint 语法检查
      warning: false,
      error: false
    },
    // 假设 mock 接口为https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets/1
    // axios.get("/api/1").then(res => {
    //      console.log('proxy:', res);
    //    });
    proxy: {
      "/api": {
        target:
          "https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },

  chainWebpack: config => {
    // 图片压缩
    if (IS_PROD) {
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          webp: {
            quality: 75
          }
        });
    }

    // 打包分析
    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
    }

    // // cdn 选择性使用cdn
    // const cdn = {
    //   // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
    //   // "//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css"
    //   css: [],
    //   js: [
    //     "//unpkg.com/vue/dist/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
    //     "//unpkg.com/vue-router/dist/vue-router.min.js",
    //     "//unpkg.com/vuex/dist/vuex.min.js"
    //   ]
    // };

    // // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    // config.plugin("html").tap(args => {
    //   // html中添加cdn
    //   args[0].cdn = cdn;
    //   return args;
    // });

    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@draggable", resolve("src/components/draggable"))
      .set("@assets", resolve("src/assets"))
      .set("@scss", resolve("src/assets/scss"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@static", resolve("src/static"))
      .set("@api", resolve("src/api"))
      .set("@apiPicture", resolve("src/assets/images/apiSet"))
      .set("@entity", resolve("src/entity"))
      .set("@config", resolve("src/config"))
      .set("@utils", resolve("src/utils"));
    config.resolve.extensions[(".js", ".vue", ".json", ".css")];
    //利用 splitChunks 单独打包第三方模块
    if (IS_PROD) {
      config.optimization.delete("splitChunks");
    }
    return config;
  },

  configureWebpack: config => {
    const plugins = [];
    if (has_sprite) {
      plugins.push(
        new SpritesmithPlugin({
          src: {
            cwd: path.resolve(__dirname, "./src/assets/icons/"), // 图标根路径
            glob: "**/*.png" // 匹配任意 png 图标
          },
          target: {
            image: path.resolve(__dirname, "./src/assets/images/sprites.png"), // 生成雪碧图目标路径与名称
            // 设置生成CSS背景及其定位的文件或方式
            css: [
              [
                path.resolve(__dirname, "./src/assets/scss/sprites.scss"),
                {
                  format: "function_based_template"
                }
              ]
            ]
          },
          customTemplates: {
            function_based_template: SpritesmithTemplate
          },
          apiOptions: {
            cssImageRef:
              "~@assets/images/sprites.png?v=" + Date.parse(new Date())
          },
          spritesmithOptions: {
            padding: 2
          }
        })
      );
    }

    if (IS_PROD) {
      // plugins.push(
      //   new PurgecssPlugin({
      //     paths: glob.sync([path.join(__dirname, "./**/*.vue")])
      //     // extractors: [{
      //     // 	extractor: class Extractor {
      //     // 		static extract(content) {
      //     // 			const validSection = content.replace(
      //     // 				/<style([\s\S]*?)<\/style>+/gim,
      //     // 				""
      //     // 			);
      //     // 			return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
      //     // 		}
      //     // 	},
      //     // 	extensions: ["html", "vue"]
      //     // }],
      //     // whitelist: ["html", "body"],
      //     // whitelistPatterns: [/el-.*/],
      //     // whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
      //   })
      // );
      // Zopfli 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback);
          },
          compressionOptions: {
            numiterations: 15
          },
          minRatio: 0.99,
          test: productionGzipExtensions
        })
      );
      plugins.push(
        new BrotliPlugin({
          test: productionGzipExtensions,
          minRatio: 0.99
        })
      );
      // 利用 splitChunks 单独打包第三方模块
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            common: {
              name: "chunk-common",
              chunks: "initial",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 1,
              reuseExistingChunk: true,
              enforce: true
            },
            vendors: {
              name: "chunk-vendors",
              test: /[\\/]node_modules[\\/]/,
              chunks: "initial",
              priority: 2,
              reuseExistingChunk: true,
              enforce: true
            }
            // BScroll: {
            //   name: "chunk-BScroll",
            //   test: /[\\/]node_modules[\\/]@better-scroll[\\/]core[\\/]/,
            //   chunks: "initial",
            //   priority: 3,
            //   reuseExistingChunk: true,
            //   enforce: true
            // }
            // echarts: {
            // 	name: "chunk-echarts",
            // 	test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            // 	chunks: "all",
            // 	priority: 4,
            // 	reuseExistingChunk: true,
            // 	enforce: true
            // }
          }
        }
      };
    }

    // cdn配置
    // config.externals = {
    //   vue: "Vue",
    //   "vue-router": "VueRouter",
    //   vuex: "Vuex"
    //   //	axios: "axios"
    // };

    config.plugins = [...config.plugins, ...plugins];
  },

  // 全局引入scss
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        //加上自己的文件路径，不能使用别名
        path.resolve(__dirname, "src/assets/theme/index.scss")
      ]
    }
  }
};
