<!-- 个人信息 -->
<template>
  <container-fluid class="personal-information" padding :loading="loading">
    <div class="personal-information-container bgcolor-white">
      <a-row type="flex" justify="start">
        <a-col v-bind="leftCol">
          <a-menu :mode="mode" class="height-full" v-model="selectedKeys">
            <a-menu-item key="1">
              <span>基础信息</span>
            </a-menu-item>
            <a-menu-item key="2">
              <span>安全设置</span>
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col v-bind="rightCol">
          <transition-group name="personal-information-fade">
            <div key="1" v-show="selectedKeys.includes('1')">
              <BasicInfo />
            </div>
            <div key="2" v-show="selectedKeys.includes('2')">
              <SecuritySetting />
            </div>
          </transition-group>
        </a-col>
      </a-row>
    </div>
  </container-fluid>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BasicInfo from "./components/basic-info.vue";
import SecuritySetting from "./components/security-setting.vue";
import { appModule } from "@stores/index";
@Component({
  components: {
    BasicInfo,
    SecuritySetting
  }
})
export default class PersonalCenter extends Vue {
  loading = true; // 容器加载中
  selectedKeys: string[] = ["1"];
  leftCol = {
    xs: 24,
    sm: 6,
    lg: 4
  };
  rightCol = {
    xs: 24,
    sm: 18,
    lg: 18
  };
  get mode() {
    return appModule.lessThan576 ? "horizontal" : "inline";
  }
  /** methods */
  // handleSelect({
  //   item,
  //   key,
  //   selectedKeys
  // }: {
  //   item: Vue;
  //   key: string;
  //   selectedKeys: string[];
  // }) {
  //   console.log(item, key, selectedKeys);
  // }
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
</script>
<style lang="stylus" scoped>
.personal-information
  .personal-information-container
    padding 24px 0
  .personal-information-left-mode
    box-sizing border-box
    width 224px
    align-self stretch
  .personal-information-fade-enter-active
    transition all .5s
  .personal-information-fade-leave-active
    display none
  .personal-information-fade-enter
    opacity 0
</style>
