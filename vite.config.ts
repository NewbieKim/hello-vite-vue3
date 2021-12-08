import { defineConfig, resolveConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import visualizer from "rollup-plugin-analyzer";
import path from 'path'
import { createSvg } from './src/svg/index.ts'

// const resolve = (dir: string) => path.resolve(__dirname, dir);
// https://vitejs.dev/config/
const plugins = [];
// 打包生产环境才引入的插件
// process.env.NODE_ENV === "production"
if (1) {
    // 打包依赖展示
    plugins.push(
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        })
    );
}
export default defineConfig({
  plugins: [
    vue(),
    createSvg('./src/svg/svg/'),
    ...plugins
  ],
  // 修改配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  base: './',
  server: {
    port: 5000,
    open: true,
    cors: true // 允许跨域
  },
  optimizeDeps: {
    include: ['element-plus/lib/locale/lang/zh-cn'],
  }
})
