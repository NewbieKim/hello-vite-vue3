import { createApp } from 'vue';
import App from './App.vue';
import { router, setupRouter } from './router';
import { setupStore } from './store';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import '@/permission';
// base组件
import { Base } from './utils/base';
// 样式文件
import "@/style/base.scss";


// 改造下 写法显得简便
async function initApp() {
  const app = createApp(App);
  setupRouter(app); // 建立路由 添加到app
  setupStore(app);
  app.use(ElementPlus)
  app.mount('#app');
  app.config.globalProperties.Base = new Base();
}
initApp()

// createApp(App).use(router).mount('#app')
