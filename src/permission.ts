// 前端路由权限控制
// 1.登录前页面控制 2.黑白名单
import NProgress from 'nprogress';
// @ts-ignore
import { router } from '@/router/index';
import { Router } from 'vue-router';
import { Base } from './utils/base';
NProgress.configure({ showSpinner: false });
const whiteList = ['/login'];
const title = 'my first vite project';
// 路由历史
let routerCache: Array<any> = [];
// 路由前置钩子函数
/*
1.记录路由
2.根据token判断 next页面跳转
-有token 登录页跳转index，无next
-无token 判断黑白名单 黑名单-login
*/
router.beforeEach(async(to: Router, _: Router, next: any) => {
  const base = new Base();
  console.log('route', to, _);
  // @ts-ignore
  if (to.name) {
    // 缓存路由
  }
  NProgress.start();
  let userInfo = sessionStorage.getItem('userInfo');
  if (userInfo) {
    // @ts-ignore
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      next();
    }
  } else {
    // @ts-ignore
    if (whiteList.indexOf(to.path) !== -1 || to.path.indexOf('uvCenter') === 1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      base.win.msg('暂无权限，请先登录', 'error')
      next('/login')
    }
    NProgress.done()
  }
  // if ()
  next();
})

router.afterEach((to: Router) => {
  // Finish progress bar
  console.log(' router done', to);
  NProgress.done();

  // set page title
  // document.title = to.meta.title ? to.meta.title + '-' + title : title
})
