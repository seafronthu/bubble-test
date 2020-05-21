import { Vue, Component } from "vue-property-decorator";
import { deviceEnquire } from "./device";
import { appModule } from "@stores/index";
// 全局使用的方法
@Component
class Mixin extends Vue {
  created() {
    deviceEnquire(({ deviceType, deviceValue, deviceNumber }) => {
      appModule.APP_TOGGLEDEVICE_MUTATE({
        deviceType,
        deviceValue,
        deviceNumber
      });
    });
  }
}
export { Mixin };
