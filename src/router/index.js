import Vue from "vue";
import VueRouter from "vue-router";
import Town from "@/pages/town/Index.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // redirect: "/town",
    component: Town,
  },


  // 镇 
  {
    path: "/town",
    name: "town",
    component: Town,
  },

];

const router = new VueRouter({
  mode: "hash",
  routes,
});



export default router;
