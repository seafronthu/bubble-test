/** 消息 **/
import { Component, Vue } from "vue-property-decorator";
import NotificationTable from "./components/notification-table";
@Component
export default class MessageCenter extends Vue {
  /** data **/
  types = ["1", "2", "3"];
  activeKey = "1";
  /** prop **/
  /** computed **/
  /** watch **/
  /** methods **/
  handleTabChange(key: string) {
    this.activeKey = key;
  }
  /** lifecle **/
  created() {
    const { type } = this.$route.query;
    this.activeKey = ((type as string | undefined) || "1").toString();
  }
  /** render **/
  render() {
    const { types, activeKey } = this;
    return (
      <container-fluid padding>
        <a-tabs
          class="bgcolor-white padding-10"
          activeKey={activeKey}
          onChange={this.handleTabChange.bind(this)}
        >
          <a-tab-pane tab="Tab 1" key={types[0]}>
            <NotificationTable />
          </a-tab-pane>
          <a-tab-pane tab="Tab 2" key={types[1]}>
            <NotificationTable />
          </a-tab-pane>
          <a-tab-pane tab="Tab 3" key={types[2]}>
            <NotificationTable />
          </a-tab-pane>
        </a-tabs>
      </container-fluid>
    );
  }
}
