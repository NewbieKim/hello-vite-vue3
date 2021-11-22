import { createApp } from 'vue';
import App from './App.vue';
import { router, setupRouter } from './router';
import { setupStore } from './store';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
// import SvgIcon from 'vue-svgicon' // vue3版本语法报错
import svgIcon from '@/svg/index.vue'
import '@/permission';
// base组件
import { Base } from './utils/base';
// 样式文件
import "@/style/base.scss";


// 对vue进行类型补充说明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}
// 改造下 写法显得简便
async function initApp() {
  const app = createApp(App);
  // 分环境处理
  if (process.env.NODE_ENV === 'development') {
    if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
    // 这里__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue赋值一个createApp实例
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
    }
    app.config.devtools = true
  }
  setupRouter(app); // 建立路由 添加到app
  setupStore(app);
  app.use(ElementPlus);
  app.config.devtools = true;
  app.mount('#app');
  app.component('svg-icon', svgIcon)
  app.config.globalProperties.Base = new Base();
}
initApp()

// createApp(App).use(router).mount('#app')
