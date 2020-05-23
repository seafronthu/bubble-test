/** 镜像列表 **/
import { Component, Vue } from "vue-property-decorator";
import { imageListColumn } from "./tables";
// import { Moment } from "moment";
interface SearchFormINF {
  name: string;
  date: string[];
}
@Component
export default class ImageList extends Vue {
  /** data **/
  spinning = false;
  searchForm: SearchFormINF = {
    name: "g",
    date: ["", ""]
  };
  tableData = Array(60)
    .fill({
      id: "镜像ID",
      name: "镜像源名字",
      repository: "镜像源",
      tag: "镜像的标签",
      description: "镜像描述",
      official: "是否为官方发布",
      stars: "类似github的star，表示点赞或喜欢",
      automated: "是否为自动构建",
      created: "镜像创建时间",
      size: "镜像大小"
    })
    .map((v, i) => ({ ...v, key: i, index: i + 1 }));

  columns = imageListColumn;
  /** prop **/
  /** computed **/
  /** watch **/
  /** methods **/
  handleChangeInput(e: Event) {
    this.searchForm = {
      ...this.searchForm,
      name: (e.target as HTMLInputElement).value
    };
  }
  handleChangeDate(date: string[], dateString: string) {
    console.log(date, dateString);
    this.searchForm = {
      ...this.searchForm,
      date
    };
  }
  handleSearch() {
    console.log(this.searchForm);
  }
  headerRender() {
    const {
      // searchForm,
      handleChangeDate,
      handleChangeInput,
      handleSearch
    } = this;
    const colAttributes = {
      props: {
        xs: { span: 23, offset: 1 },
        sm: { span: 8, offset: 1 },
        md: { span: 6, offset: 1 },
        lg: { span: 5, offset: 1 },
        xl: { span: 5, offset: 1 }
      }
    };
    const dateColAttributes = {
      props: {
        xs: { span: 23, offset: 1 },
        sm: { span: 14, offset: 1 },
        md: { span: 10, offset: 1 },
        lg: { span: 10, offset: 1 },
        xl: { span: 10, offset: 1 },
        xxl: { span: 5, offset: 1 }
      }
    };
    const searchColAttributes = {
      props: {
        xs: { span: 23, offset: 1 },
        sm: { span: 5, offset: 1 }
      }
    };
    return (
      <a-form-model ref="form" class="form" size="medium">
        <a-row>
          <a-col {...colAttributes}>
            <a-form-model-item>
              <a-input
                class="input"
                placeholder="请输入搜索内容"
                // value={searchForm.name}
                onInput={handleChangeInput}
              >
                <template slot="prefix">
                  <a-icon type="search" />
                </template>
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col {...dateColAttributes}>
            <a-form-model-item>
              <a-range-picker
                // value={searchForm.date}
                valueFormat="YYYY-MM-DD HH:mm"
                format="YYYY-MM-DD HH:mm"
                onChange={handleChangeDate}
              />
            </a-form-model-item>
          </a-col>
          <a-col {...searchColAttributes}>
            <a-form-model-item>
              <a-button type="primary" onClick={handleSearch}>
                搜索
              </a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    );
  }
  defaultRender() {
    const { tableData, columns } = this;
    const tableAttrs = {
      props: {
        dataSource: tableData,
        columns,
        pagination: { pageSize: 20 }
      },
      style: "width: 100%",
      scopedSlots: {
        official: props => {
          return <a-radio checked={!!Math.round(Math.random() * 1)}></a-radio>;
        },
        automated: props => {
          return <a-radio checked={!!Math.round(Math.random() * 1)}></a-radio>;
        }
      }
    };
    return (
      <div class="padding-0-20">
        <a-table {...tableAttrs}></a-table>
      </div>
    );
  }
  /** lifecle **/
  /** render **/
  render() {
    const { spinning, defaultRender, headerRender } = this;
    const attributes = {
      props: {
        padding: true,
        spinning
      },
      class: "bgcolor-white",
      scopedSlots: {
        default: () => defaultRender(),
        header: () => headerRender()
      }
    };
    return <container-fluid {...attributes}></container-fluid>;
  }
}
