//导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  minimum: 0.3,
  easing: 'ease', //动画模式
  speed: 500, //速度
  showSpinner: true, //是否展示加载
  trickleSpeed: 200
})


export default NProgress