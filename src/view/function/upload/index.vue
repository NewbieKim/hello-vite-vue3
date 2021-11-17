<template>
  <div>
    <input id="uploadFile" type="file" accept="image/*">
    <el-button id="submit" @click="uploadFileToSingle">单文件上传</el-button>
  </div>
</template>

<script lang="ts" setup>
  import { uploadBySingle } from "@/api/thirdService";
  import { ref } from "vue";
  const uploadFileToSingle = () => {
    const uploadFileEle: any = document.querySelector('#uploadFile')
    if (!uploadFileEle.files.length) return;
    const file = uploadFileEle.files[0];
    upload(file)
  }
  function upload(file: any, fieldName = "file") {
    // let formData = new FormData();
    // formData.append(fieldName, file)
    let data = { file: file, name: file.name }
    uploadBySingle(data).then((res: any) => {
      console.log('upload-res', res)
    })
  }
</script>

<style lang="scss" scoped>

</style>