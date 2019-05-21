import Vue from "vue";
import App from "./App.vue";
import store from "./store";

require("bulma/css/bulma.min.css");
require("./css/index.css");

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store
}).$mount("#app");
