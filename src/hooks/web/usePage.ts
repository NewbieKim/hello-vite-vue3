import type { RouteLocationRaw, Router } from 'vue-router';
// @ts-ignore
import { PageEnum } from '@/enums/PageEnum';
import { useRouter } from 'vue-router';
// import unref from 'vue';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };

function handleError(e: Error) {
  console.error(e);
}

// page switch
export function useGo(_router?: Router) {
  let router;
  if (!_router) {
    router = useRouter();
  }
  // @ts-ignore
  const { push, replace } = _router || router;
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return;
    }
    if (typeof opt === 'string') {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}

export const useRedo = (_router?: Router) => {
  // 一个路由对象 包含：{ go, back, push, currentRoute }
  const { push, currentRoute } = _router || useRouter();
  console.log('router', _router, useRouter());
  console.log('value', push, currentRoute);
  // unref(): val = isRef(val) ? val.value : val
  const { query, params = {}, name, fullPath } = currentRoute.value || currentRoute ;
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      // if (name === 'REDIRECT_NAME') {
      //   resolve(false);
      //   return;
      // }
      // if (name && Object.keys(params).length > 0) {
      //   params['_redirect_type'] = 'name';
      //   params['path'] = String(name);
      // } else {
      //   params['_redirect_type'] = 'path';
      //   params['path'] = fullPath;
      // }
      push({ name: name, params, query }).then(() => resolve(true));
    });
  }
  return redo;
};
