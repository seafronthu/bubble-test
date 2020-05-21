import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./stores";
// import Element from "element-ui";
import Antd from "ant-design-vue";
if (process.env.NODE_ENV !== "production") {
  require("ant-design-vue/dist/antd.css");
}
import plugins from "@/plugins";
import "@assets/css/init.styl";
import "@assets/css/common.styl";
import "@assets/css/animate.styl";
// import "element-ui/lib/theme-chalk/index.css";
import "@/mocks/index.js";
import "@assets/js/global.js";
import IconFont from "@basic/icon-font";
import ContainerFluid from "@business/container-fluid";
Vue.use(Antd);
Vue.use(plugins);

// const AntvIcon = Icon.createFromIconfontCN({
//   scriptUrl: "//at.alicdn.com/t/font_1307566_i7vkvddg17f.js" // 在 iconfont.cn 上生成 函数式组件（clonecomponent不能使用）
// });
// Vue.component("antv-icon", AntvIcon);
Vue.component("icon-font", IconFont);
Vue.component("container-fluid", ContainerFluid);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
