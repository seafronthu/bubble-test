/** 图标 */

import { Component, Vue, Prop } from "vue-property-decorator";
import "./icon-font.styl";
@Component
export default class IconFont extends Vue {
  @Prop({
    type: String || Array
  })
  classes?: string | string[];
  @Prop({
    type: String
  })
  type?: string;
  @Prop({
    type: Number
  })
  rotate?: number;
  @Prop({
    type: Boolean
  })
  spin?: boolean;
  get containerParams() {
    const { type } = this;
    return {
      attrs: {
        "aria-label": `icon: ${type}`
      }
    };
  }
  get svgParams() {
    const { spin, rotate, type } = this;
    return {
      class: spin ? "hhf-icon-font-rotate" : "",
      style: {
        transform: `rotate(${rotate}deg)`
      },
      attrs: {
        // viewBox: "0 0 1024 1024",
        "data-icon": type,
        width: "1em",
        height: "1em",
        fill: "currentColor",
        focusable: "false",
        "aria-hidden": "true"
      }
    };
  }
  get useParams() {
    const { type } = this;
    return {
      attrs: {
        "xlink:href": `#hhf-icon-${type}`
      }
    };
  }
  render() {
    const { useParams, svgParams, containerParams } = this;
    return (
      <i class="hhf-icon-font" {...containerParams}>
        <svg {...svgParams}>
          <use {...useParams} />
        </svg>
      </i>
    );
  }
}
