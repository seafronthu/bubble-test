<!-- 放大缩小 -->
<template>
  <a-tooltip
    placement="bottom"
    @mouseenter="show = true"
    @mouseleave="show = false"
    :visible="show"
    :title="isFull ? '退出全屏' : '全屏'"
    arrowPointAtCenter
  >
    <div
      class="full-screen pointer flex-row-center padding-0-15 hover-bgcolor-white"
      v-if="isSupportFullSceenMode"
      @click="handleFullscreen"
    >
      <a-icon
        type="fullscreen-exit"
        class="size-25 color-white"
        v-if="isFull"
      />
      <a-icon type="fullscreen" class="size-25 color-white" v-else />
    </div>
  </a-tooltip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
function isDocumentInFullScreenMode() {
  // 过去由F11触发的那种浏览器全屏模式和HTML5中内容的全屏模式是不一样的
  return !!(
    document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).mozFullScreenElement
  );
}
@Component
export default class FullScreen extends Vue {
  isFull: boolean = isDocumentInFullScreenMode();
  show = false;
  get isSupportFullSceenMode() {
    return document.fullscreenEnabled || (document as any).mozFullScreenEnabled;
  }
  handleFullscreen() {
    if (this.isFull) {
      document.exitFullscreen =
        document.exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document.documentElement as any).mozCancelFullScreen;
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen =
        document.documentElement.requestFullscreen ||
        (document.documentElement as any).webkitCancelFullScreen ||
        (document.documentElement as any).mozRequestFullScreen ||
        (document.documentElement as any).msRequestFullscreen;
      document.documentElement.requestFullscreen();
    }
  }
  handleFullscreenchange() {
    this.isFull = isDocumentInFullScreenMode();
  }
  /**lifecle */
  mounted() {
    document.addEventListener("fullscreenchange", this.handleFullscreenchange);
  }
  beforeDestroy() {
    document.removeEventListener(
      "fullscreenchange",
      this.handleFullscreenchange
    );
  }
}
</script>
<style lang="stylus" scoped></style>
