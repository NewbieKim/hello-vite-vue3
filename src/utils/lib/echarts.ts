import * as echarts from 'echarts/core';
import 'echarts/lib/component/grid'

import {
  LineChart,
  BarChart
} from "echarts/charts";

import {
  GraphicComponent
} from "echarts/components";

import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  LineChart,
  BarChart,
  GraphicComponent,
  SVGRenderer
])

export default echarts;