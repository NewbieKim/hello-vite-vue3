<template>
  <div>
    <div>
      <h1>欢迎来到echarts-line的世界</h1>
      <div ref="chartRef" class="echarts-container" style="width: 1200px;height:600px;"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { getLineData } from './data';
  import echarts from '@/utils/lib/echarts';
  const { barData, lineData, category }  = getLineData
  const chartRef = ref<HTMLDivElement | null>(null);
  onMounted(() => {
    let myChart = echarts.init(chartRef.value as any)
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            backgroundColor: '#333',
          },
        },
      },
      // bar line控制
      legend: {
        data: ['line', 'bar'],
        textStyle: {
          color: '#ccc',
        }
      },
      xAxis: {
        data: category,
        axisLine: {
          lineStyle: {
            color: '#ccc',
          }
        }
      },
      yAxis: {
        splitLine: { show: true }, // 分割线？
        axisLine: {
          lineStyle: {
            color: '#ccc',
          }
        }
      },
      series: [
        {
          name: 'line',
          type: 'line',
          smmth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData
        },
        {
          name: 'bar',
          type: 'bar',
          barWidth: 10,
            itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#14c8d4' },
                { offset: 1, color: '#43eec6' },
              ]),
            },
          data: barData,
        },
        {
          name: 'line',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(20,200,212,0.5)' },
              { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
              { offset: 1, color: 'rgba(20,200,212,0)' },
            ]),
          },
          // z: -12,
          data: lineData,
        },
        {
              name: 'dotted',
              type: 'pictorialBar',
              symbol: 'cricle',
              itemStyle: {
                color: '#0f375f',
              },
              symbolRepeat: true,
              symbolSize: [12, 4],
              symbolMargin: 1,
              z: -10,
              data: lineData,
        },
      ]
    })
  })
</script>

<style lang="scss" scoped>

</style>