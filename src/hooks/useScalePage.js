// 大屏适配
import { onMounted, onUnmounted } from 'vue';
import _ from 'lodash'

function useScalPage(option) {
  const resizeFunc = _.throttle(function() {
    triggerScale()
  }, 100)

  onMounted(() => {
    triggerScale()
    window.addEventListener("resize", resizeFunc)
  })
  onUnmounted(() => {
    window.removeEventListener("resize", resizeFunc)
  })

  function triggerScale() {
    let targetX = option.targetX || 1920              // 设计稿的宽度
    let targetY = option.targetY || 1080              // 设计稿的高度
    let targetRatio = option.targetRatio || 16 / 9    // 设计稿的宽高比
    let currentX = document.documentElement.clientWidth || document.body.clientWidth
    let currentY = document.documentElement.clientHeight || document.body.clientHeight

    // 1.缩放比例
    let scaleRatio = currentX / targetX;
    let currentRatio = currentX / currentY  // 当前屏幕的宽高比
    let transformStr = ""

    // 当前屏幕的宽高比 > 目标屏幕的宽高比
    if (currentRatio >= targetRatio) {
      // 根据高度比率进行缩放
      scaleRatio = currentY / targetY
      // translateX(-50%); left:50%   让大屏在屏幕居中展示
      transformStr = `width: ${targetX}px; height: ${targetY}px; transform: scale(${scaleRatio}) translateX(-50%); left:50%;`
    } else {
      // 根据宽度的比率进行缩放
      transformStr = `width: ${targetX}px; height: ${targetY}px; transform:scale(${scaleRatio})`
    }
    let bodyEl = document.querySelector("body")
    // 2.需要修改缩放的原点
    bodyEl.setAttribute("style", transformStr)
  }
}

export default useScalPage