/**
 * Created by Administrator on 2019/3/2.
 */
import Axios  from 'axios'

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {

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

export default Axios
