import Vue from "vue";
import App from "./App.vue";
import router from "@/router/routes";
import store from "@/store/store";
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate)
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
