<!-- 顶部头 -->
<template>
  <div class="top-header flex-row-between-center">
    <Logo v-if="!lessThan768" />
    <!-- 占位 -->
    <div v-else></div>
    <div class="flex-row-end-stretch">
      <FullScreen />
      <ErrorStore v-if="navList.includes('ErrorLog')" />
      <HeadMessage />
      <HeadUser />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeadUser from "./head-user.vue";
import ErrorStore from "./error-store.vue";
import FullScreen from "./full-screen.vue";
import HeadMessage from "./head-message.vue";
import Logo from "../logo";
import { appModule } from "@stores/index";
@Component({
  components: {
    Logo,
    HeadUser,
    ErrorStore,
    FullScreen,
    HeadMessage
  }
})
export default class TopHeader extends Vue {
  get authRoutesList() {
    return appModule.authRoutesList;
  }
  get lessThan768() {
    return appModule.lessThan768;
  }
  get navList() {
    return this.authRoutesList
      .filter(v => {
        return v.meta && v.meta.showNav;
      })
      .map(v => v.name);
  }
  /**lifecle */
  mounted() {}
}
</script>
<style lang="stylus">
.top-header
  height 100%
  padding 0 15px
  background-color #002040
</style>
