<!-- 标签按钮 -->
<template>
  <div class="tag-button" :style="{ height: height }">
    <a-dropdown :trigger="trigger">
      <a-tag
        class="flex-row-start-center not-select"
        :closable="closable"
        :style="stylesMerge"
        :color="tagColor"
        @close="handleClose"
        @click="handleTagClick"
      >
        <icon-font
          v-if="dot"
          type="dot"
          :style="{ color: color, fontSize: '24px' }"
        ></icon-font>
        <slot></slot>
        <!-- <a-icon type="close-circle" /> -->
      </a-tag>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <slot name="menu"></slot>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { VNode } from "vue";
export interface MenuOptionINF {
  item: VNode;
  key: string;
  keyPath: string[];
}
@Component
export default class TagButton extends Vue {
  colorType = {
    success: "#52c41a",
    primary: "#1890ff",
    info: "#2db7f5",
    warning: "#faad14",
    danger: "#f5222d",
    default: ""
  };
  @Prop({
    type: Array,
    default() {
      return ["hover"];
    }
  })
  trigger?: ("hover" | "click" | "contextmenu")[];
  @Prop({
    type: Boolean
  })
  closable?: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  dot?: boolean;
  @Prop({ type: String }) color?: string;
  @Prop({ type: String }) size?: string;
  @Prop({ type: String, default: "default" })
  type!: "default" | "success" | "primary" | "warning" | "danger" | "info";
  @Prop({
    type: String
  })
  height?: string;
  get stylesMerge() {
    const { height } = this;
    let wrapStyles = {};
    if (height) {
      wrapStyles = {
        lineHeight: "normal",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        alignItem: "center",
        fontWeight: "bold",
        height
      };
    }
    return {
      color: this.color,
      fontSize: this.size,
      marginRight: 0,
      ...wrapStyles
    };
  }
  get tagColor() {
    return this.colorType[this.type];
  }
  handleClose(e: Event) {
    e.preventDefault();
    this.$emit("trigger-close", e);
  }
  handleTagClick(e: Event) {
    this.$emit("trigger-tag-click", e);
  }
  handleMenuClick(options: MenuOptionINF) {
    this.$emit("trigger-menu-click", options);
  }
}
</script>
<style lang="stylus" scoped>
.dot
  padding-right 10px
  color #eeeeee
  font-size 25px
</style>
