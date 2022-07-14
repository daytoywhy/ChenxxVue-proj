import pkg from '../../../../package.json'
import dayjs from "dayjs"
const updateTime = dayjs().format('YYYY-MM-DD hh:mm:ss')
export const appInfo = {
  ...pkg,
  updateTime
}