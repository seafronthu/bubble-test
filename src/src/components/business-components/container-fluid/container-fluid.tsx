/*** 容器 ***/
import { Component, Vue, Prop } from "vue-property-decorator";
import "./container-fluid.styl";
@Component
export default class ContainerFluid extends Vue {
  $refs!: {
    container: HTMLElement;
  };
  @Prop({
    type: Boolean,
    default: false
  })
  padding!: boolean;
  @Prop({
    type: Boolean,
    default: true
  })
  full!: boolean;
  @Prop({
    type: String || Array
  })
  containerClass?: string | string[];
  @Prop({
    type: Boolean,
    default: false
  })
  loading!: boolean;
  @Prop({
    type: String,
    default: "Loading……"
  })
  message!: string;
  @Prop({
    type: String,
    default: "Loading……"
  })
  spinClassName!: string;
  @Prop({
    type: String,
    default: "large"
  })
  spinSize!: "small" | "default" | "large";
  @Prop({
    type: Boolean,
    default: false
  })
  overflowY!: boolean;
  @Prop({
    type: Boolean
  })
  scrollBackgroundColor?: string;
  height = "calc(100vh - 152px)";
  // height: string = "calc(100vh - 133px)";
  // @Watch("loading", {
  //   immediate: true
  // })
  // setLoading(currVal: boolean, oldVal: boolean) {
  //   if (currVal) {
  //     this.$nextTick(() => {
  //       this.loadingTarget = this.$loading({
  //         target: this.$refs.container,
  //         text: this.message,
  //         spinner:
  //           "hhf-iconfont hhf-icon-loading-fan loading-rotating inline-block size-30",
  //         background: "rgba(255, 255, 255, 0.6)"
  //       });
  //     });
  //     return;
  //   }
  //   if (this.loadingTarget) {
  //     this.loadingTarget.close();
  //   }
  // }
  get iconStyle() {
    switch (this.spinSize) {
      case "small":
        return {
          fontSize: "14px"
        };
      case "default":
        return {
          fontSize: "20px"
        };
      case "large":
        return {
          fontSize: "32px"
        };
      default:
        return {
          fontSize: "20px"
        };
    }
  }
  get containerStyle() {
    const { height, full } = this;
    return full
      ? {
          height
        }
      : null;
  }
  get scrollStyle() {
    return this.full
      ? {
          overflowY: "auto",
          backgroundColor: this.scrollBackgroundColor
        }
      : null;
  }
  get containerClasses() {
    const { padding, containerClass } = this;
    let classes: string[] = ["container-fluid"];
    if (padding) {
      classes.push("padding-20");
    }
    if (Array.isArray(containerClass)) {
      classes = [...classes, ...containerClass];
    } else if (typeof containerClass === "string") {
      classes.push(containerClass);
    }
    return classes;
  }
  get spinProps() {
    const { spinSize, loading, message, spinClassName } = this;
    return {
      props: {
        size: spinSize,
        tip: message,
        spinning: loading,
        wrapperClassName: spinClassName
      },
      class: "container-fluid-spin"
    };
  }
  created() {}
  render() {
    const {
      containerStyle,
      iconStyle,
      scrollStyle,
      containerClasses,
      spinProps,
      $scopedSlots
    } = this;
    const header = $scopedSlots.header && $scopedSlots.header({});
    const df = $scopedSlots.default && $scopedSlots.default({});
    //? 额外包一层是为了动画
    return (
      <div>
        <div class={containerClasses} ref="container" style={containerStyle}>
          <a-spin {...spinProps}>
            <template slot="indicator">
              <icon-font type="loading-fan" spin={true} style={iconStyle} />
            </template>
            <div class="container-fluid-main">
              {header}
              {/*!! 这里需要注意，当设置纵向滚动的时候，子容器设置了margin左右边距设置了负值会出现横向滚动条 */}
              <div class="container-fluid-scroll" style={scrollStyle}>
                {df}
              </div>
            </div>
          </a-spin>
        </div>
      </div>
    );
  }
}
