import { defineStore } from 'pinia'
import { store } from '../../store'
import { LoginRoute } from '../../router/routers';
// import { menu } from '../../router/menu';
import axios from 'axios';
import { userApi } from '../../api/user'
import { Md5 } from 'ts-md5';

// 
interface UserState {
  userInfo: string;
  userId: string,
  token?: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: 'kkk',
    userId: '123',
    token: '123kkk20211102232333'
  }),
  getters: {},
  actions: {
    async Login(userInfo: {email: string, password: string}) {
      // let pwd = Md5.hashStr(Md5.hashStr(userInfo.password) + '12345678');
      // let pd = Md5.
      const params = {
        email: userInfo.email,
        password: userInfo.password
      }
      // 调用接口
      const data: any = await axios.post(userApi.login, params)
      // 存储用户信息
      if (data.data.code === 1) {
        sessionStorage.setItem('userInfo', JSON.stringify(data.data.data));
      } else {
        // this.$base.win.msg('登录失败', 'error');
      }
      return data
    }
  }
})

// 添加到store index中
export function useUserStoreWithOut() {
  return useUserStore(store);
}