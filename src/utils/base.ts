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

export class Base {
  win: Win = {
    msg(message:string, type:any) {
      ElMessage({
        message: message,
        type: type || 'warning'
      })
    }
  }
}

const base = new Base()
export default base
