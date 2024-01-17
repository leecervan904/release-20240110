import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入iview
import iView from "view-design";
import "view-design/dist/styles/iview.css";
Vue.use(iView);

import { Message } from "view-design";
Vue.prototype.$Message = Message;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
