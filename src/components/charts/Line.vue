<template>
  <div>
    <h1>欢迎来到echarts-bar的世界</h1>
    <div ref="main" class="echarts-container" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import echarts from '@/utils/lib/echarts';
  const main = ref(null)
  onMounted(() => {
    console.log("onMounted:", main.value);
    let myChart: any = echarts.init(main.value as any);
    myChart.setOption({
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 43, 49],
          type: 'bar',
          stack: 'x'
        },
        {
          data: [5, 4, 3, 5, 10],
          type: 'bar',
          stack: 'x'
        }
      ]
    })
  });
  // var myChart: any = echarts.init(document.getElementById('#main'));
</script>

<style lang="scss" scoped>

</style>