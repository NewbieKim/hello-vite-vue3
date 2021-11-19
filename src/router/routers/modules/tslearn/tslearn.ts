import type { AppRouteModule } from '../../../type'
import component from '*.vue'
import Layout from '@/layout/index.vue'
// roleManage路由
const ts: AppRouteModule = {
  path: '/ts',
  name: 'Ts',
  component: Layout,
  redirect: '/ts/generic',
  meta: {
    orderNo: 1000,
    title: 'TS框框',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'generic',
      name: 'Generic',
      component: () => import('@/view/tslearn/generic/index.vue'),
      meta: {
        title: '泛型框框',
        keepAlive: true
      }
    }
  ]
}
export default ts;