import type { AppRouteModule } from '../../../type'
import component from '*.vue'
import Layout from '@/layout/index.vue'
// import newHome from '@/view/updatePage/newHome/index.vue'
// roleManage路由
const dashboad: AppRouteModule = {
  path: '/dashboad',
  name: 'Dashboad',
  component: Layout,
  redirect: '/system/rolesManage',
  meta: {
    orderNo: 1000,
    title: 'Dashboad',
    icon: 'el-icon-s-home'
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/view/dashboad/workbench/index.vue'),
      meta: {
        title: '工作台',
        keepAlive: true
      }
    },
  ]
}
export default dashboad;