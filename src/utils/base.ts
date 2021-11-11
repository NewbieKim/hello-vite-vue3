import { ElMessage } from 'element-plus'
// import { VNode } from 'vue'
// import { MessageType } from 'element-plus'

// 弹框 接口
interface Win {
  /*
  * des: 弹框提示信息
  * @param message 提示内容
  * @param type 类型
  */
  msg(message: string, type ?: any): void
}

interface Util {
  shallowCopy(src: Array<any>): any
}

export class Base {
  win: Win = {
    msg(message:string, type:any) {
      ElMessage({
        message: message,
        type: type || 'warning'
      })
    }
  };
  util: Util = {
    shallowCopy(src: Array<any>): any {
      let res: any = []
      for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
          res[prop] = src[prop]
        }
      }
      return res
    }
  }
}

const base = new Base()
export default base
