<!--  -->
<template>
  <container-fluid padding>
    <div class="home overflow-hidden">
      <my-chart
        :anmiate="true"
        :data="data"
        :autoFit="true"
        :height="500"
        :padding="100"
      >
        <my-legend :value="false"></my-legend>
        <my-scale
          :value="{
            value: {
              min: 10000,
              nice: true
            },
            year: {
              range: [0, 1]
            }
          }"
        ></my-scale>
        <my-area position="year*value" shape="smooth"></my-area>
        <my-line position="year*value" shape="smooth"></my-line>
        <my-create-view
          :data="[
            {
              continent: 'Americas',
              Country: 'Argentina',
              LifeExpectancy: 75.32,
              GDP: 12779.37964,
              Population: 40301927
            },
            {
              continent: 'Americas',
              Country: 'Brazil',
              LifeExpectancy: 72.39,
              GDP: 9065.800825,
              Population: 190010647
            },
            {
              continent: 'Americas',
              Country: 'Canada',
              LifeExpectancy: 80.653,
              GDP: 36319.23501,
              Population: 33390141
            },
            {
              continent: 'Americas',
              Country: 'Chile',
              LifeExpectancy: 78.553,
              GDP: 13171.63885,
              Population: 16284741
            }
          ]"
        >
          <my-axis
            :value="[
              'GDP',
              {
                position: 'top',
                line: null,
                label: { formatter: handleFormatter },
                title: {
                  style: {
                    fill: '#1890ff'
                  }
                }
              }
            ]"
          ></my-axis>
          <my-scale :value="['LifeExpectancy']"></my-scale>
          <my-legend :value="false"></my-legend>
          <my-axis
            :value="[
              'LifeExpectancy',
              {
                position: 'right',
                tickLine: null,
                grid: null,
                line: null,
                subTickLine: null
              }
            ]"
          ></my-axis>
          <my-point
            position="GDP*LifeExpectancy"
            :size="['Population', [4, 50]]"
            shape="circle"
          ></my-point>
        </my-create-view>
      </my-chart>
      <a-row :gutter="[24, 24]">
        <a-col v-bind="col">
          <card-statistic title="总访问记录" tip="go" total="￥126,560">
            <div class="flex-row-start-center">
              <number-statistic
                class="margin-right-10"
                title="周同比"
                content="12%"
                type="up"
              />
              <number-statistic title="日同比" content="12.3%" type="down" />
            </div>
            <template #footer>
              <div class="text-ellipsis">日均访问量：<span>3000</span></div>
            </template>
          </card-statistic>
        </a-col>
        <a-col v-bind="col">
          <card-statistic title="总访问记录" tip="go" total="￥126,560">
            <div class="width-full">
              <my-chart
                :data="
                  data.map(v => ({
                    ...v,
                    value: (v.value / (Math.random() * 100)) | 0
                  }))
                "
                :autoFit="true"
                :padding="10"
                :height="60"
              >
                <my-axis :value="false"></my-axis>
                <my-area position="year*value" shape="smooth"></my-area>
              </my-chart>
            </div>
            <template #footer>
              <div class="text-ellipsis">日均访问量：<span>3000</span></div>
            </template>
          </card-statistic>
        </a-col>
        <a-col v-bind="col">
          <card-statistic title="总访问记录" tip="go" total="￥126,560">
            <div class="width-full">
              <my-chart
                :data="
                  data.map(v => ({
                    ...v,
                    value: (v.value / (Math.random() * 100)) | 0
                  }))
                "
                :autoFit="true"
                :padding="10"
                :height="60"
              >
                <my-axis :value="false"></my-axis>
                <my-interval position="year*value"></my-interval>
              </my-chart>
            </div>
            <template #footer>
              <div class="text-ellipsis">日均访问量：<span>3000</span></div>
            </template>
          </card-statistic>
        </a-col>
        <a-col v-bind="col">
          <card-statistic title="总访问记录" tip="go" total="￥126,560">
            <div class="width-full">
              <my-chart
                :data="
                  data.map(v => ({
                    ...v,
                    value: (v.value / (Math.random() * 100)) | 0
                  }))
                "
                :autoFit="true"
                :padding="10"
                :height="60"
              >
                <my-axis :value="false"></my-axis>
                <my-line position="year*value" shape="smooth"></my-line>
              </my-chart>
            </div>
            <template #footer>
              <div class="text-ellipsis">日均访问量：<span>3000</span></div>
            </template>
          </card-statistic>
        </a-col>
        <a-col v-bind="col">
          <card-statistic title="总访问记录" tip="go" total="￥126,560">
            <div class="width-full">
              <my-chart
                :data="[
                  { item: '事例一', count: 40, percent: 0.4 },
                  { item: '事例二', count: 21, percent: 0.21 },
                  { item: '事例三', count: 17, percent: 0.17 },
                  { item: '事例四', count: 13, percent: 0.13 },
                  { item: '事例五', count: 9, percent: 0.09 }
                ]"
                :autoFit="true"
                :height="60"
              >
                <my-coordinate
                  :value="[
                    'theta',
                    {
                      radius: 0.75
                    }
                  ]"
                ></my-coordinate>
                <my-axis :value="false"></my-axis>
                <my-legend :value="false"></my-legend>
                <my-interval
                  position="percent"
                  color="item"
                  adjust="stack"
                ></my-interval>
              </my-chart>
            </div>
            <template #footer>
              <div class="text-ellipsis">日均访问量：<span>3000</span></div>
            </template>
          </card-statistic>
        </a-col>
      </a-row>
      <img alt="Vue logo" :src="require('@assets/img/logo.png')" />
      <AnimateNumber
        :start-num="1000"
        :end-num="100"
        :duration="10000"
        :autoplay="true"
        format="0.00"
        animate-type="ease-in"
      />
    </div>
  </container-fluid>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnimateNumber from "@basic/animate-number";
import { CardStatistic, NumberStatistic } from "@business/index";
@Component({
  components: {
    AnimateNumber,
    CardStatistic,
    NumberStatistic
  }
})
export default class Home extends Vue {
  num = 0;
  data: { year: string; value: number }[] = [
    { year: "1990", value: 11111 },
    { year: "1991", value: 15468 },
    { year: "1992", value: 16100 },
    { year: "1993", value: 15900 },
    { year: "1994", value: 17409 },
    { year: "1995", value: 17000 },
    { year: "1996", value: 31056 },
    { year: "1997", value: 31982 },
    { year: "1998", value: 32040 },
    { year: "1999", value: 33233 }
  ];
  val = "0";
  col = {
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 6
  };
  handleClick() {
    this.$routerPush({ name: "Default" });
  }
  handleFormatter(val: any) {
    return val;
  }
  // handleChart(chart: any) {
  //   this.chart = chart;
  // }
  created() {
    // let timer = setInterval(() => {
    //   this.data.splice(0, 1);
    //   if (this.data.length === 3) {
    //     clearInterval(timer);
    //   }
    // }, 5000);
    // console.log("home, created");
    // this.addNum();
  }
  mounted() {}
}
</script>
<style lang="stylus"></style>
