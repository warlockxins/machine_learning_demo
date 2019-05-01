import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import "bulma/css/bulma.min.css";
import "./css/sticky-footer-navbar.css";

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store
}).$mount("#app");
