<template>
  <div>
    <div>
      <input id="uploadFile" type="file" accept="image/*">
      <el-button id="submit" @click="uploadFileToSingle">单文件上传</el-button>
    </div>
    <div id="dropArea">
      <p>拖拽上传文件</p>
      <div id="imagePreview"></div>
    </div>
    <div>
      <h1>自定义封装的上传组件</h1>
      <fileUpload
          text=""
         :viewList="fileList"
         :accept-file="'image/*,.pdf'"
        :upload-config="{maxSize: 10, maxLength: 3, readOnly:false}"
        @jsonList="getUploadList"
      />
    </div>
    <div>
      <Heading :level="3">hello geekbang</Heading>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { uploadBySingle } from "@/api/thirdService";
  import { ref, onMounted } from "vue";
  import { upload } from "@/hooks/core/upload";
  import fileUpload from "@/components/fileUpload/index.vue";
  import { fileDataJsonTransArray } from "@/utils/fileTool";
  // import Heading from "@/components/Heading.jsx";
  // 展示图片
  let fileList = [
    { name: 'food.jepg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
  ]

  // 图片上传回调
  function getUploadList (fileList: any) {
    console.log('file', fileList)
    fileList = fileDataJsonTransArray(fileList)
  }
  const uploadFileToSingle = () => {
    const uploadFileEle: any = document.querySelector('#uploadFile')
    if (!uploadFileEle.files.length) return;
    const file = uploadFileEle.files[0];
    uploadToSingle(file)
  }
  function uploadToSingle(file: any, fieldName = "file") {
    let formData = new FormData();
    // let reqData: any = {
    //   file: file
    // }
    // for (let k in reqData){
    //   if (reqData.hasOwnProperty(k)) {
    //     formData.append(k, reqData[k])
    //   }
    // }
    formData.set(fieldName, file)
    console.log('formData', formData, formData.get('file'))
    // let data = { file: file, name: file.name }
    uploadBySingle(formData).then((res: any) => {
      console.log('upload-res', res)
    })
  }
  onMounted(() => {
    const dropAreaEle: any = document.querySelector("#dropArea");
    console.log(dropAreaEle)
    const imgPreviewEle = document.querySelector("#imagePreview");
    const IMAGE_MIME_REGEX = /^image\/(jpe?g|gif|png)$/i;
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropAreaEle.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });
    ["dragenter", "dragover"].forEach((eventName) => {
      dropAreaEle.addEventListener(eventName, highlight, false);
    });
    ["dragleave", "drop"].forEach((eventName) => {
        dropAreaEle.addEventListener(eventName, unhighlight, false);
    });
    function preventDefaults(e: any) {
      e.preventDefault();
      e.stopPropagation();
    }
    // 添加高亮样式
    function highlight(e: any) {
      dropAreaEle.classList.add("highlighted");
    }
    // 移除高亮样式
    function unhighlight(e: any) {
      dropAreaEle.classList.remove("highlighted");
    }
    dropAreaEle.addEventListener("drop", handleDrop, false);

    function handleDrop(e: any) {
      const dt = e.dataTransfer;
      const files = [...dt.files];
      console.log('files', files)
      files.forEach((file) => {
        previewImage(file, imgPreviewEle);
      });
      // 文件上传代码
      files.forEach((file: any) => {
        upload({
          url: 'http://localhost:3000/thirdService/upload',
          file
        })
      })
    }

    function previewImage(file: any, container: any) {
      if (IMAGE_MIME_REGEX.test(file.type)) {
        const reader = new FileReader();
        reader.onload = function (e: any) {
          let img = document.createElement("img");
          img.src = e.target.result;
          container.append(img);
        };
        reader.readAsDataURL(file);
      }
    }
  })
</script>
<script lang="ts">

</script>

<style lang="scss" scoped>
#dropArea {
  width: 300px;
  height: 300px;
  border: 1px dashed gray;
  margin-bottom: 20px;
}
#dropArea p {
  text-align: center;
  color: #999;
}
#dropArea.highlighted {
  background-color: #ddd;
}
#imagePreview {
  max-height: 250px;
  overflow-y: scroll;
}
#imagePreview img {
  width: 100%;
  display: block;
  margin: auto;
}
</style>