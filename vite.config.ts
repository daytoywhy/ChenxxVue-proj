import { defineConfig, loadEnv } from 'vite'
import compress from 'vite-plugin-compress'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/

const pkg = require('./package.json')
const dayjs = require('dayjs')

const appInfo = {
  ...pkg,
  updateTime: dayjs().format('YYYY-MM-DD hh:mm:ss')
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  env.VITE_APP_INFO = JSON.stringify(appInfo)

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    base: './',
    plugins: [
      vue(),
      compress(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/styles/global.scss';"
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 29953,
      open: true,
      cors: true
    }
  }
})
