import MyChart from "./my-chart";
import MyCreateView from "./my-create-view";
import Mixin from "./mixin";
import { VueConstructor } from "vue";
import { viewComponents } from "./core";
// import MyAnnotation from "./my-annotation";
// import MyArea from "./my-area";
// import MyAxis from "./my-axis";
// import MyCoordinate from "./my-coordinate";
// import MyLegend from "./my-legend";
// import MyLine from "./my-line";
// import MyScale from "./my-scale";
// import MyTooltip from "./my-tooltip";
// import MyInterval from "./my-interval";
const components: { [key: string]: typeof Mixin } = {};
viewComponents.forEach(v => {
  const my = `my-${v}`;
  components[my] = Mixin;
});
export default function install(vm: VueConstructor) {
  vm.component("my-chart", MyChart);
  vm.component("my-create-view", MyCreateView);

  // vm.component("my-annotation", MyAnnotation);
  // vm.component("my-area", MyArea);
  // vm.component("my-axis", MyAxis);
  // vm.component("my-coordinate", MyCoordinate);
  // vm.component("my-legend", MyLegend);
  // vm.component("my-line", MyLine);
  // vm.component("my-scale", MyScale);
  // vm.component("my-tooltip", MyTooltip);
  // vm.component("my-interval", MyInterval);
  Object.keys(components).forEach(v => {
    vm.component(v, components[v]);
  });
}
