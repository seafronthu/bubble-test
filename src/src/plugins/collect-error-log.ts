import { appModule } from "@stores/index";
import { VueConstructor } from "vue";
export default function install(Vue: VueConstructor) {
  Vue.config.errorHandler = error => {
    const info = {
      type: "script",
      name: error.name,
      message: error.message,
      href: window.location.href
    };
    Vue.nextTick(() => {
      appModule.APP_ADDERRORLOG_ACTION(info);
    });
  };
}
