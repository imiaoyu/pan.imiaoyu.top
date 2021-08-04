import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: false,//是否开启调试 
  connection: 'http://euiadmin.com:2120',// socket服务器端地址 
}))