import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './style.css'

Vue.config.productionTip = false

import http from './http'
// 将http加入到 Vue 的原型属性中 我们就可以在任意的地方使用 this.$http
Vue.prototype.$http = http

Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuth(){
      return {
        Authorization: `Bearer ${localStorage.token}`
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
