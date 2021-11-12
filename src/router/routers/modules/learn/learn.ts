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
        // keepAlive: true,
        icon: ''
      }
    },
    {
      path: 'list',
      name: 'List',
      component: () => import('@/view/learn/list/index.vue'),
      meta: {
        title: '列表组件',
        // keepAlive: true,
        icon: '',
        // noCache: true
      }
    },
    {
      path: 'reactive',
      name: 'Reactive',
      component: () => import('@/view/learn/reactive/index.vue'),
      meta: {
        title: '响应式'
      }
    },
    {
      path: 'rate',
      name: 'Rate',
      component: () => import('@/view/learn/rate/index.vue'),
      meta: {
        title: '评级组件'
      }
    },
    {
      path: 'animation',
      name: 'Animation',
      component: () => import('@/view/learn/animation/index.vue'),
      meta: {
        title: '动画组件'
      }
    },
    {
      path: 'viewPort',
      name: 'ViewPort',
      component: () => import('@/view/learn/viewPort/index.vue'),
      meta: {
        title: '视口位置'
      }
    },
    {
      path: 'slot',
      name: 'Slot',
      component: () => import('@/view/learn/slot/index.vue'),
      meta: {
        title: 'vue插槽'
      }
    }
  ]
}
export default learn;