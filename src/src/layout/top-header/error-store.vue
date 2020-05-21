<!-- 错误存储 -->
<template>
  <a-tooltip
    placement="bottom"
    @mouseenter="show = true"
    @mouseleave="show = false"
    :visible="show"
    title="错误日志"
    arrowPointAtCenter
  >
    <div
      class="error-store pointer flex-row-center padding-0-15 hover-bgcolor-white pointer"
      @click="handleRouter"
    >
      <a-badge dot>
        <a-icon type="bug" class="color-white size-25" theme="filled" />
      </a-badge>
    </div>
  </a-tooltip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ErrorStore extends Vue {
  show = false;
  /** methods */
  handleRouter() {
    this.$routerPush({ name: "ErrorLog" });
  }
}
</script>
<style lang="stylus" scoped></style>
