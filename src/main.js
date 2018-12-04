import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify.js'
import App from './App.vue'
import router from './router'


/* eslint-disable */

Vue.config.productionTip = false
new Vue({
  el: '#app',
  render: h => h(App),
  router
})