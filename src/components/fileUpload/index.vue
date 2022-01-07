/*
des:文件上传组件，支持图片/文档等格式；支持单/多文件
component_name:fileUpload
author: kim-jiang
date: 2021-03-11
*/
<template>
  <div>
    <el-upload
      class="upload"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :class="{'read-only': readOnly}"
      :on-preview="handlePreView"
      :on-remove="handleRemove"
      :http-request="excedUplaodFile"
      :before-upload="handleBefore"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :file-list="fileList"
    >
      <el-button :class="{'hide': hidenUpload, 'read-only': readOnly}" slot="trigger" size="small" type="primary">上传文件</el-button>
      <!-- <div slot="tip">{{ tip }}</div> -->
    </el-upload>
    <!-- 点击文件弹框 -->
    <el-dialog
      :visible.sync="imageDialogVisible"
      size="tiny"
      top="5vh"
      append-to-body
    >
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, defineProps, defineEmits, onMounted, reactive } from "vue";
  import uploadFile from "@/utils/fileUploadService";
  import { fileDataArrayTransformJson } from "@/utils/fileTool";
  import { Base } from "@/utils/base";
  const base = new Base()
  const emits = defineEmits(['jsonList'])
  const props = defineProps({
    // 图片数组
    viewList: { type: Array },
    acceptFile: String,
    tips: String,
    uploadConfig: {
      default: {
        maxLength: 5,
        maxSize: 10,
        readonly: false
      }
    }
  })
  let fileList = reactive(props.viewList)
  // 读取上传配置
  const maxLength: number = props.uploadConfig.maxLength
  const maxSizeNum: number = props.uploadConfig.maxSize
  const readonly: boolean = props.uploadConfig.readonly
  // 上传提示
  // tip: String = this.tips
  // 是否隐藏按钮
  let hidenUpload: boolean = false
  let dialogImageUrl = ''
  let imageDialogVisible = false
  let imageArray = ['jpeg','gif','jpg','png','bmp']

  onMounted(() => {
    // fileList = props.viewList as []
    console.log('file', fileList)
  })
  // 点击已上传文件触发的钩子函数
  function handlePreView (file: any) {
    dialogImageUrl = file.url
    imageDialogVisible = true
  }

  // 上传前
  function handleBefore (file: any) {
    // 判断大小
    const maxSize = file.size / 1024 / 1024 < maxSizeNum
    if (!maxSize) {
      base.win.msg(file.name + '上传失败，文件大小不超过' + maxSizeNum + 'M', 'error')
      return false
    }
    // 判断格式
    if (props.acceptFile !== '*') {
      let testmsg = /^image*|^application\/(pdf)$/.test(file.type)
      if (!testmsg) {
        base.win.msg('请上传图片/pdf格式文件', 'error')
        return false
      }
    }
  }

  // 移除文件
  function handleRemove (file: any, fileList: any) {
    hidenUpload = fileList.length >= maxLength
    emits('jsonList', fileList)
  }

  // 超出上传个数 隐藏按钮
  function handleChange (file: any, fileList: any) {
    hidenUpload = fileList.length >= maxLength
  }

  // 超出个数提示
  function handleExceed (file: any, fileList: any) {
    base.win.msg(`最多上传 ${maxLength} 个文件`)
  }

  // 上传成功
  function handleSuccess (response: any, file: any, fileList: any) {
    emits('jsonList', fileDataArrayTransformJson(fileList))
  }

  // 自定义的请求方法
  function excedUplaodFile (params: any) {
    debugger
    console.log('params', params)
    let res = uploadFile(params) as any
    console.log('res', res)
    if (res && res.result === '1') {
      params.file.imageURL = res.url
      params.onSuccess()
    } else {
      params.onError()
    }
  }
</script>

<style lang="scss" scoped>
::v-deep .hide {
  display: none !important;
}
</style>
