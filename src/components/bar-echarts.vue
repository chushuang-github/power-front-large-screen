<template>
  <div ref="divRef" :style="{ width, height }">111</div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import useEcharts from "../hooks/useEcharts"

const props = defineProps({
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "100%"
  },
  echartDatas: {
    type: Array,
    default: () => []
  }
})

// 监听echartDatas的变化
watch(() => props.echartDatas, (newValue) => {
  setupEchart(newValue)
})

let divRef = ref(null)
let hyChart = null
onMounted(() => {
  setupEchart(props.echartDatas)
})

function setupEchart(echartDatas) {
  if(!hyChart) {
    hyChart = useEcharts(divRef.value)
  }
  let option = getOption(echartDatas)
  hyChart.setOption(option)
}

// 配置项
function getOption(echartDatas) {
  return {
    grid: {
      left: "5%",
      right: "5%",
      top: "30%",
      bottom: "5%",
      containLabel: true
    },
    tooltip: {},
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF"
        },
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "white"
      },
      data: echartDatas.map(item => item.name)
    },
    yAxis: {
      name: "个",
      nameTextStyle: {
        color: "white",
        fontSize: 13
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF"
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF"
        }
      },
      axisLabel: {
        color: "white"
      }
    },
    series: [
      {
        name: "销量",
        type: "bar",
        barWidth: 17,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#01B1FF" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#033BFF" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        data: echartDatas.map(item => item.value)
      }
    ]
  }
}
</script>

<style scoped></style>