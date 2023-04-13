<template>
  <main class="screen-bg">
    <div class="header"></div>

    <div class="left-top">
      <PieEcharts :echartDatas="chargingPile" />
    </div>
    <div class="left-bottom">
      <LineEcharts :echartDatas="processMonitoring" />
    </div>

    <div class="right-top"></div>
    <div class="right-center">
      <BarEcharts :echartDatas="chargingStatistics" />
    </div>
    <div class="right-bottom">
      <RightBottomSvg :dots="exceptionMonitoring" />
    </div>

    <div class="center">
      <CenterSvg />
    </div>
    <div class="bottom"></div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import PieEcharts from "../components/pie-echarts.vue"
import LineEcharts from "../components/line-echarts.vue"
import BarEcharts from "../components/bar-echarts.vue"
import RightBottomSvg from "../components/right-bottom-svg.vue"
import CenterSvg from "../components/center-svg.vue"
import { getPowerScreenData } from "../services"
import { 
  chargingPileData, 
  processMonitoringData, 
  chargingStatisticsData
} from "../config/home-data"

// 充电桩饱和比例
let chargingPile = ref(chargingPileData)
// 流程监控
let processMonitoring = ref(processMonitoringData)
// 充电数据统计
let chargingStatistics = ref(chargingStatisticsData)
// 异常监控
let exceptionMonitoring = ref([])

getPowerScreenData().then(res => {
  chargingPile.value = res.data.chargingPile.data
  processMonitoring.value = res.data.processMonitoring.data
  chargingStatistics.value = res.data.chargingStatistics.data
  exceptionMonitoring.value = res.data.exceptionMonitoring.data
})

</script>

<style scoped>
.screen-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.header {
  position: absolute;
  top: 21px;
  left: 0px;
  right: 0;
  height: 56px;
  background-image: url("../assets/images/bg_header.svg");
  background-repeat: no-repeat;
}

.left-top {
  position: absolute;
  top: 116px;
  left: 16px;
  width: 536px;
  height: 443px;
  background-image: url("../assets/images/bg_left-top.svg");
  background-repeat: no-repeat;
}

.left-bottom {
  position: absolute;
  bottom: 49px;
  left: 16px;
  width: 536px;
  height: 443px;
  background-image: url("../assets/images/bg_left_bottom.svg");
  background-repeat: no-repeat;
}

.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px; 
  background-image: url("../assets/images/bg_right_top.svg");
  background-repeat: no-repeat;
}

.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;
  background-image: url("../assets/images/bg_right_center.svg");
  background-repeat: no-repeat;
}

.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/images/bg_right_bottom.svg");
  background-repeat: no-repeat;
}

.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px; 
}

.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;
  background-image: url("../assets/images/bg_bottom.svg");
  background-repeat: no-repeat;
}
</style>