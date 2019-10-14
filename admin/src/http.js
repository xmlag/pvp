import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api'
  // baseURL:'http://localhost:3000/admin/api'
})

// axios拦截器
http.interceptors.request.use( (config)=>{
  if(localStorage.token){
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
}, (err) => {
  return Promise.reject(err);
});
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    // 如果要统一用这种方式提示错误的话，就要约定，后端在处理错误的时候，要带上`message`
    Vue.prototype.$message.error(err.response.data.message)
  }
  if(err.response.status === 401){
    router.push('/login')
  }
  return Promise.reject(err)
})

export default http