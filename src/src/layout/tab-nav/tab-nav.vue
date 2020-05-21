<!-- 标签页导航 -->
<template>
  <div class="tab-nav">
    <!-- 清除所有按钮 -->
    <div class="btn close-btn">
      <a-dropdown>
        <div class="close-link flex-row-center">
          <icon-font type="clear" style="font-size: 24px;" />
        </div>
        <template #overlay>
          <a-menu @click="handleCloseAll">
            <a-menu-item>关闭所有</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <!-- 选项卡 -->
    <div class="main">
      <a-button
        icon="caret-left"
        class="btn left-btn flex-row-center"
        @click="scrollFunc(200)"
      ></a-button>
      <a-button
        icon="caret-right"
        class="btn right-btn flex-row-center"
        @click="scrollFunc(-200)"
      ></a-button>
      <!-- 选项卡容器 -->
      <div
        class="wrap"
        ref="scrollWrap"
        @DOMMouseScroll.stop.prevent="handleScroll"
        @mousewheel.stop.prevent="handleScroll"
      >
        <div
          class="container"
          ref="scrollContainer"
          :style="{ transform: translates }"
        >
          <transition-group
            name="tab-nav-anim"
            tag="div"
            class="flex-row-start-center height-full"
          >
            <!-- <transition-group name="list-complete-demo" tag="div"> -->
            <TagButton
              v-for="(item, index) of newTabNavList"
              ref="tabNavRef"
              class="tab-nav-anim"
              :key="item.key"
              height="100%"
              :effect="item.effect"
              :type="item.type"
              :closable="!item.notClosed"
              @trigger-close="
                handleClose({ item, command: 'CLOSE_CURRENT', index })
              "
              @trigger-tag-click="handleClick(item)"
              :trigger="['contextmenu']"
              @trigger-menu-click="
                menuOption => handleCommand(item, menuOption, index)
              "
              dot
            >
              {{ item.title }}
              <template #menu>
                <a-menu-item
                  v-for="its of dropdownItemList"
                  :key="its.type"
                  :disabled="!isCloseFunc(item, its, index)"
                  >{{ its.title }}</a-menu-item
                >
              </template>
            </TagButton>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import TagButton from "@business/tag-button";
import {
  closeCurrentTab,
  closeRightTab,
  closeLeftTab,
  closeOtherTab,
  closeAllTab
} from "./utils";
import { RouteGlobal } from "@/types/route";
import { MenuOptionINF } from "@business/tag-button/tag-button.vue";
import { appModule } from "../../stores";
type DropdownType =
  | "CLOSE_All"
  | "CLOSE_OTHER"
  | "CLOSE_CURRENT"
  | "CLOSE_LEFT"
  | "CLOSE_RIGHT"
  | "REFRESH";
interface DropdownItemObjINF {
  type: DropdownType;
  title: string;
}
@Component({
  components: {
    TagButton
  }
})
export default class extends Vue {
  $refs!: {
    scrollWrap: HTMLDivElement;
    scrollContainer: HTMLDivElement;
    tabNavRef: Vue[];
  };
  dropdownItemList: DropdownItemObjINF[] = [
    {
      type: "REFRESH",
      title: "刷新"
    },
    {
      type: "CLOSE_CURRENT",
      title: "关闭当前"
    },
    {
      type: "CLOSE_RIGHT",
      title: "关闭右边"
    },
    {
      type: "CLOSE_LEFT",
      title: "关闭左边"
    },
    {
      type: "CLOSE_OTHER",
      title: "关闭其它"
    },
    {
      type: "CLOSE_All",
      title: "关闭所有"
    }
  ];
  diverge = 0;
  // @Prop({
  //   type: Number
  // })
  // num?: number;
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  tabNavList!: RouteGlobal.TabObjINF[];
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  value!: RouteGlobal.TabObjINF;
  get newTabNavList() {
    return this.tabNavList.map(v => {
      let type = "default";
      if (v.checked) {
        type = v.modified && v.beforeClosedCallback ? "warning" : "primary";
      } else if (v.modified && v.beforeClosedCallback) {
        type = "warning";
      }
      return {
        ...v,
        type
      };
    });
  }
  get translates() {
    const diverge = this.diverge;
    return `translateX(${diverge}px)`;
  }
  get cacheRoutesList() {
    return appModule.cacheRoutesList;
  }
  APP_SETTABLIST_MUTATE(tabList: RouteGlobal.TabObjINF[]) {
    appModule.APP_SETTABLIST_MUTATE(tabList);
  }
  APP_SETCACHEROUTES_MUTATE(cacheRoutesList: RouteGlobal.RouteINF[]) {
    appModule.APP_SETCACHEROUTES_MUTATE(cacheRoutesList);
  }
  public handleCloseAll() {
    this.handleClose({
      command: "CLOSE_All"
    });
  }
  @Watch("value")
  watchCheckedTab(currVal: RouteGlobal.TabObjINF) {
    this.chooseNavTag(currVal);
  }
  /**methods */
  isCloseFunc(
    item: RouteGlobal.TabObjINF,
    its: { type: DropdownType; title: string },
    index: number
  ): boolean {
    switch (its.type) {
      case "CLOSE_CURRENT":
        return !item.notClosed;
      case "CLOSE_RIGHT":
        return this.tabNavList.slice(index + 1).some(v => !v.notClosed);
      case "CLOSE_LEFT":
        return this.tabNavList.slice(0, index).some(v => !v.notClosed);
      case "CLOSE_OTHER":
        return this.tabNavList.some((v, i) =>
          i === index ? false : !v.notClosed
        );
      case "CLOSE_All":
        return this.tabNavList.some(v => !v.notClosed);
      default:
        return true;
    }
  }
  // 关闭标签页
  handleClose({
    item,
    command,
    index
  }: {
    item?: RouteGlobal.TabObjINF;
    command: DropdownType;
    index?: number;
  }) {
    switch (command) {
      case "CLOSE_CURRENT":
        closeCurrentTab({
          vm: this,
          items: item as RouteGlobal.TabObjINF,
          index: index as number,
          routeName: this.$route.name as string
        });
        return;
      case "CLOSE_RIGHT":
        closeRightTab({
          vm: this,
          items: item as RouteGlobal.TabObjINF,
          index: index as number,
          routeName: this.$route.name as string
        });
        return;
      case "CLOSE_LEFT":
        closeLeftTab({
          vm: this,
          items: item as RouteGlobal.TabObjINF,
          index: index as number,
          routeName: this.$route.name as string
        });
        return;
      case "CLOSE_OTHER":
        closeOtherTab({
          vm: this,
          items: item as RouteGlobal.TabObjINF,
          index: index as number,
          routeName: this.$route.name as string
        });
        return;
      case "CLOSE_All":
        closeAllTab({
          vm: this,
          routeName: this.$route.name as string
        });
        return;
    }
  }
  handleRouter() {}
  // 滚轮事件(禁止触发原生事件，mac上左滑会返回上一页)
  handleScroll(e: WheelEvent) {
    const type = e.type;
    let detail = 0;
    if (type === "DOMMouseScroll" || type === "mousewheel") {
      if (e.detail) {
        detail = e.deltaX ? e.deltaX : e.deltaY || e.detail;
      } else {
        detail = -(e.detail || 0) * 40;
      }
    }
    this.scrollFunc(detail);
  }
  // 滚动距离
  scrollFunc(offset: number) {
    const wrapWidth = this.$refs.scrollWrap.offsetWidth;
    const containerWidth = this.$refs.scrollContainer.offsetWidth;
    if (offset > 0) {
      // 往左偏移
      this.diverge = Math.min(0, this.diverge + offset); // 内容在右边的时候往左偏移累加偏移量
    } else {
      if (wrapWidth < containerWidth) {
        // 内容超出容器宽度
        if (this.diverge < wrapWidth - containerWidth) {
          // 在最左边的时候
          // this.diverge = this.diverge; // 不偏移
        } else {
          this.diverge = Math.max(
            this.diverge + offset,
            wrapWidth - containerWidth
          ); // 当到达最右边的时候取祖级容器和父级容器的差值
        }
      } else {
        this.diverge = 0; // 没有超出容器不偏移
      }
    }
  }
  // 选中之后根据位置进行偏移
  chooseToMoveFunc(ele: HTMLElement) {
    const wrapWidth = this.$refs.scrollWrap.offsetWidth;
    const containerWidth = this.$refs.scrollContainer.offsetWidth;
    const tagOffsetLeft = ele.offsetLeft;
    const tagWidth = ele.offsetWidth;
    if (wrapWidth > containerWidth) {
      // 内容没有超出容器宽度
      this.diverge = 0; // 不偏移
    } else if (tagOffsetLeft < -this.diverge) {
      // 偏移是负的绝对值大于标签offsetLeft即在可视区左边
      if (wrapWidth > tagOffsetLeft + tagWidth) {
        // 左边距小于容器
        this.diverge = 0;
      } else {
        this.diverge = -(tagOffsetLeft + tagWidth - wrapWidth);
      }
    } else if (tagOffsetLeft + tagWidth > wrapWidth - this.diverge) {
      // 偏移的距离加上容器的宽度小于offsetLeft即在可视区右边
      this.diverge = -(tagOffsetLeft + tagWidth - wrapWidth);
    }
  }
  // 选中的标签页
  chooseNavTag(item: RouteGlobal.TabObjINF) {
    if (item.name) {
      this.$nextTick(() => {
        const tabNavRef = this.$refs.tabNavRef;
        const index = this.tabNavList.findIndex(v => v.key === item.key);
        if (!~index) {
          return;
        }
        const ele = tabNavRef[index].$el as HTMLElement;
        this.chooseToMoveFunc(ele);
      });
    }
  }
  handleClick(item: RouteGlobal.TabObjINF) {
    const { name, query, params } = item;
    this.$routerPush({ name, query, params });
  }
  handleCommand(
    item: RouteGlobal.TabObjINF,
    menuOption: MenuOptionINF,
    index: number
  ) {
    const command: DropdownType = menuOption.key as DropdownType;
    if (command === "REFRESH") {
      this.$routerReplace({
        name: item.name,
        refresh: true,
        query: item.query || {},
        params: item.params || {}
      });
      return;
    }
    this.handleClose({ item, command, index });
  }
}
</script>
<style lang="stylus" scoped>
.tab-nav
  position relative
  box-sizing border-box
  border-top 1px solid #f0f0f0
  border-bottom 1px solid #f0f0f0
  padding 0
  height 40px
  background #F0F0F0
  .el-dropdown
    width 100%
    height 100%
  .btn
    position absolute
    background-color #ffffff
    top 0
    height 100%
    cursor pointer
    &.close-btn
      right 0
      width 32px
      .close-link
        width 100%
        height 100%
        transition color 0.2s ease-in-out
        &:hover
          color $brand
    &.left-btn
      left 0
    &.right-btn
      right 32px
  .main
    // > .btn
    //   padding 0 6px
    .wrap
      position absolute
      left 32px
      right 64px
      top 0
      bottom 0
      overflow hidden
      box-shadow 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset
      .container
        position absolute
        height 100%
        box-sizing border-box
        padding 2px 0 2px 8px
        overflow visible
        transition transform 0.3s ease-out
        .tab-nav-anim
          transition all 0.5s
          margin-right 8px
</style>
