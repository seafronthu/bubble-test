<!-- 路由祖级菜单的路由用来做keep-alive -->
<template>
  <!-- <keep-alive :include="cacheList"> -->
  <router-view></router-view>
  <!-- </keep-alive> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { appModule } from '@/stores/index';
// interface MapObjINF {
//   [key: string]: string | number | undefined | MapObjINF;
// }

@Component
export default class PageView extends Vue {}
// @Component
// export default class PageView extends Vue {
//   get tabNavList() {
//     return appModule.tabList;
//   }
//   get cacheList() {
//     return [
//       "ParentView",
//       ...(this.tabNavList.length
//         ? this.tabNavList
//             .filter(item => !(item.meta && (item.meta as MapObjINF).notCache))
//             .map(item => item.name)
//         : [])
//     ];
//   }
// }
</script>
