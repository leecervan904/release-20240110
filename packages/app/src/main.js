import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入iview
import iView from "view-design";
import "view-design/dist/styles/iview.css";

import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import { Message } from "view-design";

Vue.prototype.$Message = Message;

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(ElementUI);
Vue.component("TreeSelect", TreeSelect);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
