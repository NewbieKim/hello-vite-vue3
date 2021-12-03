<template>
  <div class="page-container">
    <div class="header">
      <div class="header-content">
        <span class="avatar" style="width: 72px;height: 72px;line-height: 72px;">
          <img src="https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640" alt="">
        </span>
        <div class="date-info">
          早安, km-in, 开始您一天的工作吧！
        </div>
        <div class="summary-container">
          统计
        </div>
      </div>
    </div>
    <div class="container">
        <div class="left">
          <div class="top">
            项目
          </div>
          <div class="project-container">
            <div class="project">1</div>
            <div class="project">1</div>
            <div class="project">1</div>
            <div class="project">1</div>
            <div class="project">1</div>
            <div class="project">1</div>
          </div>
        </div>
        <div class="right">右边</div>
    </div>
    <div class="sort-container">
      <div v-for="(item, index) in sortTable" :key="index">
        <h4 style="font-size: 18px;margin: 0 10px;display: flex;"><el-icon class="el-icon-paperclip" style="font-size: 18px"></el-icon>{{ item.title }}</h4>
        <div class="sort">
          <div class="s1" v-for="(item1,index1) in item.data" :key="index1">
            <!-- link -->
            <div style="margin: 20px">
              <div>
                {{ item1.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">这里是底部</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue'
  const sortTable: Array<any> = reactive([
    {
      title: 'JS',
      data: [
        { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''},
        { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''}
      ]
    },
    {
      title: 'JS',
      data: [
        { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''},
        { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''}, { name: 'ES6教程', introduce: ''}
      ]
    },
  ])
</script>

<style lang="scss" scoped>
.page-container {
  .header .footer{
    height:40px;
    width:100%;
    background:red;
  }
  .header {
    padding: 10px 20px;
    line-height: 1.5;
    background-color: #fff;
    .header-content {
      display: flex;
      .avatar > img {
        height: 72px;
        width: 72px;
        display: block;
        border-radius: 50%;
      }
      .date-info {
        align-items: center;
        display: flex;
        margin: 0 20px;
      }
      .summary-container {
        flex: 1 1 0%;
        align-items: center;
        display: flex;
        justify-content: flex-end;
        margin-right: 40px;
      }
    }
  }
  .container {
    display: flex;
    margin: 20px 10px;
    .left{
      // width:200px;
      flex: 0 1 70%;
      background: #ffffff;
      .project-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .project {
          width: 33%;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          // 盒子效果
          padding: 24px;
          border: 0;
          border-radius: 0;
          box-shadow: 1px 0 0 0 #f0f0f0, 0 1px 0 0 #f0f0f0, 1px 1px 0 0 #f0f0f0, 1px 0 0 0 #f0f0f0 inset, 0 1px 0 0 #f0f0f0 inset;
          transition: all 0.3s;
        }
      }
    }
    .right{
      flex: 1;
      background: #ffffff;
      // width:300px;
    }
  }
  .sort-container {
    .sort {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      height: 200px;
      margin: 0px 20px 20px 20px;
      .s1 {
        width: 23%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        position: relative;
        background: #fff;
        margin: 10px;
        border: 1px solid;
        left: -20px;
      }
      .s1:hover {
        transform: translateY(-6px);
        transition: all .3s ease;
      }
    }
  }
}
</style>