import { defineConfig, resolveConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// const resolve = (dir: string) => path.resolve(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 修改配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  base: './',
  server: {
    port: 4000,
    open: true,
    cors: true // 允许跨域
  },
  optimizeDeps: {
    include: ['element-plus/lib/locale/lang/zh-cn'],
  }
})
