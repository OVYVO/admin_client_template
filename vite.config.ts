import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

/** @type {import('vite').UserConfig} */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://172.168.70.195:9789', //测试
        changeOrigin: true
      },
      '/api/v1': {
        target: 'http://172.168.70.195', //ceshi
        ws: true,
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/style/variable.less')}";`
        },
        javascriptEnabled: true
      }
    }
  },
  // 生产环境去掉console.log及debug
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
