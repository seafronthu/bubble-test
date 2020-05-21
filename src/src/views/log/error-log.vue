<!-- 错误日志 -->

<template>
  <container-fluid class="role-list" padding full>
    <template #header>
      <!-- <div class="overflow-hidden"> -->
      <div>
        <a-row :gutter="24">
          <a-col v-bind="col">
            <a-button
              type="danger"
              @click="handleAddScript"
              class="role-list-button"
              ><a-icon type="plus" />添加script错误</a-button
            >
          </a-col>
          <a-col v-bind="col">
            <a-button
              type="danger"
              @click="handleAddAjax"
              class="role-list-button"
              ><a-icon type="plus" />添加ajax错误</a-button
            >
          </a-col>
        </a-row>
      </div>
    </template>
    <a-table
      :locale="locale"
      :columns="columns"
      :dataSource="tableData"
      @change="handleTableChange"
      class="role-list-tabl
        e"
    >
      <template #headimgTitle>
        <span class="text-nowrap"><a-icon type="smile-o" /> Headimg</span>
      </template>
      <template #headimg="url">
        <img :src="url" />
      </template>
      <template #type="text">
        <a-tag color="#f50">{{ text }}</a-tag>
      </template>
      <template #expandedRowRender="record">
        <a-table
          v-if="record.type === 'ajax'"
          :columns="innerColumns"
          :pagination="false"
          :dataSource="[record]"
        >
          <template #method="text">
            <a-tag color="blue">{{ text }}</a-tag>
          </template>
          <template #status="text">
            <a-tag color="red">{{ text }}</a-tag>
          </template>
        </a-table>
      </template>
    </a-table>
  </container-fluid>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getErrorData } from "@/api/app";
import moment from "moment";
import { appModule } from "@stores/index";
interface FieldsINF {
  id: string;
  name: string;
  description: string;
  createRoleNum: string;
  createUserNum: string;
}
const columns = [
  { title: "Number", dataIndex: "number" },
  { title: "Uid", dataIndex: "userId" },
  {
    // title: "用户头像",
    dataIndex: "headimg",
    slots: { title: "headimgTitle" },
    scopedSlots: { customRender: "headimg" }
  },
  { title: "UserName", dataIndex: "userName" },
  {
    title: "Type",
    dataIndex: "type",
    // filterMultiple: true,
    filters: [
      { text: "script", value: "script", checked: true },
      { text: "ajax", value: "ajax" }
    ],
    scopedSlots: { customRender: "type" },
    onFilter: (value: string, record: { name: string[] }) => {
      // console.log(value, record);
      return record.name.indexOf(value) === 0;
    }
  },
  { title: "Href", dataIndex: "href" },
  { title: "Name", dataIndex: "name" },
  { title: "Message", dataIndex: "message" },
  { title: "Time", dataIndex: "time" }
];
const innerColumns = [
  { title: "BaseURL", dataIndex: "baseURL" },
  { title: "Url", dataIndex: "url" },
  {
    title: "Method",
    dataIndex: "method",
    scopedSlots: { customRender: "method" }
  },
  { title: "Headers", dataIndex: "headers" },
  { title: "Data", dataIndex: "data" },
  { title: "Params", dataIndex: "params" },
  {
    title: "Status",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  },
  { title: "StatusText", dataIndex: "statusText" }
];
@Component
export default class ErrorLog extends Vue {
  col = {
    md: 8,
    sm: 10,
    lg: 5,
    xl: 4
    // xs: { span: 23 },
    // sm: { span: 8 },
    // md: { span: 6 },
    // lg: { span: 5 },
    // xl: { span: 5 }
  };
  columns = columns;
  innerColumns = innerColumns;
  locale = { filterConfirm: "确定", filterReset: "重置" };
  visible = false;
  fields: FieldsINF = {
    id: "",
    name: "",
    description: "",
    createRoleNum: "",
    createUserNum: ""
  };
  get errorLogList() {
    return appModule.errorLogList;
  }
  get tableData() {
    return this.errorLogList.map((v, i) => ({
      ...v,
      key: i,
      number: i + 1,
      time: moment(v.time).format("YYYY-MM-DD kk:mm:ss")
    }));
  }
  /** methods */
  handleAddScript() {
    (this.visible as any).a.b;
    // console.log((this.visible as any).a.b);
  }
  handleAddAjax() {
    getErrorData().then(() => {
      // console.log(res);
    });
  }
  handleAdd() {
    this.visible = true;
  }
  // handleTableChange(
  //   pagination: { current: number; pageSize: number },
  //   filters: string[],
  //   sorter: { key: string },
  //   { currentDataSource }: { currentDataSource: any[] }
  // ) {
  //   // console.log(pagination, filters, sorter, currentDataSource);
  // }
  // handleExpanded(expanded: string, record: { user: string; id: string }) {}
  // handleEdit(record: string) {
  //   // console.log(record);
  // }
}
</script>
<style lang="stylus">
.role-list
  .role-list-button
    margin-bottom 8px
  .role-list-table
    .ant-table-content
      overflow-y auto
      .ant-table-body
        min-width 800px
</style>
