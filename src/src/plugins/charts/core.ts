import { ComponentOptions } from "vue";
// const parentCharts = ["chart", "createView"];
// const series = ["line", "area", "pie", "point", "bar", "interval"];
export const CHART_SYMBOL = Symbol("chart");
export const CREATE_VIEW_SYMBOL = Symbol("chart");
export const viewComponents = [
  "line",
  "area",
  "pie",
  "point",
  "bar",
  "interval",
  "tooltip",
  "coordinate",
  "annotation",
  "legend",
  "axis",
  "scale"
];
export interface OptionsINF extends ComponentOptions<Vue> {
  _componentTag: string;
}
function _assertThisInitialized(self: any) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}
export function splitName(name: string) {
  const suffix = name.split("-");
  let suffixName: string = suffix.slice(1).join("-");
  // 如果组件名是驼峰 则驼峰转-
  if (suffix.length === 1) {
    suffixName = suffix[0].replace(/([A-Z])/g, (p1, p2, offset) => {
      return offset === 0
        ? p1.toLocaleLowerCase()
        : `-${p1.toLocaleLowerCase()}`;
    });
    suffixName = suffixName.replace(/[a-z]-/, "");
  }
  if (!suffixName) {
    throw Error("current component is not exist");
  }
  suffixName = suffixName.replace(/-(\w)/g, (p1, p2) => {
    return p2.toUpperCase();
  });
  // -转驼峰变成function
  // suffixName = suffix[1].reduce((accumulator, currentValue) => {
  //   return (
  //     accumulator +
  //     (currentValue
  //       ? currentValue.replace(/-(\w)/g, (p1, p2) => {
  //           return p2.toUpperCase();
  //         })
  //       : "")
  //   );
  // });
  return suffixName;
}
export function getChartComponentTag(options: OptionsINF) {
  const componentTag = options._componentTag;
  return splitName(componentTag);
}
export function isParentChart(options: OptionsINF) {
  const componentTagName = getChartComponentTag(options);
  return componentTagName;
}
export function clearUndefined(options: GLOBAL.MapINF<any>) {
  const newOptions: GLOBAL.MapINF<any> = {};
  Object.keys(options).forEach(v => {
    if (options[v] !== void 0) {
      newOptions[v] = options[v] as GLOBAL.MapINF<any>;
    }
  });
  return newOptions;
}
export function paramsTurnArray(param: any): any[] {
  if (Array.isArray(param)) {
    return param;
  }
  return [param];
}
// 链式执行
export function chainFunc(target: any, obj: GLOBAL.MapINF<any>) {
  const arr = Object.keys(obj);
  const finished = arr.length - 1;
  let i = -1;
  while (i++ < finished) {
    const key = arr[i];
    if (key === "options") {
      continue;
    }
    // eslint-disable-next-line prefer-spread
    target[key](...paramsTurnArray(obj[key]));
  }
}
function _possibleConstructorReturn(self: any, call: any) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

// 兼容 Object.getPrototypeOf
let _getPrototypeOf: any = function(o: any) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o: any) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
};
// 兼容 Object.setPrototypeOf
let _setPrototypeOf: any = function(
  o: { prototype: any; __proto__: any },
  p: Function
) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o: { __proto__: any }, p: any) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
};
function _createSuper(Derived: any) {
  return function(this: any, ...arg: []) {
    const Super = _getPrototypeOf(Derived);
    let result: any = null;
    result = Super.apply(this, arg);
    return _possibleConstructorReturn(this, result);
  };
}
export function _inherits(
  subClass: { prototype: any },
  superClass: { prototype: any } | null
) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  }); // 公共属性继承
  if (superClass) _setPrototypeOf(subClass, superClass); // 完成静态属性继承
}
export const _extendsClass = function(parent: any) {
  let _super: any = null;
  function _extendsClass(this: any, ...arg: []) {
    return (_super !== null && _super.apply(this, arg)) || this;
  }
  _inherits(_extendsClass, parent);
  _super = _createSuper(_extendsClass);
  return _extendsClass;
};
