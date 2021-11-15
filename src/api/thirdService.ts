import { httpPost } from '@/utils/http'
const LOCALURL = 'http://localhost:3000/'
export const thirdServiceApi = {
  download: LOCALURL + 'thirdService/download'
}

export const download = (params = {}) => {
  return httpPost({ url: thirdServiceApi.download, params })
}

export default thirdServiceApi