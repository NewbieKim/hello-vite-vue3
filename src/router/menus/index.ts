// @ts-ignore
// import type { Menu, MenuModule } from '@/router/type';
import { Menu, MenuModule } from '../type';
import { basicRoutes, routeModuleList } from '../routers';

const modules = import.meta.globEager('./modules/**/*.ts');

const menuModules: MenuModule[] = [];

const staticMenus: Menu[] = [];
(() => {
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    menuModules.push(...modList);
    console.log('menuModules', menuModules);
  });
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0)
  });
  for (const menu of menuModules) {
    // staticMenus.push(transformMenuModule(menu));
  }
})()

async function getAsyncMenus() {
  // 菜单权限
  // const permissionStore = usePermissionStore();
  // if (isBackMode()) {
  //   return permissionStore.getBackMenuList.filter((item) => !item.meta?.hideMenu && !item.hideMenu);
  // }
  // if (isRouteMappingMode()) {
  //   return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu);
  // }
  return routeModuleList;
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus();
  console.log('menus', menus);
  // if (isRoleMode()) {
  //   const routes = router.getRoutes();
  //   return filter(menus, basicFilter(routes));
  // }
  return menus;
};