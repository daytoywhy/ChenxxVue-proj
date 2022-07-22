import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import NProgress from './nProgress'
import Cookies from 'js-cookie'

const service: AxiosInstance = axios.create({
  timeout: 300000,
  baseURL: import.meta.env.VITE_APP_BASIC_API,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start()
    // config.headers.token = Cookies.get('token')
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done()
    return response.data
  },
  (error: any) => {
    ElMessage({
      message: error,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service