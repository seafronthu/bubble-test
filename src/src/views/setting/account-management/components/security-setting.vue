<!-- 安全设置 -->
<template>
  <a-card :bordered="false" class="security-setting">
    <h4 class="size-20">安全设置</h4>
    <a-list itemLayout="horizontal" :dataSource="list">
      <template #renderItem="item">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <a href="javascript: void 0;">{{ item.title }}</a>
            </template>
            <template #description>
              <span class="security-list-description">{{
                item.description
              }}</span>
              <span v-if="item.value">：</span>
              <span class="security-list-value">{{ item.value }}</span>
            </template>
          </a-list-item-meta>
          <template #actions>
            <a
              v-if="item.action"
              href="javascript: void 0;"
              @click="handleModify(item.action)"
              >修改</a
            >
          </template>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
interface ListINF {
  title: string;
  description: string;
  value?: string;
  action?: string;
}
@Component
export default class SecuritySetting extends Vue {
  list: ListINF[] = [];
  /** methods */
  getDataList() {
    this.list = [
      {
        title: "账号",
        description: "当前账号",
        value: "huge"
      },
      {
        title: "账户密码",
        description: "当前密码强度",
        value: "强",
        action: "password"
      },
      {
        title: "绑定手机号",
        description: "已绑定手机",
        value: "188****7875",
        action: "phone"
      }
    ];
  }
  /** methods */
  handleModify() {}
  /** lifecle */
  created() {
    this.getDataList();
  }
}
</script>
<style lang="stylus" scoped></style>
