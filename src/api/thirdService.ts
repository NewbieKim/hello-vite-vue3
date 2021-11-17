import { httpPost } from '@/utils/http'
const LOCALURL = 'http://localhost:3000/'
export const thirdServiceApi = {
  download: LOCALURL + 'thirdService/download',
  uploadBySingle: LOCALURL + 'thirdService/uploadSingle'
}

export const download = (params = {}) => {
  return httpPost({ url: thirdServiceApi.download, params })
}
export const uploadBySingle: any = (params) => {
  return httpPost({ url: thirdServiceApi.uploadBySingle, params })
}

export default thirdServiceApi