<template>
  <div ref="divRef" :style="{ width, height }">111</div>
</template>

<script setup>
import { onMounted, ref } from "vue"
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

let divRef = ref(null)
let hyChart = null
onMounted(() => {
  // vue里面的hooks函数，可以在函数里面写
  hyChart = useEcharts(divRef.value)
  let option = getOption(props.echartDatas)
  hyChart.setOption(option)
})

// 配置项
function getOption(pieDatas = []) {
  let colors = pieDatas.map((item) => {
    return item.color
  })

  let data = pieDatas.map((item) => {
    return {
      value: item.value,
      name: item.name
    }
  })

  let total = pieDatas.reduce((a, b) => {
    return a + b.value * 1
  }, 0)

  return {
    color: colors,
    title: {
      text: `{nameSty| 充电桩总数}\n{number|${total}}`,
      top: "50%",
      left: "30%",
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: "white",
            padding: [10, 0],
          },
          number: {
            fontSize: 24,
            color: "white",
            padding: [4, 0, 0, 20],
          }
        }
      }
    },
    legend: {
      orient: "vertical",
      right: "10%",
      top: "18%",
      itemGap: 20,
      itemWidth: 16,
      itemHeigth: 16,
      icon: "rect",
      formatter: function (name) {
        let currentItem = pieDatas.find((item) => item.name === name)
        return (
          "{nameSty|" + currentItem.name + "}\n" +
          "{numberSty|" + currentItem.value + "个 }" +
          "{preSty|" + currentItem.percentage + "}"
        )
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: "#FFFFFF",
            padding: [10, 14]
          },
          numberSty: {
            fontSize: 12,
            color: "#40E6ff",
            padding: [0, 0, 0, 14]
          },
          preSty: {
            fontSize: 12,
            color: "#40E6ff"
          }
        }
      }
    },
    series: [
      {
        type: "pie",
        center: ["40%", "57%"],
        radius: ["30%", "75%"],
        label: {
          show: false
        },
        data,
        roseType: "area"
      }
    ]
  }
}
</script>

<style scoped></style>