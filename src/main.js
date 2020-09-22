import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// Bootstrap Vue thingy
import { BootstrapVue, IconsPlugin, BIcon } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// social sharing
import VueSocialSharing from "vue-social-sharing";
// adsense 
// import Ads from "vue-google-adsense";

Vue.use(VueSocialSharing);
// Vue.use(require('vue-script2'))
// Vue.use(Ads.Adsense)
// Vue.use(Ads.InArticleAdsense)
// Vue.use(Ads.InFeedAdsense)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("BIcon", BIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
