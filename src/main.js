// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css';
import './permission';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: './static/loading/loading-bars.svg',
  attempt: 1
})
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
