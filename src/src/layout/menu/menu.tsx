import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import SubMenu from "./sub-menu";
import { RouteGlobal } from "@/types/route";
import { CreateElement, VNode } from "vue/types/umd";
import { appModule } from "@stores/index";
interface ToRoutes {
  name: string;
  meta: RouteGlobal.ArrageAuthRoutesMetaINF;
}
@Component
export default class Menu extends Vue {
  @Prop({
    type: String
  })
  width?: string;
  @Prop({
    type: String,
    default: ""
  })
  themeColor!: string;
  @Prop({
    type: String,
    default: "light"
  })
  theme!: string;
  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  collapse!: boolean;
  // data
  selectedKeys: string[] = [];
  openKeys: string[] = [];
  oldOpenKeys: string[] = [];
  defaultSelectedKeys: string[] = [];
  defaultOpenKeys: string[] = [];
  // state
  get menuList() {
    return appModule.menuList;
  }
  get frontRoutesList() {
    return appModule.frontRoutesList;
  }
  get authorizationList() {
    return appModule.authorizationList;
  }
  // watch
  // @Watch("")
  @Watch("collapse")
  watchCollapse(val: boolean) {
    this.openKeys = val ? [] : this.oldOpenKeys;
  }
  @Watch("$route")
  watchRoute() {
    const { meta, name } = this.$route;
    this.changeMenu({
      meta,
      name: name as string
    });
  }
  // methods
  onOpenChange(openKeys: string[]) {
    this.openKeys = openKeys;
    this.oldOpenKeys = openKeys;
  }
  handleRouter({
    item,
    key,
    keyPath
  }: {
    item: VNode;
    key: string;
    keyPath: string;
  }) {
    this.$emit("trigger-click", {
      item,
      key,
      keyPath
    });
    this.selectedKeys = [key];
    this.$routerPush({ name: key });
  }
  handleSelected() //   {
  //   item,
  //   key,
  //   keyPath
  // }: {
  //   item: string;
  //   key: string;
  //   keyPath: string;
  // }
  {
    // console.log("selected", item, key, keyPath);
    // this.$routerPush({ name: key });
  }
  private changeMenu(to: ToRoutes) {
    if (!to.meta.hideMenu) {
      // this.defaultSelectedKeys = [to.name];
      this.selectedKeys = [to.name];
      const matched: RouteGlobal.matchINF[] = to.meta.matched || [];
      if (this.collapse) {
        this.openKeys = [];
        this.oldOpenKeys = [];
        return;
      }
      const currOpenMenu = matched
        .filter(v => v.meta.type === "MENU" && !v.meta.hideMenu)
        .map(v => v.name);
      this.openKeys = currOpenMenu;
      this.oldOpenKeys = currOpenMenu;
      // this.defaultOpenKeys = currOpenMenu;
    }
  }
  created() {
    const { meta, name } = this.$route;
    this.changeMenu({
      meta,
      name: name as string
    });
  }
  render(h: CreateElement) {
    const {
      theme,
      onOpenChange,
      handleRouter,
      defaultOpenKeys,
      openKeys,
      defaultSelectedKeys,
      selectedKeys,
      themeColor,
      // collapse,
      handleSelected,
      menuList
    } = this;
    const ResultJSXEle = menuList.map(v => SubMenu(h, v));
    return (
      <div>
        <a-menu
          mode="inline"
          theme={theme}
          onOpenChange={onOpenChange}
          onClick={handleRouter}
          onSelected={handleSelected}
          defaultOpenKeys={defaultOpenKeys}
          openKeys={openKeys}
          inlineCollapsed={false}
          defaultSelectedKeys={defaultSelectedKeys}
          selectedKeys={selectedKeys}
          class={["not-select", `menu-${themeColor}`]}
        >
          {ResultJSXEle}
        </a-menu>
      </div>
    );
  }
}
