// 模块路由管理
import type { AppRouteRecordRaw, AppRouteModule } from '../type';
import Home from '../../view/home/index.vue'
import Layout from '@/layout/index.vue'

const modules = import.meta.globEager('./modules/**/*.ts');

export const routeModuleList: AppRouteModule[] = [];
// 添加modules里面的路由
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const InitRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: Layout,
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('../../view/login/index.vue'),
};

export const AboutRoute: AppRouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: () => import('@/view/Home/about.vue'),
  meta: {
    frameSrc: 'https://vvbin.cn/doc-next/',
    title: 'about'
  }
}

export const asyncRoutes = [InitRoute, LoginRoute,AboutRoute, ...routeModuleList];

export const basicRoutes = asyncRoutes;