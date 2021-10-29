const LOCALURL = 'http://localhost:3000/'
export const userApi = {
  login: LOCALURL + 'users/login',
  loginOut: LOCALURL + 'users/loginOut',
  register: LOCALURL + 'users/register',
  getRoleList: LOCALURL + 'role/getRoleList'
}

export default userApi