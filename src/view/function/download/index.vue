<template>
  <div>
    <div>
      <h1>根据文件名称下载</h1>
      <el-button type="primary" @click="downloadByName">文件名下载</el-button>
      <a href="http://localhost:4000/src/assets/logo.png" download>点击下载</a>
    </div>
    <div>
      <h1>根据后端接口下载</h1>
      <el-button type="primary" @click="downloadByBack">后端接口下载</el-button>
    </div>
    <div>
      <h1>showSaveFilePicker下载</h1>
      <div>
        <img src="@/assets/images/body.png" alt="">
        <img src="@/assets/images/body2.png" alt="">
        <img id="mergedPic" src="http://via.placeholder.com/256" />
        <el-button type="primary" @click="handleMergeImage">合成图片</el-button>
        <el-button type="primary" @click="downloadByPicker">showSaveFilePicker下载下载</el-button>
      </div>
    </div>
    <div>
      <h1>FileSave</h1>
      <div>
        <el-button type="primaty" @click="downloadByFileSave">FileSave下载</el-button>
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
  const downloadByName = () => {
    let url = 'http://localhost:4000/src/assets/logo.png'
    // saveAs(url, '测试文件.jpeg')
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
    console.log('123')
  }
  const downloadByFileSave = () => {
    let blob = new Blob(["大家好，我是阿chabao!"], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "hello.txt")
  }
</script>

<style lang="scss" scoped>

</style>