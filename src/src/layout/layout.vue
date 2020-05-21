<!--  -->
<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header" style="top:0;left:0;">
      <TopHeader />
    </a-layout-header>
    <a-layout>
      <Drawer
        v-if="lessThan768"
        position="left"
        :closable="false"
        :visible="collapse"
        v-model="collapse"
      />
      <a-layout-sider
        v-else
        :collapsible="true"
        v-model="collapse"
        width="256px"
      >
        <Menu :collapse="collapse" theme="dark" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="padding: 0; height: auto; line-height: initial">
          <SecondHeader v-model="collapse" />
          <TabNav :tab-nav-list="tabList" :value="checkedTab" />
        </a-layout-header>
        <a-layout-content>
          <transition
            name="page-slide-fade"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
          >
            <!-- 组件类一定要写类名否则缓存失效 -->
            <keep-alive :include="cacheNameList">
              <router-view />
            </keep-alive>
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch, ProvideReactive } from "vue-property-decorator";
import Menu from "./menu";
import { delayExecute, urlJoin } from "@libs/tools";
import SecondHeader from "./second-header";
import TopHeader from "./top-header";
import TabNav from "./tab-nav";
import Drawer from "./drawer";
import { RouteGlobal } from "@/types/route";
import { appModule } from "@stores/index";
@Component({
  components: {
    Menu,
    SecondHeader,
    TopHeader,
    TabNav,
    Drawer
  }
})
// @Component({ MenuList })
export default class Layout extends Vue {
  private timer: number | undefined = void 0;
  collapse = false;
  headerHeight = "45px";
  checkedTab: RouteGlobal.TabObjINF | {} = {}; // 一定要赋值，只定义的话typescript编译之后会把这个属性去掉，这回导致watch失效
  // 标签页列表
  get tabList() {
    return appModule.tabList;
  }
  // 缓存路由列表
  get cacheRoutesList() {
    return appModule.cacheRoutesList;
  }
  // 缓存路由名字列表
  get cacheNameList() {
    return appModule.cacheNameList;
  }
  get lessThan768() {
    return appModule.lessThan768;
  }
  get isTablet() {
    return appModule.lessThan1200 && !appModule.lessThan768;
  }
  @ProvideReactive("breadcrumbList")
  breadcrumbList: RouteGlobal.BreadcrumbINF[] = [];
  // @ProvideReactive("deviceInfo")
  // deviceInfo: { isMobile: boolean } | {} = {};
  get asideWidth() {
    return this.collapse ? "65px" : "256px";
  }
  get containerStyle() {
    const { headerHeight } = this;
    return {
      height: `calc(100vh - ${headerHeight})`
    };
  }
  @Watch("isTablet")
  watchTablet(val: boolean) {
    this.changeDeviceScreen(val);
  }
  @Watch("$route")
  watchRoute(to: RouteGlobal.RouteINF) {
    this.changeRouteDeal(to);
  }
  // animate
  enter(el: Element, done: () => void) {
    // 去除动画的时候出现滚动条
    document.body.style.overflow = "hidden";
    delayExecute(500).then(() => {
      done();
    });
    // ...
    // done()
  }
  afterEnter() {
    document.body.style.overflow = "";
    // ...
  }
  leave(el: Element, done: () => void) {
    document.body.style.overflow = "";
    done();
  }
  // methods
  // 处理面包屑
  dealBreadCrumb(meta: RouteGlobal.ArrageAuthRoutesMetaINF) {
    this.breadcrumbList = meta && meta.breadcrumb ? meta.breadcrumb : [];
  }
  // 处理缓存路由
  dealCacheRoutes(to: RouteGlobal.RouteINF) {
    const cacheRoutesList = [...this.cacheRoutesList];
    const notCache = to.meta && to.meta.notCache;
    if (!notCache && !cacheRoutesList.some(v => v.name === to.name)) {
      cacheRoutesList.push(to);
      appModule.APP_SETCACHEROUTES_MUTATE(cacheRoutesList);
    }
  }
  // 处理标签页
  dealTabNav(to: RouteGlobal.RouteINF) {
    const {
      name,
      fullPath,
      query,
      params,
      meta: {
        redirect,
        notClosed,
        hideTab,
        notCache,
        // notSingleTab,
        beforeClosedCallback
      }
    } = to;
    let title = to.meta.title;
    const paramsStr = urlJoin(params);
    const queryStr = urlJoin(query);
    title =
      title +
      (paramsStr ? `?params:${paramsStr}` : "") +
      (queryStr ? `?query:${queryStr}` : "");
    const tabList = [...this.tabList];
    let hasTab = false; // 是否有tab
    for (let i = 0; i < tabList.length; ++i) {
      const items = tabList[i];
      items.checked = false;
      // if (items.notSingleTab && items.key === fullPath) {
      //   items.checked = true;
      //   hasTab = true;
      //   continue;
      // }
      if (items.name === name) {
        items.title = title;
        items.checked = true;
        hasTab = true;
      }
    }
    // 不存在标签页并且是显示标签页的
    if (!hasTab && !hideTab) {
      tabList.push({
        name,
        key: fullPath,
        query,
        params,
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
    }
    this.checkedTab = {
      name,
      key: fullPath,
      query,
      params,
      redirect,
      title,
      beforeClosedCallback,
      notClosed,
      checked: true,
      hideTab,
      notCache,
      // notSingleTab,
      createTime: +new Date()
    };
    appModule.APP_SETTABLIST_MUTATE(tabList);
    // let newTabList = this.tabList.filter(v =>
    //   v.notSingleTab ? v : v.name === to.name
    // );
  }
  changeDeviceScreen(val: boolean) {
    this.collapse = val && !this.lessThan768;
  }
  changeRouteDeal(to: RouteGlobal.RouteINF) {
    const { meta } = to;
    this.dealBreadCrumb(meta);
    this.dealTabNav(to);
    this.dealCacheRoutes(to);
  }
  // 手机端关闭menu抽屉触发
  handleClose() {
    this.collapse = false;
  }
  handleResize() {
    clearTimeout(this.timer);
    this.timer = undefined;
    this.timer = setTimeout(() => {
      this.checkedTab = { ...this.checkedTab };
    }, 300);
  }
  /** life cycle ***/

  created() {
    this.changeDeviceScreen(this.isTablet);
    this.changeRouteDeal(this.$route as RouteGlobal.RouteINF);
  }
  mounted() {
    window.addEventListener("resize", this.handleResize);
  }
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    // document.body.classList.remove('bgcolor-f2')
  }
}
</script>
<style lang="stylus">
.layout
  min-height 100vh
  overflow-x hidden
  .layout-header
    padding 0
  // .layout-aside // 覆盖样式（为了防止menu滚动导致超出指定宽度从而影响其他容器的大小）
  // overflow hidden
  // max-width size(256)
  .layout-main
    padding 0
    background-color #f0f2f5
</style>
