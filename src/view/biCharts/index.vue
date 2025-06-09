<template>
    <div class="business-overview-page">
        <el-container>
            <div class="business-overview-details">
                    <!-- 图表展示 -->
                    <!-- 资产发行及融资统计 -->
                    <div class="chart-row">
                        <div class="left" style="min-height:340px">
                            <div class="loading-box" v-if="assetPublicChartLoading"></div>
                            <div class="title-box">
                                <div class="blue-dot-box"></div>
                                <div :class="{'chart-title':true,'chart-title-active':true}">资产发行及融资统计</div>
                                <div class="time-block">
                                    <el-select size="small" title="" v-model="startMonthParam1" placeholder="请选择开始月份">
                                        <el-option v-for="item in monthList" :label="item.lab" :value="item.val" :key="item.val"></el-option>
                                    </el-select>
                                    <span class="middle-line">-</span>
                                    <el-select size="small" title="" v-model="endMonthParam1" placeholder="请选择截止月份">
                                        <el-option v-for="item in monthList" :label="item.lab" :value="item.val" :key="item.val"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div id="line-chart" class="line-box"></div>
                        </div>
                    </div>
                    <!-- 融资利率统计/融资银行占比 -->
                    <div class="chart-row">
                        <div class="left">
                            <div class="loading-box" v-if="cashRateChartLoading"></div>
                            <div class="title-box">
                                <div class="blue-dot-box"></div>
                                <div :class="{'chart-title':true,'chart-title-active':true}">融资利率统计</div>
                                <div class="time-block">
                                    <el-select size="small" title="" v-model="startMonthParam2" placeholder="请选择开始月份">
                                        <el-option v-for="item in monthList" :label="item.lab" :value="item.val" :key="item.val"></el-option>
                                    </el-select>
                                    <span class="middle-line">-</span>
                                    <el-select size="small" title="" v-model="endMonthParam2" placeholder="请选择截止月份">
                                        <el-option v-for="item in monthList" :label="item.lab" :value="item.val" :key="item.val"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div id="line-chart-cash-rate" class="line-box"></div>
                        </div>
                        <div class="right">
                            <div class="loading-box" v-if="cashBankChartLoading"></div>
                            <div class="title-box">
                                <div class="blue-dot-box"></div>
                                <div :class="{'chart-title':true,'chart-title-active':true}">
                                    融资银行占比（前五）
                                </div>
                                <div class="time-block">
                                    <el-select size="small" title="" v-model="yearParam1" placeholder="请选择年份">
                                        <el-option v-for="item in yearList" :label="item.lab" :value="item.val" :key="item.val"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div id="pie-chart"></div>
                        </div>
                    </div>
                    <!-- 剩余可使用额度统计/供应商融资排名 -->
                    <div class="chart-row">
                        <div class="left">
                            <div class="loading-box" v-if="cashLimitChartLoading"></div>
                            <div class="title-box">
                                <div style="width: 6px;background: #2564FD;margin: 2px 5px;"></div>
                                <div :class="{'chart-title':true,'chart-title-active':true}">剩余可使用额度统计（前六家银行）</div>
                            </div>
                            <div id="bar-chart" class="bar-box"></div>
                        </div>
                        <div class="right">
                            <div class="loading-box" v-if="spyRankChartLoading"></div>
                            <div class="title-box">
                                <div class="blue-dot-box"></div>
                                <div :class="{'chart-title':true,'chart-title-active':true}">
                                    供应商融资排名（前十）
                                </div>
                                <div class="time-block">
                                    <el-select title="" v-model="yearParam2" placeholder="请选择年份">
                                        <el-option v-for="item in yearList" :label="item.lab" :value="item.val" :key="item.val"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div id="bar-chart-cash-rank" class="bar-box"></div>
                        </div>
                    </div>
                </div>
        </el-container>
        <el-container>
            <el-main>
                <div class="chart-row">
                    <MapChart />
                </div>
            </el-main>
        </el-container>
    </div>
</template>

  
<script lang="ts" setup>
import MapChart from '@/components/MapEcharts/Map.vue'
import { ref, reactive, watch, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts' // 引入echarts
import { get } from 'http'

// 状态定义
const totalDataLoading = ref(false)
const cashRateChartLoading = ref(false)
const assetPublicChartLoading = ref(false)
const cashBankChartLoading = ref(false)
const cashLimitChartLoading = ref(false)
const spyRankChartLoading = ref(false)

const businessDataList = ref<any[]>([])
const chartInstanceList = ref<any[]>([])

// 查询参数
const startMonthParam1 = ref('')
const endMonthParam1 = ref('')
const startMonthParam2 = ref('')
const endMonthParam2 = ref('')
const yearParam1 = ref('')
const yearParam2 = ref('')

const monthList = ref<{ lab: string; val: string }[]>([])
const yearList = ref<{ lab: string; val: string }[]>([])

// 组件挂载时初始化
onMounted(() => {
  init()
})

// 组件卸载前清理
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    chartInstanceList.value.forEach((chart: any) => chart.dispose())
    chartInstanceList.value = []
  })
})

// 监听器
watch(startMonthParam1, (newVal, oldVal) => {
  if (newVal && oldVal && newVal !== oldVal) {
    initLineChartsForAssetPublic()
  }
}, { deep: true })

watch(endMonthParam1, (newVal, oldVal) => {
  if (newVal && oldVal && newVal !== oldVal) {
    initLineChartsForAssetPublic()
  }
}, { deep: true })

// 初始化
const init = () => {
  getDefaultYearRange()
  getBusniessData()
  initLineChartsForCashRate()
  initPieChartsForCashBank()
  initBarChartsForLimit()
  initBarChartsForCashRank()
}

const getBusniessData = async () => {
  totalDataLoading.value = true
  try {
    initLineChartsForAssetPublic()
  } finally {
    totalDataLoading.value = false
  }
}

const initLineChartsForAssetPublic = async () => {
  assetPublicChartLoading.value = true
  try {
    // const originalData = await getChartsData({ 
    //   type: 'assetIssueAndCash', 
    //   startYearMonth: startMonthParam1.value, 
    //   endYearMonth: endMonthParam1.value 
    // })
    const originalData = [
      { key: '2024-01', value1: 100200, value2: 201000 },
      { key: '2024-02', value1: 150200, value2: 250900 },
      { key: '2024-03', value1: 12000, value2: 226000 },
      { key: '2024-04', value1: 181000, value2: 28000 },
      { key: '2024-05', value1: 16000, value2: 260600 },
      { key: '2024-06', value1: 114000, value2: 246000 },
      { key: '2024-07', value1: 17000, value2: 27000 },
      { key: '2024-08', value1: 169000, value2: 290600 },
    ]
    
    const { keys, value1s, value2s } = dealDataFunction(originalData)
    const chartDom = document.getElementById('line-chart')
    if (!chartDom) return
    
    const myChart = echarts.init(chartDom)
    myChart.setOption({
                    title: {
                        show: !value1s.length && !value2s.length, // 数据为空时显示标题
                        text: '暂无数据',
                        textStyle: {
                            fontSize: 16,
                            color: '#999'
                        },
                        left: 'center',
                        top: 'center'
                    },
                    grid: {
                        top: 64,
                        bottom: 20,
                        left: '3%',
                        right: 24,
                        containLabel: true
                    },
                    //图例
                    legend: {
                        data: ['新增资产发行总金额(元)','新增融资申请总金额(元)'],//需要和series的name对应
                        textStyle: {
                            color: '#879099',
                        },
                        icon: 'roundRect',//圆角矩形
                        itemWidth: 10,//图例中图形的宽
                        itemHeight: 10,//图例中图形的高
                        right: 24,
                    },
                    xAxis: {
                        type: 'category',//类目轴
                        // data: this.xAxisData,
                        data: keys,
                        //X轴轴线
                        axisLine: {
                            lineStyle: {
                                color: '#E9EDF0',
                            },
                        },
                        //X轴刻度
                        axisLabel: {
                            color: '#BCC4CC',
                        },
                    },
                    yAxis: {
                        type: 'value',//数值轴
                        //坐标轴名称及样式设置
                        name: '(元)',
                        nameTextStyle: {
                            color: '#879099',
                            align: 'right',
                            fontSize: 10,
                            padding: [0,8,0,0],
                        },
                        //Y轴轴线
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#E9EDF0',
                            },
                        },
                        //Y轴刻度
                        axisLabel: {
                            color: '#BCC4CC',
                        },
                        //Y轴在图形区域中的分割线
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#F5F5F5',
                            },
                        },
                    },
                    tooltip: {
                        trigger: 'axis',//鼠标移到坐标轴时展示悬浮框
                        axisPointer: {
                            type: 'line',//直线指示器
                            lineStyle: {
                                color: 'rgba(37,100,253,0.4)',
                                //自定义效果的虚线
                                type: [5,5],
                                dashOffset: 0,
                            },
                        },
                        formatter: (param) => {
                            if (param.length===2) {
                                return `<div style="display: flex;flex-direction: column;"><div style="font-size: 12px;line-height: 17px;font-weight: bold;margin-bottom: 4px;color: #BCC4CC;">${param[0].name}</div>
                                <div style="font-size: 12px;line-height: 17px;color: #879099;">新增资产发行总金额(元)：<span style="color: #2564FD;font-weight: bold;">${param[0].value}元</span></div>
                                <div style="font-size: 12px;line-height: 17px;color: #879099;">新增融资申请总金额(元)：<span style="color: #FB9F15;font-weight: bold;">${param[0].value}元</span></div></div>`
                            }
                            if (param.length==1 && param[0].seriesName=='新增资产发行总金额(元)') {
                                return `<div style="display: flex;flex-direction: column;"><div style="font-size: 12px;line-height: 17px;font-weight: bold;margin-bottom: 4px;color: #BCC4CC;">${param[0].name}</div>
                                <div style="font-size: 12px;line-height: 17px;color: #879099;">新增资产发行总金额(元)：<span style="color: #2564FD;font-weight: bold;">${param[0].value}元</span></div></div>`
                            }
                            if (param.length==1 && param[0].seriesName=='新增融资申请总金额(元)') {
                                return `<div style="display: flex;flex-direction: column;"><div style="font-size: 12px;line-height: 17px;font-weight: bold;margin-bottom: 4px;color: #BCC4CC;">${param[0].name}</div>
                                <div style="font-size: 12px;line-height: 17px;color: #879099;">新增融资申请总金额(元)：<span style="color: #2564FD;font-weight: bold;">${param[0].value}元</span></div></div>`
                            }
                        },
                        textStyle: {
                            fontFamily: 'Microsoft YaHei',
                        },
                    },
                    series: [
                        {
                            type: 'line',//折线图
                            name: '新增资产发行总金额(元)',
                            data: value1s,
                            //拐点
                            symbol: 'circle',
                            symbolSize: 8,
                            itemStyle: {
                                normal: {
                                    color: '#2564FD',
                                },
                                //hover时
                                emphasis: {
                                    borderColor: '#FFFFFF',
                                    borderWidth: 2,
                                    shadowColor: '#2564FD',
                                    shadowBlur: 10,
                                },
                            },
                            //折线样式
                            lineStyle: {
                                color: '#2564FD',
                            },
                            //折线下区域样式
                            areaStyle: {
                                color: {
                                    type: 'linear',//线性渐变
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {offset: 0, color: 'rgba(37,100,253,0.12)'},
                                        {offset: 1, color: 'rgba(37,100,253,0.04)'},
                                    ],
                                    global: false,
                                },
                            },
                        },
                        {
                            type: 'line',//折线图
                            name: '新增融资申请总金额(元)',
                            data: value2s,
                            //拐点
                            symbol: 'circle',
                            symbolSize: 8,
                            itemStyle: {
                                normal: {
                                    color: '#FB9F15',
                                },
                                //hover时
                                emphasis: {
                                    borderColor: '#FFFFFF',
                                    borderWidth: 2,
                                    shadowColor: '#FB9F15',
                                    shadowBlur: 10,
                                },
                            },
                            //折线样式
                            lineStyle: {
                                color: '#FB9F15',
                            },
                            //折线下区域样式
                            areaStyle: {
                                color: {
                                    type: 'linear',//线性渐变
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {offset: 0, color: 'rgba(37,100,253,0.12)'},
                                        {offset: 1, color: 'rgba(37,100,253,0.04)'},
                                    ],
                                    global: false,
                                },
                            },
                        }
                    ]
                })
    
    chartInstanceList.value.push(myChart)
  } finally {
    assetPublicChartLoading.value = false
  }
}

const initLineChartsForCashRate = async () => {
    cashRateChartLoading.value = true
    // let originalData = await this.getChartsData({type: 'cashRate', startYearMonth: this.startMonthParam2, endYearMonth: this.endMonthParam2})
    let originalData = [
        { key: '2024-01', value1: 100200 },
        { key: '2024-02', value1: 150200 },
        { key: '2024-03', value1: 12000 },
        { key: '2024-04', value1: 181000 },
        { key: '2024-05', value1: 16000 },
        { key: '2024-06', value1: 114000 },
        { key: '2024-07', value1: 17000 },
        { key: '2024-08', value1: 169000 },
        { key: '2024-09', value1: 169000 },
        { key: '2024-10', value1: 169000 },
        { key: '2024-11', value1: 169000 },
        { key: '2024-12', value1: 169000 },
    ]
    let {keys, value1s} = dealDataFunction(originalData)
    const chartDom = document.getElementById('line-chart-cash-rate')
    if (!chartDom) return
    const myChart = echarts.init(chartDom)
                myChart.setOption({
                    title: {
                        show: !value1s.length, // 数据为空时显示标题
                        text: '暂无数据',
                        textStyle: {
                            fontSize: 16,
                            color: '#999'
                        },
                        left: 'center',
                        top: 'center'
                    },
                    grid: {
                        top: 64,
                        bottom: 44,
                        left: 84,
                        right: 24,
                    },
                    //图例
                    legend: {
                        data: ['融资成本(%)'],//需要和series的name对应
                        textStyle: {
                            color: '#879099',
                        },
                        icon: 'roundRect',//圆角矩形
                        itemWidth: 10,//图例中图形的宽
                        itemHeight: 10,//图例中图形的高
                        right: 24,
                    },
                    xAxis: {
                        type: 'category',//类目轴
                        data: keys,
                        //X轴轴线
                        axisLine: {
                            lineStyle: {
                                color: '#E9EDF0',
                            },
                        },
                        //X轴刻度
                        axisLabel: {
                            color: '#BCC4CC',
                        },
                    },
                    yAxis: {
                        type: 'value',//数值轴
                        //坐标轴名称及样式设置
                        name: '(%)',
                        nameTextStyle: {
                            color: '#879099',
                            align: 'right',
                            fontSize: 10,
                            padding: [0,8,0,0],
                        },
                        //Y轴轴线
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#E9EDF0',
                            },
                        },
                        //Y轴刻度
                        axisLabel: {
                            color: '#BCC4CC',
                        },
                        //Y轴在图形区域中的分割线
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#F5F5F5',
                            },
                        },
                    },
                    tooltip: {
                        trigger: 'axis',//鼠标移到坐标轴时展示悬浮框
                        axisPointer: {
                            type: 'line',//直线指示器
                            lineStyle: {
                                color: 'rgba(37,100,253,0.4)',
                                //自定义效果的虚线
                                type: [5,5],
                                dashOffset: 0,
                            },
                        },
                        formatter: (param) => {
                            return `<div style="display: flex;flex-direction: column;"><div style="font-size: 12px;line-height: 17px;font-weight: bold;margin-bottom: 4px;color: #BCC4CC;">${param[0].name}</div><div style="font-size: 12px;line-height: 17px;color: #879099;">融资利率(%)：<span style="color: #2564FD;font-weight: bold;">${param[0].value}%</span></div></div>`
                        },
                        textStyle: {
                            fontFamily: 'Microsoft YaHei',
                        },
                    },
                    series: [
                        {
                            type: 'line',//折线图
                            name: '融资成本(%)',
                            data: value1s,
                            //拐点
                            symbol: 'circle',
                            symbolSize: 8,
                            itemStyle: {
                                normal: {
                                    color: '#2564FD',
                                },
                                //hover时
                                emphasis: {
                                    borderColor: '#FFFFFF',
                                    borderWidth: 2,
                                    shadowColor: '#2564FD',
                                    shadowBlur: 10,
                                },
                            },
                            //折线样式
                            lineStyle: {
                                color: '#2564FD',
                            },
                            //折线下区域样式
                            areaStyle: {
                                color: {
                                    type: 'linear',//线性渐变
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {offset: 0, color: 'rgba(37,100,253,0.12)'},
                                        {offset: 1, color: 'rgba(37,100,253,0.04)'},
                                    ],
                                    global: false,
                                },
                            },
                        },
                    ]
                })
}

const initPieChartsForCashBank = async () => {
    // cashRateChartLoading.value = true
    // let originalData = await this.getChartsData({type: 'cashRate', startYearMonth: this.startMonthParam2, endYearMonth: this.endMonthParam2})
    let originalData = [
        { name: '北京银行', value: 10 },
        { name: '广州银行', value: 15 },
        { name: '工商银行', value: 10 },
        { name: '中国银行', value: 15},
        { name: '其他', value: 10 },
    ]
    const chartDom = document.getElementById('pie-chart')
    if (!chartDom) return
    const myChart = echarts.init(chartDom)
    myChart.setOption({
                    title: {
                        show: !originalData.length, // 数据为空时显示标题
                        text: '暂无数据',
                        textStyle: {
                            fontSize: 16,
                            color: '#999'
                        },
                        left: 'center',
                        top: 'center'
                    },
                    tooltip: {
                        trigger: 'item',//鼠标移到图形本身时展示悬浮框
                        formatter: (param) => {
                            return `<div style="display: flex;flex-direction: column;"><div style="font-size: 12px;line-height: 17px;font-weight: bold;margin-bottom: 4px;">${param.name}</div><div style="font-size: 12px;line-height: 17px;color: #879099;">占比：<span style="color: #2564FD;font-weight: bold;">${param.value}%</span></div></div>`
                        },
                        borderColor: '#FFFFFF',
                        textStyle: {
                            fontFamily: 'Microsoft YaHei',
                        },
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                    },
                    series: [
                        {
                            // name: 'Access From',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                },
                            },
                            labelLine: {
                                show: false
                            },
                            data: originalData
                        }
                    ]
                })
}

const initBarChartsForLimit = async () => {
    cashRateChartLoading.value = true
    // let originalData = await this.getChartsData({type: 'cashRate', startYearMonth: this.startMonthParam2, endYearMonth: this.endMonthParam2})
    let originalData = [
        { name: '北京银行', value1: 100200 },
        { name: '广州银行', value1: 150200 },
    ]
    let {keys, value1s} = dealDataFunction(originalData)
    const chartDom = document.getElementById('bar-chart')
    if (!chartDom) return
    const myChart = echarts.init(chartDom)
    myChart.setOption({
                    title: {
                        show: !value1s.length, // 数据为空时显示标题
                        text: '暂无数据',
                        textStyle: {
                            fontSize: 16,
                            color: '#999'
                        },
                        left: 'center',
                        top: 'center'
                    },
                    grid: {
                        top: 64,
                        bottom: 20,
                        left: '5%',
                        right: 24,
                        containLabel: true
                    },
                    //图例
                    legend: {
                        data: ['融资额度(元)'],//需要和series的name对应
                        textStyle: {
                            color: '#879099',
                        },
                        icon: 'roundRect',//圆角矩形
                        itemWidth: 10,//图例中图形的宽
                        itemHeight: 10,//图例中图形的高
                        right: 24,
                    },
                    xAxis: {
                        type: 'category',//类目轴
                        data: keys,
                        //X轴轴线
                        axisLine: {
                            lineStyle: {
                                color: '#E9EDF0',
                            },
                        },
                        //X轴刻度
                        axisLabel: {
                            color: '#BCC4CC',
                        },
                    },
                    yAxis: {
                        type: 'value',//数值轴
                        //坐标轴名称及样式设置
                        name: '(元)',
                        nameTextStyle: {
                            color: '#879099',
                            align: 'right',
                            fontSize: 10,
                            padding: [0,8,0,0],
                        },
                        //Y轴轴线
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#E9EDF0',
                            },
                        },
                        //Y轴刻度
                        axisLabel: {
                            color: '#BCC4CC',
                        },
                        //Y轴在图形区域中的分割线
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#F5F5F5',
                            }
                        },
                    },
                    tooltip: {
                        trigger: 'axis',//鼠标移到坐标轴时展示悬浮框
                        axisPointer: {
                            type: 'shadow',
                            shadowStyle: {
                                color: {
                                    type: 'linear',//线性渐变
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {offset: 0, color: 'rgba(37,100,253,0.12)'},
                                        {offset: 1, color: 'rgba(37,100,253,0.04)'},
                                    ],
                                    global: false,
                                },
                            },
                        },
                        formatter: (param) => {
                            let strList = param.map(item => `<div style="font-size: 12px;line-height: 17px;color: #879099;">${item.seriesName}：<span style="color: ${item.color};font-weight: bold;">${item.value}元</span></div>`)
                            return `<div style="display: flex;flex-direction: column;"><div style="font-size: 12px;line-height: 17px;font-weight: bold;margin-bottom: 4px;color: #BCC4CC;">${param[0].name}</div>${strList.join('')}</div>`
                        },
                        textStyle: {
                            fontFamily: 'Microsoft YaHei',
                        },
                    },
                    series: [
                        {
                            type: 'bar',//柱状图
                            name: '融资额度(元)',
                            data: value1s,
                            itemStyle: {
                                color: '#2564FD', // 柱子的背景图
                            },
                            barWidth: 50, // 固定柱子宽度为30px
                        },
                    ],
                })
}

const initBarChartsForCashRank = async () => {
    cashRateChartLoading.value = true
    // let originalData = await this.getChartsData({type: 'cashRate', startYearMonth: this.startMonthParam2, endYearMonth: this.endMonthParam2})
    let originalData = [
        { key: '北京银行', value1: 100200 },
        { key: '广州银行', value1: 150200 },
    ]
    let {keys, value1s} = dealDataFunction(originalData)
    const chartDom = document.getElementById('bar-chart-cash-rank')
    if (!chartDom) return
    const myChart = echarts.init(chartDom)
    myChart.setOption({
                    title: {
                        show: !value1s.length, // 数据为空时显示标题
                        text: '暂无数据',
                        textStyle: {
                            fontSize: 16,
                            color: '#999'
                        },
                        left: 'center',
                        top: 'center'
                    },
                    grid: {
                        top: 64,
                        bottom: 20,
                        left: '5%',
                        right: 24,
                        containLabel: true
                    },
                    //图例
                    legend: {
                        data: ['累计融资金额(元)'],//需要和series的name对应
                        textStyle: {
                            color: '#879099',
                        },
                        icon: 'roundRect',//圆角矩形
                        itemWidth: 10,//图例中图形的宽
                        itemHeight: 10,//图例中图形的高
                        right: 24,
                    },
                    yAxis: {
                        type: 'category',//类目轴
                        data: keys.reverse(),
                        //X轴轴线
                        axisLine: {
                            lineStyle: {
                                color: '#E9EDF0',
                            },
                        },
                        //X轴刻度
                        axisLabel: {
                            color: '#BCC4CC',
                        },
                    },
                    xAxis: {
                        type: 'value',//数值轴
                        //坐标轴名称及样式设置
                        name: '(元)',
                        nameTextStyle: {
                            color: '#879099',
                            align: 'right',
                            fontSize: 10,
                            padding: [0,8,0,0],
                        },
                        //Y轴轴线
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#E9EDF0',
                            },
                        },
                        //Y轴刻度
                        axisLabel: {
                            color: '#BCC4CC',
                            rotate: 30,       // 标签旋转避免重叠
                        },
                        //Y轴在图形区域中的分割线
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#F5F5F5',
                            }
                        },
                    },
                    tooltip: {
                        trigger: 'axis',//鼠标移到坐标轴时展示悬浮框
                        axisPointer: {
                            type: 'shadow',
                            shadowStyle: {
                                color: {
                                    type: 'linear',//线性渐变
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {offset: 0, color: 'rgba(37,100,253,0.12)'},
                                        {offset: 1, color: 'rgba(37,100,253,0.04)'},
                                    ],
                                    global: false,
                                },
                            },
                        },
                        formatter: (param) => {
                            let strList = param.map(item => `<div style="font-size: 12px;line-height: 17px;color: #879099;">${item.seriesName}：<span style="color: ${item.color};font-weight: bold;">${item.value}元</span></div>`)
                            return `<div style="display: flex;flex-direction: column;"><div style="font-size: 12px;line-height: 17px;font-weight: bold;margin-bottom: 4px;color: #BCC4CC;">${param[0].name}</div>${strList.join('')}</div>`
                        },
                        textStyle: {
                            fontFamily: 'Microsoft YaHei',
                        },
                    },
                    series: [
                        {
                            type: 'bar',//柱状图
                            name: '累计融资金额(元)',
                            data: value1s.reverse(),
                            itemStyle: {
                                color: '#2564FD',
                            },
                            barWidth: 20, // 固定柱子宽度为30px
                        },
                    ],
                })
}

// 获取默认年份范围
const getDefaultYearRange = () => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1
  const defaultEndMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`
  
  let preYear = currentYear - 1
  let preMonth = currentMonth + 1
  if (preMonth > 12) {
    preYear += 1
    preMonth -= 12
  }
  
  const defaultStartMonth = `${preYear}-${preMonth.toString().padStart(2, '0')}`
  
  monthList.value = getCustomRangeMonths(currentYear, currentMonth)
  yearList.value = [
    { lab: `${currentYear}年`, val: String(currentYear) },
    { lab: `${currentYear - 1}年`, val: String(currentYear - 1) },
    { lab: `${currentYear - 2}年`, val: String(currentYear - 2) }
  ]
  
  startMonthParam1.value = defaultStartMonth
  endMonthParam1.value = defaultEndMonth
  startMonthParam2.value = defaultStartMonth
  endMonthParam2.value = defaultEndMonth
  yearParam1.value = String(currentYear)
  yearParam2.value = String(currentYear)
}

// 获取自定义月份范围
const getCustomRangeMonths = (currentYear: number, currentMonth: number) => {
  const current = new Date(currentYear, currentMonth - 1)
  const result = []
  for (let i = 0; i <= 24; i++) {
    const year = current.getFullYear()
    const month = (current.getMonth() + 1).toString().padStart(2, '0')
    result.push({ lab: `${year}-${month}`, val: `${year}-${month}` })
    current.setMonth(current.getMonth() - 1)
  }
  return result
}

// 处理图表数据
const dealDataFunction = (originalData: any[]) => {
  return {
    keys: originalData.map(item => item.key),
    value1s: originalData.map(item => item.value1),
    value2s: originalData.map(item => item.value2)
  }
}

</script>

<style scoped lang="scss">
.business-overview-details {
    width: 100%;
    height: 100%;
    padding: 20px;
    background: #f4f4f4;
    background: url("@/assets/images/bi_background.jpg") no-repeat center;
    // display: flex;
    // padding: 20px;
    // background: #f4f4f4;
    .one-page-box {
        margin: 0;
        min-height: calc(100vh - 150px); /* 确保页面至少占满视口高度 */
        display: flex;
        flex-direction: column;
    }
    .business-data-content {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        background: #ffffff;
        padding: 10px;
        gap: 10px;
        position: relative;
        min-height: 200px;
    }
    .business-data-item {
        height: 96px;
        // background: #f4f4f4;
        border-radius: 4px;
        padding: 12px 20px 6px 20px;
        flex: 1;
        min-width: calc(100% / 4 - 20px);
        background: #f4f4f4;
        .data-name {
            text-align: left;
            color: #333333;
            line-height: 18px;
            display: flex;
        }
        .data-amount {
            font-size: 20px;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: 24px;
            padding-top: 4px;
            padding-bottom: 6px;
            font-family: Rubik, Rubik-Medium;
            border-bottom: 1px solid #e9e9e9;
        }
        .data-count {
            font-size: 12px;
            line-height: 18px;
            padding-top: 6px;
        }
    }
    .loading-box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        // background: #FFFFFF url("../../../../../static/img/home/ceHome/loading.gif") no-repeat center;
        background-size: 40px 40px;
        border-radius: 2px;
    }
    .time-block {
        display: flex;
        margin-top: -5px;
        .middle-line {
            margin: 5px;
        }
        .lls-sel-main {
            width: 90px !important;
        }
    }
    .chart-row {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        flex: 1;
        > div {
            background-color: #FFFFFF;
            border-radius: 4px;
            min-height: 400px;
            position: relative;
        }
        > div:not(:last-child) {
            margin-right: 20px;
        }
        .left {
            flex: 1;
            display: flex;
            position: relative;
            padding-top: 24px;
            .title-box {
                display: flex;
                position: absolute;
                padding-left: 24px;
                z-index: 1;
                > div:not(:last-child) {
                    margin-right: 16px;
                }
                .chart-title {
                    font-size: 16px;
                    color: #879099;
                    cursor: pointer;
                }
                .chart-title-active {
                    color: #2B2F33;
                    font-weight: bold;
                }
            }
            .line-box {
                width: 100%;
                height: 100%;
            }
            .bar-box {
                width: 100%;
                height: 100%;
            }
        }
        .right {
            flex: 1;
            display: flex;
            position: relative;
            padding-top: 24px;
            .title-box {
                display: flex;
                position: absolute;
                padding-left: 24px;
                z-index: 1;
                > div:not(:last-child) {
                    margin-right: 16px;
                }
                .chart-title {
                    font-size: 16px;
                    color: #879099;
                    cursor: pointer;
                }
                .chart-title-active {
                    color: #2B2F33;
                    font-weight: bold;
                }
            }
            .line-box {
                width: 100%;
                height: 100%;
            }
            .bar-box {
                width: 100%;
                height: 100%;
            }
            #pie-chart {
                // width: 600px;
                width: 40vw;
                height: 100%;
            }
            #bar-chart-cash-rank {
                // width: 600px;
                width: 40vw;
                height: 100%;
            }
        }
    }
    .blue-dot-box {
        width: 6px;
        background: #2564FD;
        margin: 2px 5px 5px !important;
    }
}
</style>