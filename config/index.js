'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/users/info': {
        target: 'http://127.0.0.1:3001'
      },
      '/users/login': {
        target: 'http://127.0.0.1:3001'
      },
      '/users/getUserLists': {
        target: 'http://127.0.0.1:3001'
      },
      '/users/delUser': {
        target: 'http://127.0.0.1:3001'
      },
      '/users/getUser': {
        target: 'http://127.0.0.1:3001'
      },
      '/users/changeStatus': {
        target: 'http://127.0.0.1:3001'
      },
      '/users/addUsers': {
        target: 'http://127.0.0.1:3001'
      },
      '/getcarousels': {
        target: 'http://127.0.0.1:3001'
      },
      '/image': {
        target: 'http://127.0.0.1:3001'
      },
      '/changeStatus': {
        target: 'http://127.0.0.1:3001'
      },
      '/delCalsouel': {
        target: 'http://127.0.0.1:3001'
      },
      '/upload': {
        target: 'http://127.0.0.1:3001'
      },
      '/addCalsouer': {
        target: 'http://127.0.0.1:3001'
      },
      '/users/updateauth': {
        target: 'http://127.0.0.1:3001'
      },
      '/updateCalsouel': {
        target: 'http://127.0.0.1:3001'
      },
      '/updatewebs': {
        target: 'http://127.0.0.1:3001'
      },
      '/getwebset': {
        target: 'http://127.0.0.1:3001'
      },
      '/users/updatepwd': {
        target: 'http://127.0.0.1:3001'
      },
      '/addtabs': {
        target: 'http://127.0.0.1:3001'
      },
      '/updatetabs': {
        target: 'http://127.0.0.1:3001'
      },
      '/deltabs': {
        target: 'http://127.0.0.1:3001'
      },
      '/gettabs': {
        target: 'http://127.0.0.1:3001'
      },
      '/addnews': {
        target: 'http://127.0.0.1:3001'
      },
      '/getaritic': {
        target: 'http://127.0.0.1:3001'
      },
      '/delAritic':{
        target: 'http://127.0.0.1:3001'
      },
      '/statusaritic':{
        target: 'http://127.0.0.1:3001'
      },
      '/updatearitic':{
        target: 'http://127.0.0.1:3001'
      },
      '/users/updateavatar':{
        target: 'http://127.0.0.1:3001'
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
