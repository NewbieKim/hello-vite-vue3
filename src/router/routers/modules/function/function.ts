import type { AppRouteModule } from '../../../type'
import component from '*.vue'
import Layout from '@/layout/index.vue'
// roleManage路由
const function1: AppRouteModule = {
  path: '/function',
  name: 'Function',
  component: Layout,
  redirect: '/function/downloadFile',
  meta: {
    orderNo: 1000,
    title: '功能列表',
    icon: 'el-icon-coin'
  },
  children: [
    {
      path: 'download',
      name: 'Download',
      component: () => import('@/view/function/download/index.vue'),
      meta: {
        title: '文件下载',
        keepAlive: true
      }
    },
  ]
}
export default function1;