import { ElMessage } from "element-plus";

const message = (message: string): any => {
  ElMessage({
    showClose: false,
    message
  })
}

const messageSuccess = (message: string): any => {
  ElMessage({
    type: 'success',
    message,
    showClose: true,
  })
}

const messageError = (message: string): any => {
  ElMessage({
    type: 'error',
    message,
    showClose: true,
  })
}

const messageWarning = (message: string): any => {
  ElMessage({
    type: 'warning',
    message,
    showClose: true,
  })
}

export { message, messageWarning, messageError, messageSuccess }