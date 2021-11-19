import type { AppRouteModule } from '../../../type'
import component from '*.vue'
import Layout from '@/layout/index.vue'
// roleManage路由
const component: AppRouteModule = {
  path: '/component',
  name: 'Component',
  component: Layout,
  redirect: '/component/rolesManage',
  meta: {
    orderNo: 1000,
    title: '组件',
    icon: 'el-icon-coin'
  },
  children: [
    {
      path: 'image',
      name: 'Image',
      component: () => import('@/view/components/image/index.vue'),
      meta: {
        title: '组件图片',
        keepAlive: true
      }
    },
    {
      path: 'echarts',
      name: 'Echarts',
      component: () => import('@/view/components/echarts/index.vue'),
      meta: {
        title: 'Echarts',
        keepAlive: true
      },
    },
    {
      path: 'line',
      name: 'Line',
      component: () => import('@/view/components/echarts/line.vue'),
      meta: {
        title: 'EchartsLine',
        keepAlive: true
      }
    }
  ]
}
export default component;