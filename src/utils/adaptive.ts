import { ref } from 'vue'
export default function adaptive() {
  const screenRef = ref()
  const timer = ref(0)
  const scale = {
    width: '1',
    height: '1'
  }
  const baseWidth = 1920
  const baseHeight = 1080

  const baseProportionRate = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
    if (screenRef.value) {
      if (currentRate > baseProportionRate) {
        scale.width = (
          (window.innerHeight * baseProportionRate) / baseWidth
        ).toFixed(5)
        scale.height = (window.innerHeight / baseHeight).toFixed(5)
        screenRef.value.style.transform = `scale(${scale.width},${scale.height}) translate(-50%,-50%)`
        console.log(scale, 'scale');
      } else {
        scale.height = (
          window.innerWidth /
          baseProportionRate /
          baseHeight
        ).toFixed(5)
        scale.width = (window.innerWidth / baseWidth).toFixed(5)
        screenRef.value.style.transform = `scale(${scale.width},${scale.height}) translate(-50%,-50%)`
      }
    }
  }
  const resize = () => {
    clearTimeout(timer.value)
    timer.value = window.setTimeout(() => {
      calcRate()
    }, 200)
  }
  const screenDraw = () => {
    window.addEventListener('resize', resize)
  }
  const unScreenDraw = () => {
    window.removeEventListener('resize', resize)
  }
  return {
    screenRef,
    calcRate,
    screenDraw,
    unScreenDraw
  }
}