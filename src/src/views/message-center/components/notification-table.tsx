/** 通知表格 **/
import { Component, Vue } from "vue-property-decorator";
import { messageCenterNotificationColumns } from "../tables";
@Component
export default class NotificationTable extends Vue {
  /** data **/
  selectedRowKeys: string[] = [];
  columns = messageCenterNotificationColumns;
  dataTable = [
    {
      title: "John Brown",
      status: "1",
      time: "2016-12-12 12:00:00"
    },
    {
      title: "John Brown",
      status: "0",
      time: "2016-12-12 12:00:00"
    },
    {
      title: "John Brown",
      status: "1",
      time: "2016-12-12 12:00:00"
    },
    {
      title: "John Brown",
      status: "0",
      time: "2016-12-12 12:00:00"
    }
  ].map((v, i) => ({ ...v, key: i, index: i + 1 }));
  /** prop **/
  /** computed **/
  /** watch **/
  /** methods **/
  handleSelectChange(selectedRowKeys: string[]) {
    this.selectedRowKeys = selectedRowKeys;
  }
  handleDelete = () => {
    const that = this;
    this.$confirm({
      title: "Do you want to delete these items?",
      content:
        "When clicked the OK button, this dialog will be closed after 1 second",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        })
          .then(() => that.$message.info("删除成功"))
          .catch(() => that.$message.error("删除失败"));
      },
      onCancel() {}
    });
  };
  /** lifecle **/
  /** render **/
  render() {
    const {
      columns,
      dataTable,
      selectedRowKeys,
      handleSelectChange,
      handleDelete
    } = this;
    const rowSelection = { selectedRowKeys, onChange: handleSelectChange };
    return (
      <div>
        <ul class="list-inline">
          <li>
            <a-button type="danger" onClick={handleDelete}>
              删除
            </a-button>
          </li>
          <li>
            <a-button type="primary">标记已读</a-button>
          </li>
          <li>
            <a-button type="success">全部已读</a-button>
          </li>
        </ul>
        <div class="padding-bottom-10 color-info">
          {`Selected ${selectedRowKeys.length} items`}
        </div>
        <a-table
          columns={columns}
          dataSource={dataTable}
          rowSelection={rowSelection}
        ></a-table>
      </div>
    );
  }
}
