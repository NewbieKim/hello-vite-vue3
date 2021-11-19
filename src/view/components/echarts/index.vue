<template>
  <div>
    <h1>fuck all</h1>
    <div class="echarts-box">
      <div id="myEcharts" :style="{ width: '900px', height: '300px' }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // import Line from "@/components/charts/Line.vue";
  import * as echarts from "echarts";
  import 'echarts/lib/component/grid'
  import { onMounted, onUnmounted } from "vue-demi";
  let echart = echarts
  onMounted(() => {
    initChart();
  })
  onUnmounted(() => {
    echart.dispose;
  })
  function initChart() {
    let chart = echart.init(document.getElementById("myEcharts") as any, "dark");
    chart.setOption({
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
      tooptip: { trigger: 'axis' },
      yAxis: { type: 'value' },
      series: [{
        data: [
          820,
          932,
          901,
          934,
          1290,
          1330,
          1320,
          801,
          102,
          230,
          4321,
          4129
        ],
        type: 'line',
        smooth: true
      }]
    });
    window.onresize = () => {
      chart.resize()
    }
    return { initChart };
  }
</script>

<style lang="scss" scoped>

</style>