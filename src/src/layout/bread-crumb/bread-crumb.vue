<!-- 面包屑 -->
<template>
  <div class="bread-crumb">
    <a-breadcrumb>
      <a-breadcrumb-item v-if="$route.name !== 'Home'" key="default">
        <a href="javascript:void 0;" @click="handleRouter({ path: '/' })"
          ><a-icon type="home" />首页</a
        >
      </a-breadcrumb-item>
      <template>
        <a-breadcrumb-item
          v-for="(items, index) of breadcrumbList"
          :key="items.name"
        >
          <a
            href="javascript:void 0;"
            v-if="items.type === 'PAGE' && index < breadcrumbList.length - 1"
            @click="handleRouter({ name: items.name })"
          >
            <a-icon v-if="items.icon" :type="items.icon" />
            {{ items.title }}
          </a>
          <template v-else>
            <a-icon v-if="items.icon" :type="items.icon" />
            {{ items.title }}
          </template>
        </a-breadcrumb-item>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Vue, InjectReactive } from "vue-property-decorator";
import { RouteGlobal } from "@/types/route";
@Component
export default class BreadCrumb extends Vue {
  @InjectReactive("breadcrumbList")
  readonly breadcrumbList!: RouteGlobal.BreadcrumbINF[];
  // methods
  handleRouter(to: { name?: string; path?: string }) {
    // console.log(to);
    this.$routerPush(to);
  }
}
</script>
<style lang="stylus" scoped></style>
