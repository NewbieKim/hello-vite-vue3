import type { AppRouteModule } from '../../../type'
import component from '*.vue'
import Layout from '@/layout/index.vue'
// roleManage路由
const permissions: AppRouteModule = {
  path: '/permissions',
  name: 'Permissions',
  component: Layout,
  redirect: '/permissions/permissionsManage',
  meta: {
    orderNo: 100,
    title: '权限管理',
    icon: 'el-icon-menu'
  },
  children: [
    {
      path: 'permissionsManage',
      name: 'PermissionsManage',
      component: () => import('@/view/permissionsManage/index.vue'),
      meta: {
        title: '权限管理',
        keepAlive: true,
        icon: ''
      }
    }
  ]
}
export default permissions;