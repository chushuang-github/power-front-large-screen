import * as echarts from "echarts"
import { onUnmounted } from "vue"

function useEcharts(divEl) {
  let echartsInstance = echarts.init(divEl, null, { renderer: "svg" })

  const setOption = (option) => {
    echartsInstance.setOption(option)
  }

  const resizeEchart = () => {
    echartsInstance.resize()
  }

  onUnmounted(() => {
    // 销毁实例
    echartsInstance.dispose()
  })

  return {
    echartsInstance,
    setOption,
    resizeEchart
  }
}

export default useEcharts