<!-- logo -->
<template>
  <div class="logo">
    <div class="logo-content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class extends Vue {}
</script>
<style lang="stylus" scoped>
.logo
  width 256px
  height 45px
  padding 5px 10px
  .logo-content
    height 100%
    background rgba(255, 255, 255, 0.2)
</style>
