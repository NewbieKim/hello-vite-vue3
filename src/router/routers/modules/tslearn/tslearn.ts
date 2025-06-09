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
    title: 'TS学习',
    icon: 'el-icon-s-opportunity'
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
    },
    // {
    //   path: 'interface',
    //   name: 'Interface',
    //   component: () => import('@/view/tslearn/interface/index.vue'),
    //   meta: {
    //     title: '泛型接口',
    //     keepAlive: true
    //   }
    // }
  ]
}
export default ts;