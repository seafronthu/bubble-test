/** 数字趋势统计 **/
import { Component, Vue, Prop } from "vue-property-decorator";
import "./number-statistic.styl";
@Component
export default class NumberStatistic extends Vue {
  /** data **/
  /** prop **/
  @Prop({
    type: String
  })
  title?: string;
  @Prop({
    type: String
  })
  content?: string;
  /**
   * 上升up down下降趋势
   */
  @Prop({
    type: String
  })
  type?: "up" | "down";
  /** computed **/
  /** watch **/
  /** methods **/
  /** lifecle **/
  /** render **/
  render() {
    const { content, title, type } = this;
    const arrow = `arrow-${type}`;
    const ArrowCls = `number-statistic-arrow number-statistic-arrow-${type}`;
    return (
      <div class="number-statistic flex-row-start-center">
        <span class="number-statistic-title">{title}</span>
        <span class="number-statistic-content">{content}</span>
        {type ? (
          <span class={ArrowCls}>
            <a-icon type={arrow}></a-icon>
          </span>
        ) : null}
      </div>
    );
  }
}
