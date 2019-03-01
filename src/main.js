// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import init from './init'
import router from './router'
import Axios  from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import qs from 'qs'
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

Vue.prototype.$axios  = Axios
Vue.prototype.HOST = '/apiMusic'
Vue.prototype.musicapi = '/musicapi'
Vue.prototype.$loading = Loading.service;

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {


  if(config.method === "post"){
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { init },
  template: '<init/>'
})
