import { defineStore } from 'pinia'
import { store } from '../../store'
import { LoginRoute } from '../../router/routers';
import axios from 'axios';
import { userApi } from '../../api/user'

// 
interface UserState {
  userInfo: string;
  token?: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: 'kkk',
    token: '123kkk20211102232333'
  }),
  getters: {},
  actions: {
    async Login(userInfo: {email: string, password: string}) {
      const params = {
        email: userInfo.email,
        password: userInfo.password
      }
      // 调用接口
      const data = await axios.post(userApi.login, params)
      return data
    }
  }
})

// 添加到store index中
export function useUserStoreWithOut() {
  return useUserStore(store);
}