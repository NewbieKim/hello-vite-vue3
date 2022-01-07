<template>
  <div>
    <div>
      <input id="uploadFile" type="file" accept="image/*" multiple>
      <el-button id="submit" @click="uploadFileToSingle">单文件上传</el-button>
      <img :src="fileUrl" alt="" style="width:200px; height:200px">
    </div>
    <div>
      <input id="uploadFileMore" type="file" accept="image/*" multiple>
      <el-button id="submit" @click="uploadFileToMore">多文件上传</el-button>
      <ul v-if="filesMore.length">
        <li v-for="(item, index) in filesMore" :key="index">
          <img :src="item.url" alt="" style="width: 150px; height: 150px;">
        </li>
      </ul>
      <div id="img-container"></div>
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
  import { ref, onMounted, reactive, toRefs, isRef, nextTick } from "vue";
  import { upload } from "@/hooks/core/upload";
  import fileUpload from "@/components/fileUpload/index.vue";
  import { Base } from '@/utils/base';
  import { fileDataJsonTransArray } from "@/utils/fileTool";
  import axios from 'axios'
  // import Heading from "@/components/Heading.jsx";
  let loading = ref(false)
  // 展示图片
  let fileList = reactive([
    { name: 'food.jepg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
  ])
  let fileUrl = ref("")
  let base = new Base()

  // 多文件
  let filesMore = []

  // 单文件上传
  const uploadFileToSingle = () => {
    const uploadFileEle: any = document.querySelector('#uploadFile')
    if (!uploadFileEle.files.length) return;
    const file = uploadFileEle.files[0];
    uploadToSingle(file)
  }
  function uploadToSingle(file: any, fieldName = "file") {
    let formData = new FormData();
    formData.set(fieldName, file)
    console.log('formData', formData, formData.get('file'))
    axios({
      url: 'http://localhost:3000/thirdService/upload',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      // 发送的数据
      data: formData
    }).then((res: any) => {
      if (res.data.code === "1") {
        base.win.msg('上传成功', 'success')
        console.log(isRef(fileUrl))
        fileUrl.value = res.data.data.url;
      }
    })
  }

  // 多文件上传
  const uploadFileToMore = () => {
    const uploadFileEle: any = document.querySelector("#uploadFileMore")
    if (!uploadFileEle.files.length) return
    const files = uploadFileEle.files
    uploadToMore(Array.from(files))
  }
  function uploadToMore(files: Array<any>, fileName = "file") {
    let formData = new FormData();
    files.forEach((file, index) => {
      formData.append(file.name, file)
      console.log("formdata", formData, formData.get(file.name))
    })
    axios({
      url: 'http://localhost:3000/thirdService/upload/multiple',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      // 发送的数据
      data: formData
    }).then(async (res: any) => {
      if (res.data.code === "1") {
        base.win.msg('上传成功', 'success')
        console.log(res.data.data.url)
        // 此时已经是非响应式 ?
        filesMore = reactive(JSON.parse(res.data.data))
        await nextTick();
        console.log('Now DOM is updated,filesMore is', filesMore)
        // 添加dom
        // let container = document.querySelector('#img-container')
        // filesMore.map((item) => {
        //   let img = document.createElement("img");
        //   img.src = item.url;
        //   container.append(img);
        // })
      }
    })
  }

  // 拖拽上传
  onMounted(() => {
    const dropAreaEle: any = document.querySelector("#dropArea");
    console.log(dropAreaEle)
    const imgPreviewEle = document.querySelector("#imagePreview");
    const IMAGE_MIME_REGEX = /^image\/(jpe?g|gif|png)$/i;
    // 阻止默认的网页拖拽事件
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
    dropAreaEle.addEventListener("drop", handleDrop);

    function handleDrop(e: any) {
      const dt = e.dataTransfer;
      const files = [...dt.files];
      debugger
      console.log('drop-files', files)
      files.forEach((file) => {
        previewImage(file, imgPreviewEle);
      });

      // 文件上传代码
      // files.forEach((file: any) => {
      //   upload({
      //     url: 'http://localhost:3000/thirdService/upload',
      //     file
      //   })
      // })
    }

    // 预览图片
    function previewImage(file: any, container: any) {
      // 判断文件类型
      if (IMAGE_MIME_REGEX.test(file.type)) {
        // reader函数的作用
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

  // 自定义上传
  // 图片上传回调
  function getUploadList (fileList: any) {
    console.log('file', fileList)
    fileList = fileDataJsonTransArray(fileList)
  }


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