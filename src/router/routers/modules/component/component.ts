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
    title: '自定义组件',
    icon: 'el-icon-document-add'
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
    },
    {
      path: 'map',
      name: 'Map',
      component: () => import('@/view/components/map/BaiduMap.vue'),
      meta: {
        title: 'BaiduMap',
        keepAlive: true
      }
    },
    {
      path: 'editor',
      name: 'Editor',
      component: () => import('@/view/components/editor/index.vue'),
      meta: {
        title: '富文本编辑器',
        keepAlive: true
      }
    },
    {
      path: 'loading',
      name: 'Loading',
      component: () => import('@/view/components/loading/index.vue'),
      meta: {
        title: '全屏加载',
        keepAlive: true
      }
    }
  ]
}
export default component;