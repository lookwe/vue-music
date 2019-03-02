// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import init from './init'
import router from './router'
import request from './utils/request'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'

import 'swiper/dist/css/swiper.css'
import { Icon,Popover,Loading, Row, Col, Message, Notification } from 'element-ui';

Vue.use(VueLazyload, {
  preLoad: 1,
  error: require('@/assets/imgage/load.jpg'),
  loading: require('@/assets/imgage/load.jpg'),
  attempt: 1,
  lazyComponent: true
})

//轮播图
Vue.use(VueAwesomeSwiper)

//elementUI icon标签
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Popover)
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;


Vue.prototype.HOST = '/apiMusic'
Vue.prototype.musicapi = '/musicapi'
Vue.prototype.$loading = Loading.service;

Vue.prototype.$axios = request


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { init },
  template: '<init/>'
})
