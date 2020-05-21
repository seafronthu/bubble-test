import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { DeviceDirection, DeviceType, DeviceNumber } from "@libs/device";
import { getRoutesApi } from "@/api/app";
import { arrageRoutes, arrageMenu } from "@libs/manage";
import { RouteGlobal } from "@/types/route";
type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

interface ErrorInfoINF {
  type: string;
  name: string;
  message: string;
  href: string;
  method?: Method;
  status?: number;
  statusText?: string;
  baseURL?: string;
  url?: string;
  params?: string;
  data?: any;
  headers?: any;
}
export interface ErrorRecordINF extends ErrorInfoINF {
  userId: number;
  headimg: string;
  account: string;
  time: number;
}
@Module({ name: "app", namespaced: true })
export default class App extends VuexModule {
  store: any;
  /**
   * @description 当前设备大小
   */
  public device = 0;
  public XS = "";
  public SM = "";
  public MD = "";
  public LG = "";
  public XL = "";
  public XXL = "";
  /**
   * @description 标签列表
   */
  public tabList: RouteGlobal.TabObjINF[] = [];
  /**
   * @description 路由缓存列表
   */
  public cacheRoutesList: RouteGlobal.RouteINF[] = [];
  /**
   * @description 授权列表
   */
  public authorizationList: RouteGlobal.BackAuthObjINF[] = [];
  /**
   * @description 前台路由
   */
  public frontRoutesList: {
    [key: string]: RouteGlobal.FrontStageRoutesObjINF;
  } = {};
  /**
   * @description 权限路由整理后的列表
   */
  public authRoutesList: RouteGlobal.ArrageAuthRoutesINF[] = [];
  /**
   * @description 整理后的所有路由列表
   */
  public routesList: RouteGlobal.FrontStageRoutesObjINF[] = [];
  /**
   * @description 菜单列表
   */
  public menuList: RouteGlobal.ArrageMenuObjINF[] = [];
  /**
   * @description 错误状态
   */
  public errorStatus = false;
  /**
   * @description 错误日志列表
   */
  public errorLogList: ErrorRecordINF[] = [];
  /**
   * @description 缓存名字
   */
  get cacheNameList(): string[] {
    return this.cacheRoutesList.map(v => v.name);
  }

  get lessThan576() {
    // return this.XS === DeviceDirection.XS;
    return this.device <= DeviceNumber[DeviceDirection.XS];
  }
  get lessThan768() {
    // return this.SM === DeviceDirection.SM;
    return this.device <= DeviceNumber[DeviceDirection.SM];
  }
  get lessThan992() {
    // return this.MD === DeviceDirection.MD;
    return this.device <= DeviceNumber[DeviceDirection.MD];
  }
  get lessThan1200() {
    // return this.LG === DeviceDirection.LG;
    return this.device <= DeviceNumber[DeviceDirection.LG];
  }
  get lessThan1600() {
    // return this.XL === DeviceDirection.XL;
    return this.device <= DeviceNumber[DeviceDirection.XL];
  }
  get greaterThan1600() {
    // return this.XXL === DeviceDirection.XXL;
    return this.device >= DeviceNumber[DeviceDirection.XXL];
  }
  @Mutation
  APP_SETAUTHORIZATIONLIST_MUTATE({
    backstageRoutes,
    frontstageRoutes,
    initialRoutes
  }: {
    backstageRoutes: RouteGlobal.BackAuthObjINF[];
    frontstageRoutes: { [key: string]: RouteGlobal.FrontStageRoutesObjINF };
    initialRoutes: RouteGlobal.FrontStageRoutesObjINF[];
  }) {
    this.authorizationList = backstageRoutes;
    this.frontRoutesList = frontstageRoutes;
    this.authRoutesList = arrageRoutes({
      backstageRoutes: this.authorizationList,
      frontstageRoutes: frontstageRoutes,
      parentId: 0
    });
    this.routesList = [...initialRoutes, ...this.authRoutesList];
    this.menuList = arrageMenu({
      backstageRoutes: this.authorizationList,
      frontstageRoutes: frontstageRoutes,
      parentId: 0
    });
  }
  /**
   * 储存当前设备大小值
   * @param device 设备大小
   */
  @Mutation
  public APP_TOGGLEDEVICE_MUTATE({
    deviceType,
    deviceValue,
    deviceNumber
  }: {
    deviceType: DeviceType;
    deviceValue: DeviceDirection;
    deviceNumber: DeviceNumber;
  }) {
    this[deviceType] = deviceValue;
    this.device = deviceNumber;
  }
  /**
   * 设置缓存路由
   * @param cacheRoutesList 路由列表
   */
  @Mutation
  public APP_SETCACHEROUTES_MUTATE(cacheRoutesList: RouteGlobal.RouteINF[]) {
    this.cacheRoutesList = cacheRoutesList;
  }
  /**
   * 设置tab标签页
   * @param cacheRoutesList 路由列表
   */
  @Mutation
  public APP_SETTABLIST_MUTATE(tabList: RouteGlobal.TabObjINF[]) {
    this.tabList = tabList;
  }
  /**
   * 设置当前错误状态
   * @param status 状态
   */
  @Mutation
  public APP_SETERRORSTATUS_MUTATE(status: boolean) {
    this.errorStatus = status;
  }
  /**
   * 设置当前错误状态
   * @param status 状态
   */
  @Mutation
  public APP_ADDERRORLOGINFO_MUTATE(
    errorInfo: ErrorInfoINF,
    userInfo: { headimg: string; userId: number; account: string }
  ) {
    const data = {
      ...errorInfo,
      ...userInfo,
      time: new Date().getTime()
    };
    this.errorLogList.push(data);
  }
  /**
   * 整理路由和菜单
   * @param frontstageRoutes 前台路由
   */
  @Action //({ rawError: true })
  public async APP_GETAUTHORIZATIONLIST_ACTION({
    frontstageRoutes,
    initialRoutes
  }: {
    frontstageRoutes: {
      [key: string]: RouteGlobal.FrontStageRoutesObjINF;
    };
    initialRoutes: RouteGlobal.FrontStageRoutesObjINF[];
  }) {
    const res = await getRoutesApi(); // Cannot read property 'getters' of undefined  What?
    if (res.code === 1000) {
      const list = res.data.list as RouteGlobal.BackAuthObjINF[];
      this.APP_SETAUTHORIZATIONLIST_MUTATE({
        backstageRoutes: list,
        frontstageRoutes,
        initialRoutes
      });
      const tabList: RouteGlobal.TabObjINF[] = [];
      for (let i = 0; i < this.authRoutesList.length; ++i) {
        const items = this.authRoutesList[i];
        if (items.meta && items.meta.showInitialTab) {
          const {
            name,
            path,
            meta: {
              title,
              redirect,
              notClosed,
              hideTab,
              notCache,
              // notSingleTab,
              beforeClosedCallback
            }
          } = items;
          tabList.push({
            name,
            key: path,
            redirect,
            title,
            beforeClosedCallback,
            notClosed,
            checked: true,
            hideTab,
            notCache,
            // notSingleTab,
            createTime: +new Date()
          });
          this.APP_SETTABLIST_MUTATE(tabList);
        }
      }
      return res;
    }
    return res;
  }
  @Action
  APP_ADDERRORLOG_ACTION(info: ErrorInfoINF) {
    if (!~window.location.href.indexOf("error-log"))
      this.APP_SETERRORSTATUS_MUTATE(true);
    this.APP_ADDERRORLOGINFO_MUTATE(info, this.store.state.user.userInfo);
    return false;
  }
}
// const myMod = getModule(App)
// myMod.device //works
// myMod.someOtherField //Typescript will error, as field doesn't exist
