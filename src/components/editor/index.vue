<template>
   <div class="editor-container">
    <!-- @ready="onEditorReady($event)"-->
      <quill-editor
        ref="myQuillEditor"
        v-model="content"
        class="ql-editor offsetEditor"
        :options="editorOption"
        :disabled="disabled"
        @change="onEditorChange($event)"
        @blur="onEditorChange($event)"
      />
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="uploadUrl"
        :before-upload="beforeUpload"
        :data="uploadData"
        :on-success="upScuccess"
        drag
        :http-request="uplaodImage"
        multiple
        style="display:none"
        accept="image/*"
      >
      <el-button
        id="imgInput"
        v-loading.fullscreen.lock="fullscreenLoading"
        size="small"
        type="primary"
        element-loading-text="插入中,请稍候"
      >
        点击上传
      </el-button>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, watch, onMounted } from 'vue';
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import Quill from 'quill'
  // import {ImageDrop} from 'quill-image-drop-module'
  // import { ImageResize } from 'quill-image-resize-module'

  import uploadFile from '@/utils/fileUploadService'
  import { Base } from '@/utils/base';

  // Quill.register('modules/imageResize', ImageResize)
  let props = defineProps({
    disabled: { type: Boolean, default: false },
    info: {type: String, default: ''}
  })
  const base = new Base()
  let content = props.info
  const editorOption = {
     modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image']
        ],
        history: {
          delay: 1000,
          maxStack: 50,
          userOnly: false
        },
        imageDrop: true,
        imageResize: {
          displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },// 'Toolbar'
          modules: ['Resize', 'DisplaySize']
        }
      },
      placeholder: '请输入内容...'
  }
  let uploadReqHeaders = {}
  let uploadData = {}
  const uploadUrl = ''
  let photoUrl = '' // 上传图片地址
  let uploadType = '' // 上传的文件类型（图片、视频）
  let fullscreenLoading = false
  let basePath = ''

  // 监听属性
  watch(() => props.info, () => {
    content = props.info
  })

  onMounted(() => {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    const myQuillEditor = ref<any | null>({});
    myQuillEditor.quill
      .getModule('toolbar')
      .addHandler('image', imgHandler)
    // basePath = await this.$base.sysParameter.getSysParameterByVal('oss_download_url')
  })

  // 点击图片ICON触发事件
  const imgHandler = function(state: any) {
    const myQuillEditor = ref<any | null>({});
    let addRange = myQuillEditor.quill.getSelection()
    if (state) {
      let fileInput: any = document.getElementById('imgInput')
      fileInput.click() // 加一个触发事件
    }
    uploadType = 'image'
  }

  const onEditorChange: Function = function() {
    debugger
  }

  function beforeUpload(file: any) {
    debugger
    const isImg = file.type.indexOf('image') !== -1
    if (!isImg){
      base.win.msg('上传失败！请上传图片格式的文件!', 'warning')
      return false
    }
      // 大小
    const maxSize = file.size / 1024 / 1024 < 10
    if (!maxSize) {
      base.win.msg('【' + file.name + '】上传失败！图片不能超过' + '10MB!', 'warning')
      return false
    }
  }
  // 图片上传成功回调   插入到编辑器中
  function upScuccess(e: any, file: File, fileList: Array<any>) {
    debugger
    // fullscreenLoading = false
    // let that = this
    // if (e.result === '1') {
    //     // 将文件上传后的URL地址插入到编辑器文本中
    //     // let value = that.basePath + e.url
    //     that.addRange = that.$refs.myQuillEditor.quill.getSelection()
    //     let value = e.url.indexOf('http') !== -1 ? e.url : that.basePath + e.url
    //     that.$refs.myQuillEditor.quill.insertEmbed(
    //       that.addRange !== null ? that.addRange.index : 0,
    //       that.uploadType,
    //       value,
    //       Quill.sources.USER
    //     ) // 调用编辑器的 insertEmbed 方法，插入URL
    //     that.$refs.myQuillEditor.quill.setSelection(that.addRange.index + 1)
    //   } else {
    //     this.$message.error(`${that.uploadType}插入失败`)
    //   }
      // this.$refs.upload.clearFiles() // 插入成功后清除input的内容
  }
  // 三方上传接口
  function uplaodImage(param: any){
    debugger
    fullscreenLoading = true
    uploadFile(param).then((res) => {
    fullscreenLoading = false
    if (res && res.result === '1'){
      param.file.imageURL = res.url
      param.onSuccess(res)
      } else {
        param.onError()
      }
    }).catch(() => {
      param.onError()
      fullscreenLoading = false
    })
  }
</script>

<style lang="scss" scoped>
.editor-container {
  margin: 65px;
}
::v-deep .offsetEditor{
  padding:  0px !important;
  position: relative;
  top: -8px !important;
  height: 500px;
}

</style>