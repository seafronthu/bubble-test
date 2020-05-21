/** 坐标轴配置 **/
import { Component, Vue, Prop, Inject } from "vue-property-decorator";
import {
  clearUndefined,
  getChartComponentTag,
  viewComponents,
  OptionsINF,
  CHART_SYMBOL,
  CREATE_VIEW_SYMBOL
} from "./core";
import { ObjINF } from "@/types";
@Component
export default class Mixin extends Vue {
  /** data **/
  @Inject(CHART_SYMBOL)
  chartOptions!: GLOBAL.MapINF<any>;
  @Inject(CREATE_VIEW_SYMBOL)
  viewOptions!: GLOBAL.MapINF<any>;
  /** prop **/
  @Prop({
    type: [Object, Array, String, Boolean, Number]
  })
  value?: any;
  /** computed **/
  get allAttrs() {
    return clearUndefined({
      ...this.$attrs
    });
  }
  /** watch **/
  /** methods **/
  init() {
    const attrs = Object.keys(this.allAttrs);
    const parentComponentTagName = getChartComponentTag(
      this.$parent.$options as OptionsINF
    );
    const currentComponentTagName = getChartComponentTag(
      this.$options as OptionsINF
    );
    if (parentComponentTagName === "createView") {
      // viewOptions = {
      //   area: [{
      //     options: {[key: string]: any},
      //     color: [] | string | object
      //   }]
      // }
      // axis // 会出现多次 所以用数组标识
      let viewOptionsCurrObj: GLOBAL.MapINF<any> = {
        options: this.value
      };
      attrs.forEach(key => {
        viewOptionsCurrObj[key] = this.allAttrs[key];
      });
      if (this.viewOptions[currentComponentTagName]) {
        this.viewOptions[currentComponentTagName].push(viewOptionsCurrObj);
      } else {
        this.viewOptions[currentComponentTagName] = [viewOptionsCurrObj];
      }
    } else if (parentComponentTagName === "chart") {
      let chartOptionsCurrObj: GLOBAL.MapINF<any> = {
        options: this.value
      };
      attrs.forEach(key => {
        chartOptionsCurrObj[key] = this.allAttrs[key];
      });
      if (this.chartOptions[currentComponentTagName]) {
        this.chartOptions[currentComponentTagName].push(chartOptionsCurrObj);
      } else {
        this.chartOptions[currentComponentTagName] = [chartOptionsCurrObj];
      }
    }
  }
  /** lifecle **/
  mounted() {
    this.init();
  }
  /** render **/
  render() {
    return;
  }
}
