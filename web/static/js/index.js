import router from "./router.js";
import store from "./store.js";

const app = new Vue({
  router,
  store,
  created() {
    store.dispatch('doSync');
  }
}).$mount("#app");
