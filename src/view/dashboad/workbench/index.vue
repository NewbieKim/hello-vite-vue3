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
            <div class="project" v-for="(item, index) in projectData" :key="index">
              <span class="project_name">
                <!-- <svg-icon :name="'link'" /> -->
                <img src="@/assets/vue-favicon.png" alt="">
                <span>{{ item.title }}</span>
              </span>
              <div class="project_introduce">{{ item.introduce }}</div>
              <div class="url_goto">
                <span><a :href="item.yx_url">原型</a></span>
                <span><a :href="item.test_url">测试环境</a></span>
                <span><a :href="item.pro_url">正式环境</a></span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">右边</div>
    </div>
    <div class="sort-container">
      <div v-for="(item, index) in sortTable" :key="index">
        <h4 style="font-size: 18px;margin: 0 10px;display: flex;"><el-icon class="el-icon-paperclip" style="font-size: 18px"></el-icon>{{ item.title }}</h4>
        <div class="sort">
          <div class="s1" v-for="(item1,index1) in item.data" :key="index1" @click="handleGo(item1)">
            <!-- link -->
            <div>
              <span class="project_name">
                <!-- <svg-icon :name="'link'" /> -->
                <img style="width: 60px;height: 60px" src="@/assets/vue-favicon.png" alt="">
              </span>
            </div>
              <div style="position: relative;">
                <p>{{ item1.name }}</p>
                <p>{{ item1.introduce }}</p>
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
  const projectData: Array<any> = reactive([
    {
      title: '元洪在线',
      image: '',
      introduce: '一站式全球食材供采平台',
      yx_url: '',
      test_url: '',
      pro_url: 'https://www.yhspzx.com:17443/'
    },
    {
      title: '万匠大作',
      image: '',
      introduce: '开发单位：深圳金证引擎科技有限公司',
      yx_url: 'https://axhub.im/ax9/fe5194ab73124b00/#g=1&id=8239mx&p=%E7%89%88%E6%9C%AC%E4%BF%AE%E8%AE%A2%E8%AE%B0%E5%BD%95',
      test_url: '',
      pro_url: 'https://console.wjdz.art/mallYun-operator/#/dashboard'
    },
    {
      title: '元洪在线',
      image: '',
      introduce: '',
      yx_url: '',
      test_url: '',
      pro_url: ''
    },
    {
      title: '元洪在线',
      image: '',
      introduce: '',
      yx_url: '',
      test_url: '',
      pro_url: ''
    },
    {
      title: '元洪在线',
      image: '',
      introduce: '',
      yx_url: '',
      test_url: '',
      pro_url: ''
    },
    {
      title: '元洪在线',
      image: '',
      introduce: '',
      yx_url: '',
      test_url: '',
      pro_url: ''
    },
  ])
  const sortTable: Array<any> = reactive([
    {
      title: 'JS',
      data: [
        { name: 'ES6 教程', introduce: '阮一峰ES6教程', url: 'https://es6.ruanyifeng.com/'},
        { name: 'JavaScript 教程', introduce: '最通俗易懂的 JavaScript 教程', url: 'https://wangdoc.com/javascript/'},
        { name: 'JS 代码规范', introduce: '优秀的 JS 代码规范', url: 'https://github.com/ryanmcdermott/clean-code-javascript'},
        { name: 'TypeScript 教程', introduce: '通俗易懂的 TypeScript 教程', url: 'https://github.com/xcatliu/typescript-tutorial'},
        { name: 'ms之道', introduce: '牛客热心网友知识整理', url: 'https://juejin.cn/post/7028478428680552456#heading-97'},
        { name: 'Node.js 学习指南', introduce: 'Node.js 学习指南，笔记系统整理'},
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
  function handleGo(data: any) {
    window.open(data.url)
  }
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
      .top {
        display: flex;
        margin: 10px;
        font-size: 18px;
      }
      .project-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .project {
          width: 33%;
          height: 150px;
          // display: flex;
          // justify-content: center;
          // align-items: center;
          // 盒子效果
          padding: 24px;
          border: 0;
          border-radius: 0;
          box-shadow: 1px 0 0 0 #f0f0f0, 0 1px 0 0 #f0f0f0, 1px 1px 0 0 #f0f0f0, 1px 0 0 0 #f0f0f0 inset, 0 1px 0 0 #f0f0f0 inset;
          transition: all 0.3s;
          .project_name {
            display: flex;
            font-size: 16px;
            align-items: center;
            // margin: 10px 0px;
            img {
              width: 40px;
              height: 40px;
            }
          }
          .project_introduce {
            display: flex;
            margin: 20px 0;
          }
          .url_goto {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
          }
        }
        .project:hover {
          position: relative;
          z-index: 1;
          box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
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
      flex-wrap: wrap;
      height: 200px;
      margin: 0px 20px 20px 20px;
      .s1 {
        width: 23%;
        display: flex;
        // justify-content: space-between;
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