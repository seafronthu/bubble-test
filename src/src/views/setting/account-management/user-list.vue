<!-- 个人信息 -->
<template>
  <container-fluid
    class="bgcolor-white user-list"
    padding
    full
    :loading="loading"
  >
    <template #header>
      <a-form ref="form" class="form" :model="searchForm" size="medium">
        <a-row>
          <a-col v-bind="col">
            <a-form-item>
              <a-input
                class="input"
                placeholder="请输入搜索内容"
                v-model="searchForm.name"
              >
                <template #prefix>
                  <a-icon type="search" />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col v-bind="dateCol">
            <a-form-item>
              <a-range-picker @change="handleChangeDate" />
            </a-form-item>
          </a-col>
          <a-col v-bind="searchCol">
            <a-form-item>
              <a-button type="primary">搜索</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </template>
    <div class="padding-0-20">
      <a-table
        :dataSource="tableData"
        :columns="columns"
        :pagination="{ pageSize: 20 }"
        style="width: 100%"
      ></a-table>
    </div>
  </container-fluid>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { personalInformationColumn } from "@/views/setting/tables";
interface SearchFormINF {
  name: string;
  date: string;
}
@Component
export default class UserList extends Vue {
  loading = true; // 容器加载中
  searchForm: SearchFormINF = {
    name: "",
    date: ""
  };
  col = {
    xs: { span: 23, offset: 1 },
    sm: { span: 8, offset: 1 },
    md: { span: 6, offset: 1 },
    lg: { span: 5, offset: 1 },
    xl: { span: 5, offset: 1 }
  };
  dateCol = {
    xs: { span: 23, offset: 1 },
    sm: { span: 10, offset: 1 },
    md: { span: 10, offset: 1 },
    lg: { span: 8, offset: 1 },
    xl: { span: 6, offset: 1 },
    xxl: { span: 5, offset: 1 }
  };
  searchCol = {
    xs: { span: 23, offset: 1 },
    sm: { span: 5, offset: 1 }
  };
  tableData = Array(60)
    .fill({
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路1518弄"
    })
    .map((v, i) => ({ ...v, key: i, index: i + 1 }));
  columns = personalInformationColumn;
  // methods
  handleChangeDate() {}
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
</script>
<style lang="stylus" scoped>
.user-list
  .form
    padding-top 10px
    .input
      max-width 350px
</style>
