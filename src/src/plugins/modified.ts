import { VueConstructor } from "vue";
import { appModule } from "@stores/index";
// v-modified:[name]= boolean  (name: 路由名字，boolean 是否更改)
/**
 * 指令用来监听内容是否更改从而开启关闭之前一些操作
 * @param vm
 */
function install(vm: VueConstructor) {
  vm.directive("modified", {
    bind() {
      // console.log(el, binding.name);
    },
    inserted() {
      // console.log("inserted");
    },
    update() {
      // console.log("update");
    },
    componentUpdated(el, binding) {
      const { value, arg, oldValue } = binding;
      if (value === oldValue) {
        return;
      }
      const { tabList, APP_SETTABLIST_MUTATE } = appModule;
      const newTabList = [...tabList];
      // console.log(newTabList);
      for (let i = 0; i < newTabList.length; ++i) {
        const items = newTabList[i];
        if (items.name === arg) {
          items.modified = value;
          break;
        }
        // if (items.key === fullPath && items.notSingleTab) {
        //   items.modified = true;
        // } else if (items.name === name) {
        //   items.modified = true;
        // }
      }
      // console.log(newTabList);
      APP_SETTABLIST_MUTATE(newTabList);
    }
    // unbind(el, binding, vnode) {}
  });
}
export default install;
