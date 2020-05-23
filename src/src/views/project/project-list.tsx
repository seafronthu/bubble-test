/** 项目列表 **/
import { Component, Vue } from "vue-property-decorator";
import { randomColor } from "@libs/tools";
import "./index.styl";
interface ProjectValue {
  id: number;
  name: string;
  type: string;
  description: string;
}
const lists: ProjectValue[] = [...Array(30)].map((item, index) => {
  const inx = index + 1;
  return {
    id: inx,
    name: `project ${inx}`,
    type: "WEB",
    description: "This is the description"
  };
});
@Component
export default class ProjectList extends Vue {
  /** data **/
  lists = lists;
  spinning = false;
  teamVisible = false;
  /** prop **/
  /** computed **/
  get bgcolors() {
    return this.lists.map(() => ({
      backgroundColor: randomColor()
    }));
  }
  /** watch **/
  /** methods **/
  handleEdit(value: ProjectValue) {
    console.log(value);
  }
  handleRouter(value: ProjectValue) {
    console.log(value);
  }
  headerRender() {
    return (
      <a-form>
        <a-row gutter={24}>
          <a-col md={5} sm={24}>
            <a-form-item>
              <a-input placeholder="请输入项目名称" />
            </a-form-item>
          </a-col>
          <a-col md={8} sm={24}>
            <a-form-item>
              <a-button type="primary">查询</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    );
  }
  defaultRender() {
    const { handleRouter, lists, handleEdit, bgcolors } = this;
    return (
      <a-card bordered={false}>
        <a-row type="flex" gutter={24}>
          {lists.map((items, index) => {
            return (
              <a-col
                xxl={4}
                lg={6}
                md={8}
                sm={12}
                xs={24}
                style="padding: 12px;"
                key={index}
              >
                <a-card hoverable class="text-center">
                  <div onClick={() => handleRouter(items)}>
                    <a-avatar style={bgcolors[index]} size={100}>
                      {items.type}
                    </a-avatar>
                    <a-card-meta
                      class="project-list-name"
                      title={items.name}
                    ></a-card-meta>
                  </div>
                  <template class="ant-card-actions" slot="actions">
                    <a-icon
                      type="team"
                      onClick={() => (this.teamVisible = true)}
                    />
                    <a-icon
                      type="edit"
                      onClick={() =>
                        handleEdit({
                          id: index,
                          name: "Card title",
                          type: "WEB",
                          description: "This is the description"
                        })
                      }
                    />
                    <a-icon type="ellipsis" />
                  </template>
                </a-card>
              </a-col>
            );
          })}
        </a-row>
      </a-card>
    );
  }
  /** lifecle **/
  /** render **/
  render() {
    const { spinning, defaultRender, headerRender } = this;
    const attributes = {
      props: {
        full: true,
        spinning,
        padding: true,
        "scroll-background-color": "white"
      },
      scopedSlots: {
        default: () => defaultRender(),
        header: () => headerRender()
      },
      class: "project-list"
    };
    return <container-fluid {...attributes}></container-fluid>;
  }
}
