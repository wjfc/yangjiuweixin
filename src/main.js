import Vue from "vue";
import App from "./App.vue";
import { Toast } from "vant";
import router from "./router";
import "@/assets/less/reset.less";

Vue.use(Toast);
new Vue({
  router,
  render: (h) => h(App),


}).$mount("#app");