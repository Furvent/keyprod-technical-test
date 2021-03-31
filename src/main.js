import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// Stores
Vue.use(Vuex);
import OrdersStoreModule from "./store/ordersStoreModule";
import PackagesStoreModule from "./store/packagesStoreModule";

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    OrdersStoreModule,
    PackagesStoreModule,
  },
});

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
