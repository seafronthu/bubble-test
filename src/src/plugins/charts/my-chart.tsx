/** 注释 **/
// interface ChartOptions{

// }
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import { Chart, ChartProps } from "@antv/g2";
import {
  clearUndefined,
  chainFunc,
  paramsTurnArray,
  CHART_SYMBOL,
  CREATE_VIEW_SYMBOL
} from "./core";
// import { ChartCfg } from "@antv/g2/lib/interface";

@Component
export default class MyChart extends Vue {
  /** data **/
  chart: any | undefined;
  $refs!: {
    container: HTMLDivElement;
  };
  @Provide(CHART_SYMBOL)
  chartOptions: GLOBAL.MapINF<any> = {};
  @Provide(CREATE_VIEW_SYMBOL)
  viewOptions: GLOBAL.MapINF<any> = {};
  // chartOptions =
  /** prop **/
  // @Prop({
  //   type: Array,
  //   default: () => []
  // })
  // data!: any[]; // 数据
  // @Prop({
  //   type: Boolean,
  //   default: false
  // })
  // autoFit!: boolean; // 是否自适应 DOM 容器宽高，默认为 false，需要用户手动指定宽高
  // @Prop({
  //   type: Number
  // })
  // height?: number; // 图表高度
  // @Prop({
  //   type: Number
  // })
  // width?: number; // 图表宽度
  // @Prop({
  //   type: [String, Number, String]
  // })
  // padding?: number | number[] | "auto"; // view 的 padding 大小
  @Prop({
    type: Array
  })
  data!: any;
  @Prop({
    type: Function
  })
  chartMehod?: (p: any) => void;
  // @Prop({
  //   type: Function,
  //   default: (chart: Chart) => {}
  // })
  // chart!: (chart: Chart) => void; // view 的 padding 大小
  /** computed **/
  /** computed **/
  get allAttrs() {
    return clearUndefined({
      ...this.$attrs
    });
  }
  /** watch **/
  /** methods **/
  init(isUpdate: boolean) {
    // chartOptions = {
    // createView: [
    // {
    // options: {[key: string]: any} | any[],
    // area: [{
    //     options: {[key: string]: any} | any[],
    //     color: any[] | string | object | boolean | number
    //   }],
    // line: [{
    //     options: {[key: string]: any} | any[],
    //     color: any[] | string | object | boolean | number
    //   }]
    // }
    // ],
    //   area: [{
    //     options: {[key: string]: any} | any[],
    //     color: any[] | string | object | boolean | number
    //   }]
    // }
    const container = this.$el;
    const { data, chartOptions } = this;
    if (isUpdate && this.chart) {
      this.chart.changeData(data);
      return;
    }
    const chartCfg: ChartProps = {
      ...this.allAttrs,
      height: this.allAttrs.height,
      container: container as HTMLDivElement
    };
    this.chart = new Chart(chartCfg);
    if (data.length > 0) {
      this.chart.data(data);
    }
    let views: any[] = [];
    // chart的画图
    Object.keys(chartOptions).forEach(key => {
      if (key === "createView") {
        views = chartOptions[key];
        return;
      }
      // 例：area层
      chartOptions[key].forEach((v: GLOBAL.MapINF<any>) => {
        //  当options为数组的时候即代表传入多个参数
        const currChartFinished = this.chart[key].apply(
          null,
          paramsTurnArray(v.options)
        );
        chainFunc(currChartFinished, v);
      });
    });
    // 对每个view的画图
    views.forEach(items => {
      // 创建一个view
      const currView = this.chart.createView.apply(
        null,
        paramsTurnArray(items.options)
      );
      currView.data(items.data);
      // 例：area层
      Object.keys(items).forEach(key => {
        if (key === "options" || key === "data") {
          return;
        }
        // 例：对area层的数组进行循环
        items[key].forEach((ite: { options: any }) => {
          // 对当前area添加参数
          const sonView = currView[key].apply(
            null,
            paramsTurnArray(ite.options)
          );
          // 对当前area添加原型链方法
          chainFunc(sonView, ite);
        });
      });
    });
    this.chart.render();
    this.chartMehod && this.chartMehod(this.chart);
  }
  /** lifecle **/
  created() {}
  mounted() {
    // 需要延迟，否则宽度会计算错误
    setTimeout(() => {
      this.init(false);
      // 主动触发resize
      const e = document.createEvent("Event");
      e.initEvent("resize", true, true);
      window.dispatchEvent(e);
    }, 50);
  }
  updated() {
    this.init(true);
  }
  /** render **/
  render() {
    const def = this.$scopedSlots.default && this.$scopedSlots.default({});
    return <div>{def}</div>;
  }
}
