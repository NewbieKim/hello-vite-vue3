import { createRouter, createWebHashHistory  } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { basicRoutes } from './routers';
// import { menus } from './menus';
import Home from '@/view/home/index.vue'

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

const routes: any = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../view/home/about.vue')
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('../view/system/rolesManage/index.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // routes: routes
  routes: basicRoutes as unknown as RouteRecordRaw[],
});

// config router
// main.ts中使用
export function setupRouter(app: App<Element>) {
  app.use(router);
}

// export default router