import { defineStore } from 'pinia'
import { store } from '..'
import { LoginRoute } from '../../router/routers';
// import { menu } from '../../router/menu';
import axios from 'axios';
import { menusApi } from '../../api/menus'

// 
interface MenusState {
  userInfo: string;
  userId: string,
  token?: string;
}

export const useMenusStore = defineStore({
  id: 'app-menus',
  state: (): MenusState => ({
    userInfo: 'kkk',
    userId: '123',
    token: '123kkk20211102232333'
  }),
  // @ts-ignore
  // state: { count: 1 },
  getters: {

  },
  actions: {
    async getMenus() {
      const params = {
        userId: '2021102601',
        userName: 'chsp'
      }
      // 调用接口
      const data: any = await axios.post(menusApi.getMenus, params)
      // this.state.menus = data.data.data;
      return data
    }
  }
})

// 添加到store index中
export function useMenusStoreWithOut() {
  return useMenusStore(store);
}