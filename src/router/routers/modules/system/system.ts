import type { AppRouteModule } from '../../../type'
import component from '*.vue'
import Layout from '@/layout/index.vue'
// roleManage路由
const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: Layout,
  redirect: '/system/rolesManage',
  children: [
    {
      path: 'rolesManage',
      name: 'RolesManage',
      component: () => import('@/view/system/rolesManage/index.vue'),
      meta: {
        title: '角色管理',
        keepAlive: true
      }
    }
  ]
}
export default system;