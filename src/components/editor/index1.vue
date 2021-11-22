<template>
  <div>
    123
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, watch, onMounted } from 'vue';
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';

  import Quill from 'quill'
  import uploadFile from '@/utils/fileUploadService'
  import { Base } from '@/utils/base';

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
</script>

<style lang="scss" scoped>

</style>