/** 卡片统计组件 **/
import { Component, Vue, Prop } from "vue-property-decorator";
import "./card-statistic.styl";
@Component
export default class CardStatistic extends Vue {
  /** data **/
  /** prop **/
  @Prop({
    type: Boolean,
    default: false
  })
  loading!: boolean;
  @Prop({
    type: String,
    default: ""
  })
  title!: string;
  @Prop({
    type: String
  })
  tip?: string;
  @Prop({
    type: String
  })
  total?: string;
  /** computed **/
  /** watch **/
  /** methods **/
  rightTipNode() {
    const { $scopedSlots, tip } = this;
    if ($scopedSlots.tip) {
      return $scopedSlots.tip({});
    }
    return (
      <a-tooltip title={tip}>
        <a-icon type="info-circle-o" />
      </a-tooltip>
    );
  }
  footerNode() {
    const { $scopedSlots } = this;
    return $scopedSlots.footer ? (
      <div class="card-statistic-footer">{$scopedSlots.footer({})}</div>
    ) : null;
  }
  /** lifecle **/
  /** render **/
  render() {
    const {
      loading,
      title,
      rightTipNode,
      $scopedSlots,
      total,
      footerNode
    } = this;
    const df = $scopedSlots.default && $scopedSlots.default({});
    const footer = footerNode();
    // const total = $scopedSlots.total && $scopedSlots.total({});
    const Tip = rightTipNode();
    return (
      <a-card
        loading={loading}
        class="card-statistic"
        bodyStyle={{ padding: "20px 24px 8px" }}
      >
        <div class="card-statistic-header">
          <div class="flex-row-between-center">
            <span class="card-statistic-title">{title}</span>
            {Tip}
          </div>
        </div>
        <div class="card-statistic-main flex-column-between-start">
          <div class="text-ellipsis card-statistic-total">{total}</div>
          {df}
        </div>
        {footer}
      </a-card>
    );
  }
}
