import type { AppRouteModule } from '../../../type'
import component from '*.vue'
import Layout from '@/layout/index.vue'
// roleManage路由
const learn: AppRouteModule = {
  path: '/learn',
  name: 'Learn',
  component: Layout,
  redirect: '/learn/comProps',
  meta: {
    orderNo: 100,
    title: '组件学习',
    icon: 'el-icon-menu'
  },
  children: [
    {
      path: 'comProps',
      name: 'ComProps',
      component: () => import('@/view/learn/comProps/index.vue'),
      meta: {
        title: '组件传值',
        keepAlive: true,
        icon: ''
      }
    },
    {
      path: 'list',
      name: 'List',
      component: () => import('@/view/learn/list/index.vue'),
      meta: {
        title: '列表组件',
        keepAlive: true,
        icon: ''
      }
    },
    {
      path: 'reactive',
      name: 'Reactive',
      component: () => import('@/view/learn/reactive/index.vue'),
      meta: {
        title: '响应式'
      }
    }
  ]
}
export default learn;