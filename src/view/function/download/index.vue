<template>
  <div class="download-container">
    <div>
      <h1>根据文件名称下载</h1>
      <el-button type="primary" @click="downloadByName">三方插件下载</el-button>
      <el-button type="primary"><a href="http://localhost:5000/src/assets/logo.png" download>远程下载</a></el-button>
      <el-button type="primary"><a href="http://localhost:5000/src/assets/test.txt" download>本地下载</a></el-button>
    </div>
    <div>
      <h1>根据后端接口下载</h1>
      <el-button type="primary" @click="downloadByBack">后端接口下载</el-button>
    </div>
    <div>
      <h1>showSaveFilePicker下载</h1>
      <el-button type="primary" @click="handleMergeImage">合成图片</el-button>
      <el-button type="primary" @click="downloadByPicker">showSaveFilePicker下载（保存路径）</el-button>
      <div>
        <div class="merge">
          <img src="@/assets/images/body.png" alt="">
          <img src="@/assets/images/body2.png" alt="">
          <img id="mergedPic" src="http://via.placeholder.com/256" />
        </div>
      </div>
    </div>
    <div>
      <h1>FileSave</h1>
      <div>
        <el-button type="primary" @click="downloadByFileSave">FileSave下载（file-save库）</el-button>
      </div>
    </div>
    <div>
      <h1>zip下载</h1>
      <div>
        <el-button type="primary" @click="downloadByZip">zip下载</el-button>
        <el-button type="primary" @click="downloadByZip1">zip-url下载</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  // import FileSaver from "file-saver";
  import { download } from '@/api/thirdService'
  import { mergeImage, saveFile, dataUrlToBlob } from "@/utils/download";
  import { saveAs } from 'file-saver';
  import JSZip from "jszip";
  import JSZipUtils from "jszip-utils";
  const downloadByName = () => {
    let url = 'http://120.79.113.248/public/images/截图.png'
    saveAs(url, '截图.png')
  }
  const downloadByBack = async () => {
    const data: any = await download();
    console.log('buufer', data)
    let blob = new Blob([data.data.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    console.log('blob', blob, window.URL)
    // 通过URL.createObjectURL生成文件路
    let url = window.URL.createObjectURL(blob)
    console.log('url', url)
    // 创建a标签
    let ele = document.createElement("a")
    ele.style.display = 'none'

    // 设置href属性为文件路径，download属性可以设置文件名称
    ele.href = url
    ele.download = "测试文件"

    // 将a标签添加到页面并模拟点击
    document.querySelectorAll("body")[0].appendChild(ele)
    ele.click()

    // 移除a标签
    ele.remove()
  }
  // 合成图片
  const handleMergeImage = async () => {
    let mergePicEle = document.querySelector("#mergedPic");
    const images = ["/body.png", "/body2.png"].map(
      (path) => "src/assets/images" + path
    );
    // base64 的url
    let imgDataUrl = await mergeImage(images)
    console.log('merge imgDataUrl', imgDataUrl)
    mergePicEle.src = imgDataUrl
  }
  // 下载
  const downloadByPicker = async () => {
    const images = ["/body.png", "/body2.png"].map(
      (path) => "src/assets/images" + path
    );
    // base64 的url
    let imgDataUrl = await mergeImage(images)
    const imgBlob = dataUrlToBlob(imgDataUrl, "image/png");
    console.log('imgBlob', imgBlob)
    saveFile(imgBlob, "bodymm.png");
  }

  // 第三方库
  const downloadByFileSave = () => {
    // let blob = new Blob(["大家好，我是阿chabao!"], { type: "text/plain;charset=utf-8" });
    // saveAs(blob, "hello.txt")
    saveAs("https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg", "image.jpg");
  }

  // 压缩包下载
  const downloadByZip = () => {
    const imgs = ["/body.png", "/body2.png"]
    const images = ["/body.png", "/body2.png"].map(
      (path) => "src/assets/images" + path
    );
    let zip = new JSZip()
    Promise.all(images.map(getFileContent)).then((contents: any) => {
      console.log('content', contents)
      if (contents.length) {
        contents.forEach((content: any, i: number) => {
           zip.file(imgs[i], content)
        })
      }
      zip.generateAsync({ type: 'blob' }).then(((blob: any) => {
        console.log('content', contents)
        console.log('blob-zip', zip)
        saveAs(blob, 'test.zip')
      }))
    })
  }
  // url->压缩文件内容
  function getFileContent(fileUrl: string) {
    return new JSZip.external.Promise((resolve, reject) => {
      // 调用jszip-utils库提供的getBinaryContent方法获取文件内容
      JSZipUtils.getBinaryContent(fileUrl, function (err: any, data: any) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }
  // 压缩包文件 直接url地址下载
  const downloadByZip1 = () => {
    let url = 'http://localhost:5000/src/assets/test.zip'
    // 创建a标签
    let ele = document.createElement("a")
    ele.style.display = 'none'

    // 设置href属性为文件路径，download属性可以设置文件名称
    ele.href = url
    ele.download = "测试.zip"

    // 将a标签添加到页面并模拟点击
    document.querySelectorAll("body")[0].appendChild(ele)
    ele.click()

    // 移除a标签
    ele.remove()
  }

</script>

<style lang="scss" scoped>
.download-container {
  height: 1000px;
}
.merge {
  img {
    width: 150px;
    height: 150px;
  }
}
</style>