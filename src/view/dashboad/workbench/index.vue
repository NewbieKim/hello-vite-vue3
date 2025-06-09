<template>
  <div class="page-container">
    <div class="header">
      <div class="header-content">
        <span class="avatar" style="width: 72px;height: 72px;line-height: 72px;">
          <img src="https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640" alt="">
        </span>
        <div class="date-info">
          早安, kim, 开始您一天的工作吧！工欲善其事必先利其器！
        </div>
        <div class="summary-container">
          统计
        </div>
      </div>
    </div>
    <div class="container">
        <div class="left">
          <div class="top">
            项目地址
          </div>
          <div class="project-container">
            <div class="project flip-card" v-for="(item, index) in projectData" :key="index">
                  <div class="flip-inner">
                    <div class="front">
                      <span class="project_name">
                        <!-- <svg-icon :name="'link'" /> -->
                        <svg-icon class="svg-icon" :name="item.image" />
                        <span style="padding: 5px;">{{ item.title }}</span>
                      </span>
                      <div class="project_introduce">项目简介：{{ item.introduce }}</div>
                    </div>
                    <div class="back">
                      <div class="url_goto">
                        <div class="env-add"><a :href="item.dev_url">点击跳转开发环境</a></div>
                        <div class="env-add"><a :href="item.test_url">点击跳转测试环境</a></div>
                        <div class="env-add"><a :href="item.prod_url">点击跳转生产环境</a></div>
                      </div>
                    </div>
              </div>

            </div>
          </div>
        </div>
        <div class="right" style="display: flex;justify-content: center;align-items: center;">
          <img src="@/svg/svg/illustration.svg" alt="">
        </div>
    </div>
    <div class="sort-container">
      <div v-for="(item, index) in sortTable" :key="index">
        <h4 style="font-size: 18px;margin: 0 10px;display: flex;"><el-icon class="el-icon-paperclip" style="font-size: 18px;margin: 5px;"></el-icon>{{ item.title }}</h4>
        <div class="sort">
          <div class="s1 glow-card" v-for="(item1,index1) in item.data" :key="index1" @click="handleGo(item1)">
            <!-- link -->
            <div>
              <span class="project_name">
                <!-- <svg-icon :name="'link'" /> -->
                <img style="width: 80px;height: 80px" src="@/assets/vue-favicon.png" alt="">
              </span>
            </div>
              <div style="position: relative;">
                <p style="display: flex">{{ item1.name }}</p>
                <p>{{ item1.introduce }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="glow-card" style="width: 200px;height: 100px;"></div>
    <div class="flip-card">
      <div class="flip-inner">
        <div class="front">正面内容</div>
        <div class="back">背面内容</div>
      </div>
    </div>
    <div class="footer">这里是底部</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue'
  const projectData: Array<any> = reactive([
    {
      title: '讯易链',
      image: 'shequfuwu',
      introduce: '生命是一个不断发展的过程，不断地学习和探索，才能不断地进步。',
      test_url: '',
      dev_url: '',
      prod_url: ''
    },
    {
      title: '讯易链',
      image: 'cemianji',
      introduce: '生命是一个不断发展的过程，不断地学习和探索，才能不断地进步。',
      test_url: '',
      dev_url: '',
      prod_url: ''
    },
    {
      title: '讯易链',
      image: 'rangqizhang',
      introduce: '生命是一个不断发展的过程，不断地学习和探索，才能不断地进步。',
      test_url: '',
      dev_url: '',
      prod_url: ''
    },
    {
      title: 'Github',
      image: 'github',
      introduce: '众生皆具如来智慧德相；众生皆具如来智慧德相；众生皆具如来智慧德相；众生皆具如来智慧德相；众生皆具如来智慧德相',
      yx_url: '',
      test_url: 'https://github.com/NewbieKim/hello-vite-vue3/tree/master',
      pro_url: ''
    },
    {
      title: 'Vue',
      image: 'vue',
      introduce: '工欲善其事必先利其器',
      yx_url: '',
      test_url: 'https://v3.cn.vuejs.org/',
      pro_url: ''
    },
    {
      title: 'React',
      image: 'react',
      introduce: '重复 是为了更加坦荡地接受孤独',
      yx_url: '',
      test_url: 'https://react.docschina.org/docs/getting-started.html',
      pro_url: ''
    },
    {
      title: '智慧场馆',
      image: 'gym',
      introduce: '智慧场馆服务一体化',
      yx_url: '',
      test_url: 'http://sports.jinzhengtaoche.com:9097/shSports/index.html#/page/stadium/list',
      pro_url: ''
    },
    {
      title: '元洪在线',
      image: 'food',
      introduce: '一站式全球食材供采平台',
      yx_url: '',
      test_url: '',
      pro_url: 'https://www.yhspzx.com:17443/'
    },
    {
      title: '万匠大作',
      image: 'art',
      introduce: '高端艺术品交易平台',
      yx_url: 'https://axhub.im/ax9/fe5194ab73124b00/#g=1&id=8239mx&p=%E7%89%88%E6%9C%AC%E4%BF%AE%E8%AE%A2%E8%AE%B0%E5%BD%95',
      test_url: 'https://console.wjdz.art/mallYun-operator/#/dashboard',
      pro_url: 'https://console.wjdz.art/mallYun-operator/#/dashboard'
    },
  ])
  const sortTable: Array<any> = reactive([
    {
      title: '快捷入口',
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
      title: '快捷入口2',
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
          font-size: 18px;
          font-weight: bold;
          background: linear-gradient(90deg, #ff00cc, #3333ff, #00ccff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-flow 3s linear infinite;
      }
        @keyframes gradient-flow {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
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
        // 添加间隔
        gap: 10px;
        margin-bottom: 10px;
        .project {
          // 调整宽度以适应间隔
          width: calc(33% - 10px); 
          height: 150px;
          // display: flex;
          // justify-content: center;
          // align-items: center;
          // 盒子效果
          // padding: 24px;
          border: 0;
          border-radius: 10px;
          box-shadow: 1px 0 0 0 #f0f0f0, 0 1px 0 0 #f0f0f0, 1px 1px 0 0 #f0f0f0, 1px 0 0 0 #f0f0f0 inset, 0 1px 0 0 #f0f0f0 inset;
          transition: all 0.3s;
          .project_name {
            display: flex;
            font-size: 16px;
            align-items: center;
            // margin: 10px 0px;
            .svg-icon {
              width: 2.5rem;
              height: 2.5rem;
              fill: rgb(18 92 242);
            }
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
            // display: flex;
            // justify-content: space-between;
            // align-items: center;
            margin: 10px 0;
            font-size: 18px;
            .env-add {
              margin: 10px 0;
              a {
                color: #000;
                text-decoration: none;
              }
            }
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
      margin: 0px 20px 20px 20px;
      .s1 {
        width: 23%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        height: 120px;
        position: relative;
        background: #fff;
        margin: 10px;
        border: 1px solid #e3e5ea;
        left: -20px;
        border-radius: 10px;
      }
      .s1:hover {
        transform: translateY(-6px);
        transition: all .3s ease;
      }
    }
  }
}
</style>
<style>
.glow-card {
  background: #f7f6f6;
  position: relative;
  overflow: hidden;
}

.glow-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, 
    transparent, #08c96f, transparent);
  animation: rotate 3s linear infinite;
  opacity: 0;
  transition: opacity 0.3s;
}

.glow-card:hover::before {
  opacity: 1;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
<style>
.flip-card {
  width: 300px;
  height: 200px;
  perspective: 1000px;
}

.flip-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.flip-card:hover .flip-inner {
  transform: rotateY(180deg);
}

.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  border-radius: 10px;
  padding: 20px;
}

.front {
  background: #f5f5f5;
  text-align: left;
}

.back {
  background: #b9f8f6;
  transform: rotateY(180deg);
}
</style>