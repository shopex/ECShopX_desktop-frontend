import i18n from './src/plugins/nuxti18n'

const path = require('path')
const merge = require('webpack-merge')
const pkg = require('./package.json')
const { extendRoutes } = require('./nuxt')
const OssPlugin = require('./nuxt/ossplugin')

// const Parser = require('process-argv-parser')
// const parser = new Parser()
const mode = process.env.BUILD_ENV
console.log(`build template: ${process.env.npm_config_t}, mode: ${mode}`);
// console.log(mode)
require('dotenv-flow').config({
  node_env: mode
})

const SRC_PATH = path.resolve(__dirname, 'src')
const CUSTOME_PATH = path.resolve(__dirname, 'custome')

const vueAppEnvs = Object.keys(process.env).reduce((ret, key) => {
  const val = process.env[key]
  if (key.indexOf('VUE_APP_') >= 0) {
    console.log(`${key}=${val}`)
    ret[key] = val
  }

  if (process.server) console.log('server')

  return ret
}, {})

module.exports = {
  mode: 'universal',

  srcDir: 'src/',

  dir: {
    // layouts: path.resolve(CUSTOME_PATH, 'layouts')
  },

  server: {
    host: '0.0.0.0',
    // port: '80',
    disableHostCheck: true
  },

  env: {
    ...vueAppEnvs,
    VUE_APP_TEMPLATE: process.env.npm_config_t
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.VUE_APP_TITLE || pkg.name,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=Edge' },
      { name: 'renderer', content: 'webkit' },
      { name: 'referrer', content: 'never' },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//at.alicdn.com/t/font_2290749_t11sxx31om.css'
      }
    ],
    script: [
      {
        src: process.env.VUE_APP_ADOBE ? process.env.VUE_APP_ADOBE_URL : ''
      },
      {src: "https://map.qq.com/api/gljs?v=1.exp&key=UZZBZ-ADN6W-VHVRB-OYRGN-M6KRK-O2BTG",  type: 'text/javascript', mode: 'client'},
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },
  loading: false,
  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/error-handler',
    // '~/plugins/analytics',
    '~/plugins/axios',
    { src: '~/plugins/vue-swiper.js' },
    { src: '~plugins/vue-infinite-scroll', ssr: false },
    { src: '~/plugins/route', ssr: true },
    { src: '~/plugins/persistedState', ssr: false }
  ],

  serverMiddleware: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    
    ['nuxt-i18n', i18n],
    '@nuxtjs/device',
    // ['~/modules/axios'],
    'cookie-universal-nuxt',
    ['cookie-universal-nuxt', { parseJSON: true }]
    // ['~/modules/page-cache', {
    //   pages: [
    //     // '/',
    //     // /^\/items\?cat_id/,
    //     // /^\/items\/(\d+)$/,
    //     // /^\/api\?.+(method=theme\.widgets).+/
    //   ]
    // }],
    // ['@nuxtjs/component-cache', {
    //   max: 500,
    //   maxAge: 1000 * 60 * 3
    // }],
    // ['~/modules/proxy']
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['@shopex/espier-widgets', 'vue-hotzone'],
    extractCSS: true,
    parallel: true,
    // publicPath: process.env.VUE_APP_PUBLIC_PATH || "/_nuxt/",
    // publicPath: "https://ecshopx.shopex123.com/pc/_nuxt/",
    extend(config, { isDev, isClient, isServer }) {

      config.module.rules.forEach(rule => {
        if (rule.test && rule.test.toString().includes('scss')) {
          console.log('SCSS RULE:', JSON.stringify(rule, null, 2));
        }
      });

      // 配置Webpack保留开源标注 - 优雅的实现方式
      const preserveLicenseComments = (minimizer) => {
        if (!minimizer.options) minimizer.options = {};
        
        // 处理TerserPlugin (JavaScript压缩)
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions = {
            ...minimizer.options.terserOptions,
            compress: {
              ...minimizer.options.terserOptions?.compress,
              drop_console: false,
              drop_debugger: false
            },
            format: {
              ...minimizer.options.terserOptions?.format,
              comments: /ECShopX|Copyright|License|开源|商派/i
            }
          };
        }
        
        // 处理CSS压缩器 - 更精确的配置
        if (minimizer.constructor.name === 'OptimizeCssAssetsPlugin' || 
            minimizer.constructor.name === 'CssMinimizerPlugin') {
          minimizer.options.cssProcessorOptions = {
            ...minimizer.options.cssProcessorOptions,
            parser: {
              ...minimizer.options.cssProcessorOptions?.parser,
              ignoreComments: false
            },
            discardComments: {
              removeAll: false,
              removeAllButFirst: false,
              remove: (comment) => {
                // 保留包含开源标注的注释
                const hasLicenseKeywords = /ECShopX|Copyright|License|开源|商派/i.test(comment);
                return !hasLicenseKeywords;
              }
            }
          };
        }
      };

      // 应用配置到所有压缩器
      if (config.optimization?.minimizer) {
        config.optimization.minimizer.forEach(preserveLicenseComments);
      }

      // 添加Banner插件确保开源标注在所有文件中可见
      const webpack = require('webpack');
      const licenseBanner = `/*!
 * ECShopX open source E-commerce
 * ECShopX 开源商城系统 
 * Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
 * Corporate Website: https://www.shopex.cn 
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * The removal of shopeX copyright information without authorization is prohibited.
 * 未经授权不可去除shopeX商派相关版权
 * Author: shopeX Team <mkt@shopex.cn>
 * Contact: 400-821-3106
 */`;

      // 确保Banner插件在其他插件之前添加
      if (!config.plugins) config.plugins = [];
      
      // 移除所有可能存在的Banner插件
      config.plugins = config.plugins.filter(plugin => {
        // 移除所有BannerPlugin实例
        if (plugin.constructor.name === 'BannerPlugin') {
          console.log('Removing existing BannerPlugin:', plugin.options);
          return false;
        }
        return true;
      });
      
      // 添加我们的开源标注Banner插件 - 使用更高的优先级
      config.plugins.unshift(new webpack.BannerPlugin({
        banner: licenseBanner,
        raw: false,
        entryOnly: false,
        test: /\.(js|css)$/,
        exclude: /node_modules/
      }));

      // 强制配置TerserPlugin保留我们的注释并禁用extractComments
      if (config.optimization?.minimizer) {
        config.optimization.minimizer.forEach(minimizer => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            // 禁用extractComments，这样注释就不会被提取到单独的文件中
            minimizer.options.extractComments = false;
            minimizer.options.terserOptions = {
              ...minimizer.options.terserOptions,
              compress: {
                ...minimizer.options.terserOptions?.compress,
                drop_console: false,
                drop_debugger: false
              },
              format: {
                ...minimizer.options.terserOptions?.format,
                comments: /ECShopX|Copyright|License|开源|商派/i
              }
            };
          }
        });
      }

      // 额外配置：确保在构建过程中保留我们的开源标注
      if (config.optimization) {
        config.optimization.splitChunks = config.optimization.splitChunks || {};
        config.optimization.splitChunks.cacheGroups = config.optimization.splitChunks.cacheGroups || {};
        
        // 为所有chunks添加开源标注
        Object.keys(config.optimization.splitChunks.cacheGroups).forEach(key => {
          if (config.optimization.splitChunks.cacheGroups[key]) {
            config.optimization.splitChunks.cacheGroups[key].name = (module, chunks, cacheGroupKey) => {
              const chunkName = chunks.map(chunk => chunk.name).join('~');
              return `${cacheGroupKey}-${chunkName}`;
            };
          }
        });
      }

      config.resolve = merge(config.resolve, {
        alias: {
          lodash$: 'lodash-es',
          '~': path.resolve(__dirname, 'src'),
          '~assets': path.resolve(__dirname, 'src/assets'),
          '@': path.resolve(__dirname, 'src'),
          '@assets': path.resolve(__dirname, 'src/assets')
        }
      })
      if (isClient) {
        if (process.env.BUILD_ENV === 'release') {
          // config.plugins = config.plugins.concat([
          //   new OssPlugin({
          //     client: isClient,
          //     region: "oss-cn-shanghai",
          //     accessKeyId: process.env.CDN_KEY,
          //     accessKeySecret: process.env.CDN_SECRET,
          //     bucket: "aigle-bbc",
          //     dist: "aigle/"
          //   })
          // ]);
        }
      }
    },
    unknownContextCritical: false,
    cssSourceMap: false,
    
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.scss$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    loaders: {
      css:{
        modules:false
      },
      cssModules: {
        modules:false
      },
      scss: {
        // modules:false,
        implementation: require('sass'),
        additionalData: `@import '${path.resolve(SRC_PATH, './style/theme.scss')}';
        @import '${path.resolve(SRC_PATH, './style/imports.scss')}';`,
        sassOptions: {
          includePaths: [path.resolve(SRC_PATH, './style')]
        }
      }
    }
  },

  // buildDir: process.env.NODE_ENV === "production" ? "dist" : ".nuxt",

  router: {
    base: '/',
    middleware: 'i18n',
    extendRoutes
  },

  // Vuex store 配置
  store: true,

  render: {
    static: {}
  },

  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },

  watch: ['~/custome']
}
