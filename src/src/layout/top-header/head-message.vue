<!-- 消息栏 -->
<template>
  <a-popover
    overlayClassName="head-message"
    placement="bottomRight"
    v-model="visible"
    trigger="click"
    @visibleChange="handleChange"
  >
    <div class="pointer flex-row-center padding-0-15 hover-bgcolor-white">
      <a-badge :count="100" :overflowCount="99">
        <a-icon type="message" class="size-25 color-white" />
      </a-badge>
    </div>
    <template #content>
      <a-spin :spinning="loading">
        <a-tabs class="head-message-tab">
          <a-tab-pane class="head-message-tab-pane" :key="types[0]">
            <template #tab>
              <a-badge :count="1000" :overflowCount="99" :offset="[20, 0]">
                <span class="head-message-notification">通知</span>
              </a-badge>
            </template>
            <a-list>
              <a-list-item v-for="(item, index) of list.notice" :key="index">
                <a-list-item-meta>
                  <template #avatar>
                    <a-avatar
                      style="background-color: white"
                      src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"
                    />
                  </template>
                  <template #title>
                    <a class="head-message-title" href="javascript: void 0;">
                      {{ item.title }}</a
                    >
                  </template>
                  <template #description>
                    <span>{{ item.description }}</span>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
            <div class="head-message-btn-container">
              <button class="head-message-btn hover-bgcolor-base">
                清空 通知
              </button>
              <button
                class="head-message-btn hover-bgcolor-base"
                @click="handleWatchMore(types[0])"
              >
                查看更多
              </button>
            </div>
          </a-tab-pane>
          <a-tab-pane class="head-message-tab-pane" :key="types[1]">
            <template #tab>
              <a-badge :count="12" :overflowCount="99" :offset="[20, 0]">
                <span class="head-message-notification">消息</span>
              </a-badge>
            </template>
            <a-list>
              <a-list-item v-for="(item, index) of list.message" :key="index">
                <a-list-item-meta>
                  <template #avatar>
                    <a-avatar
                      style="background-color: white"
                      src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                    />
                  </template>
                  <template #title>
                    <a class="head-message-title" href="javascript: void 0;">
                      {{ item.title }}</a
                    >
                  </template>
                  <template #description>
                    <span>{{ item.description }}</span>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
            <div class="head-message-btn-container">
              <button class="head-message-btn hover-bgcolor-base">
                清空 消息
              </button>
              <button
                class="head-message-btn hover-bgcolor-base"
                @click="handleWatchMore(types[1])"
              >
                查看更多
              </button>
            </div>
          </a-tab-pane>
          <a-tab-pane class="head-message-tab-pane" :key="types[2]">
            <template #tab>
              <a-badge :count="999" :overflowCount="99" :offset="[20, 0]">
                <span class="head-message-notification">待办</span>
              </a-badge>
            </template>
            <a-list>
              <a-list-item v-for="(item, index) of list.deal" :key="index">
                <a-list-item-meta>
                  <template #avatar>
                    <a-avatar
                      style="background-color: white"
                      src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"
                    />
                  </template>
                  <template #title>
                    <a class="head-message-title" href="javascript: void 0;">
                      {{ item.title }}</a
                    >
                  </template>
                  <template #description>
                    <span>{{ item.description }}</span>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
            <div class="head-message-btn-container">
              <button class="head-message-btn hover-bgcolor-base">
                清空 待办
              </button>
              <button
                class="head-message-btn hover-bgcolor-base"
                @click="handleWatchMore(types[2])"
              >
                查看更多
              </button>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
  </a-popover>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const list = {
  notice: [
    {
      title: "这是通知",
      description: "1分钟前"
    },
    {
      title: "这是通知",
      description: "1分钟前"
    },
    {
      title: "这是通知",
      description: "1分钟前"
    }
  ],
  message: [
    {
      title: "这是消息",
      description: "2分钟前"
    },
    {
      title: "这是消息",
      description: "2分钟前"
    },
    {
      title: "这是消息",
      description: "2分钟前"
    }
  ],
  deal: [
    {
      title: "这是待办",
      description: "3分钟前"
    },
    {
      title: "这是待办",
      description: "3分钟前"
    },
    {
      title: "这是待办",
      description: "5分钟前"
    }
  ]
};
@Component
export default class HeadMessage extends Vue {
  visible = false;
  loading = false;
  list = list;
  types = [1, 2, 3];
  /** methods */
  handleChange(visible: boolean) {
    // console.log("visible:", visible);
  }
  handleWatchMore(type: string) {
    this.visible = false;
    this.$routerPush({
      name: "MessageCenter",
      refresh: true,
      query: {
        type
      }
    });
  }
}
</script>
<style lang="stylus">
.head-message
  .head-message-tab
    width 310px
    // .ant-tabs-tab
    //   .ant-badge-count
    //     left 55%
    //     right auto
    //   padding 0
    //   .head-message-notification
    //     padding 12px 16px
  .ant-popover-inner-content
    padding 0
  .ant-tabs-bar
    padding 0 16px
  .ant-list-item
    padding 12px 16px
    transition all 0.3s
    cursor pointer
    &:hover
      background-color $hover-bgcolor
  .head-message-btn-container
    height 46px
    text-align center
    line-height @height
    border-top 1px solid #f0f0f0
    border-radius 0 0 2px 2px
    width 100%
    .head-message-btn
      display inline-block
      width 50%
      cursor pointer
      user-select none
      background none
      border none
      outline none
      &:last-of-type
        border-left 1px solid #f0f0f0
</style>
