import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Stores
Vue.use(Vuex);
import OrdersStoreModule from "./store/ordersStoreModule"
const store = new Vuex.Store({
  namespaced: true,
  modules: {
    OrdersStoreModule
  }
});

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
