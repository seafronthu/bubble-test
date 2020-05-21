import { appModule } from "@stores/index";
import { VueConstructor } from "vue";
import { RouterPushOptionsObjINF } from "vue/types/vue";
function install(vm: VueConstructor) {
  vm.prototype.$routerPush = function(
    options: RouterPushOptionsObjINF | string,
    fresh?: boolean
  ) {
    const { APP_SETCACHEROUTES_MUTATE } = appModule;
    let refresh = false;
    let path: string | undefined;
    let name: string | undefined;
    let query:
      | GLOBAL.MapINF<string | (string | null)[] | null | undefined>
      | undefined;
    let params:
      | GLOBAL.MapINF<string | (string | null)[] | null | undefined>
      | undefined;
    let onComplete: () => void = () => {};
    let onAbort: () => void = () => {};
    if (typeof options === "string") {
      name = options;
      refresh = fresh || false;
    } else if (typeof options === "object" && options.name) {
      name = options.name;
      refresh = options.refresh || false;
      path = options.path;
      query = options.query;
      params = options.params;
      onComplete = options.onComplete || onComplete;
      onAbort = options.onAbort || onAbort;
    }
    if (!name && !path) {
      throw Error("A path or name must exist");
    }
    if (refresh) {
      const { cacheRoutesList } = appModule;
      // 刷新的时候清除当前跳转路由缓存
      APP_SETCACHEROUTES_MUTATE(
        cacheRoutesList.filter(items => items.name !== name)
      );
      if (this.$route.name === name) {
        const redirectParams = params || {};
        redirectParams.redirect = name;
        // 用于清除缓存之后重新渲染
        setTimeout(() => {
          this.$router.replace(
            {
              name: "ReplacePage",
              query,
              params: redirectParams
            },
            onComplete,
            onAbort
          );
        }, 5);
        return;
      }
      // 用于清除缓存之后重新渲染
      setTimeout(() => {
        this.$router.push(
          {
            name,
            query,
            params
          },
          onComplete,
          onAbort
        );
      }, 5);
      return;
    }
    this.$router.push(
      {
        path,
        name,
        query,
        params
      },
      onComplete,
      onAbort
    );
  };
  vm.prototype.$routerReplace = function(
    options: RouterPushOptionsObjINF | string | undefined,
    fresh = true
  ) {
    const { APP_SETCACHEROUTES_MUTATE, cacheRoutesList } = appModule;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const routeName = that.$route.name;
    let refresh = true;
    // let path: string | undefined;
    let name: string = routeName;
    let query:
      | GLOBAL.MapINF<string | (string | null)[] | null | undefined>
      | undefined;
    let params:
      | GLOBAL.MapINF<string | (string | null)[] | null | undefined>
      | undefined;
    let onComplete: () => void = () => {};
    let onAbort: () => void = () => {};
    if (typeof options === "string") {
      name = options;
      refresh = fresh || false;
    } else if (typeof options === "object" && options.name) {
      name = options.name || routeName;
      refresh = options.refresh || false;
      // path = options.path;
      query = options.query;
      params = options.params;
      onComplete = options.onComplete || onComplete;
      onAbort = options.onAbort || onAbort;
    }
    if (refresh) {
      // 刷新的时候清除当前跳转路由缓存
      APP_SETCACHEROUTES_MUTATE(
        cacheRoutesList.filter(items => items.name !== name)
      );
      const redirectParams = params || {};
      redirectParams.redirect = name;
      // 用于清除缓存之后重新渲染
      setTimeout(() => {
        this.$router.replace(
          {
            name: "ReplacePage",
            query,
            params: redirectParams
          },
          onComplete,
          onAbort
        );
      }, 5);
      return;
    }
    this.$router.replace(
      {
        name,
        query,
        params
      },
      onComplete,
      onAbort
    );
  };
}
export default install;
