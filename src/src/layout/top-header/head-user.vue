<!-- 头像 -->
<template>
  <a-dropdown class="head-img">
    <div class="flex-row-start-center pointer padding-0-10 hover-bgcolor-white">
      <a-avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        size="large"
        style="background-color: #ffffff;"
        alt="胡"
      />
      <span class="color-white padding-left-5">胡哥</span>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a class="hover-color-primary" href="javascript:;"
            ><a-icon type="user" /><span class="padding-left-5"
              >个人中心</span
            ></a
          >
        </a-menu-item>
        <a-menu-item>
          <a class="hover-color-primary" href="javascript:;">2nd menu item</a>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <a class="hover-color-primary" href="javascript:;"
            ><a-icon type="logout" /><span class="padding-left-5"
              >退出登录</span
            ></a
          >
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class HeadUser extends Vue {}
</script>
<style lang="stylus"></style>
