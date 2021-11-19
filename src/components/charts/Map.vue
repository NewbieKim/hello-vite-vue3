<template>
  <div>
    <h1>欢迎来到echarts-map的世界</h1>
    <div class="echarts-container" ref="main1" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import echarts from '@/utils/lib/echarts';
  import { registerMap } from 'echarts';
  import { mapData } from './data';
  const main1 = ref(null)
  onMounted(async () => {
    // 作用？
    const json = (await (await import('./china.json')).default) as any;
    registerMap('china', json);
    console.log("json:", json);
    let myChart: any = echarts.init(main1.value as any);
    myChart.setOption({
      // 份额
      visualMap: [
        {
          min :0,
          max: 1000,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: false,
          orient: 'horizontal',
          inRange: {
            color: ['#e0ffff', '#006edd'],
            symbolSize: [30, 200],
          }
        }
      ],
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, .6)',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      // 图标系列
      series: [
        {
          name: 'i4-number',
          type: 'map',
          map: 'china',
          label: {
            show: true,
            color: 'rgb(249, 249, 249)',
            fontSize: 10,
          },
          itemStyle: {
            areaColor: '#2f82ce',
            borderColor: '#0DAAC1',
          },
          data: mapData,
        }
      ]
    })
  });
</script>

<style lang="scss" scoped>

</style>