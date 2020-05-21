<!-- 移动端适配菜单栏 -->
<template>
  <a-drawer
    wrapClassName="layout-drawer"
    :placement="position"
    :closable="false"
    @close="handleClose"
    :visible="visible"
    :bodyStyle="{ padding: 0 }"
  >
    <Logo />
    <Menu theme="dark" @trigger-click="handleClose" />
  </a-drawer>
</template>

<script lang="ts">
import Logo from "../logo";
import Menu from "../menu";
import { Component, Vue, Prop, Model } from "vue-property-decorator";
@Component({
  components: {
    Logo,
    Menu
  }
})
export default class Drawer extends Vue {
  @Model("trigger-close", {
    type: Boolean,
    default: false
  })
  visible!: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  closable!: boolean;
  @Prop({
    type: String,
    default: "right",
    validator: function(value) {
      return ["top", "right", "bottom", "left"].includes(value);
    }
  })
  position!: "top" | "right" | "bottom" | "left";
  handleClose() {
    this.$emit("trigger-close", false);
  }
}
</script>
<style lang="stylus">
.layout-drawer
  .ant-drawer-content
    background-color $brand-color
</style>
