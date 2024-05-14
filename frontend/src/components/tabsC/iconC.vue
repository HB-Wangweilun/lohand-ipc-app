<template>
  <div class="icon_c_wrap">
    <!-- 参数设置 -->
    <img v-if="props.tag == 'init'" src="./image/init.png" />
    <img v-if="props.tag == 'init_a'" src="./image/init_a.png" />
    <img v-if="props.tag == 'runningMode'" src="./image/runningMode.png" />
    <img v-if="props.tag == 'runningMode_a'" src="./image/runningMode_a.png" />
    <img v-if="props.tag == 'runningParam'" src="./image/runningParam.png" />
    <img
      v-if="props.tag == 'runningParam_a'"
      src="./image/runningParam_a.png"
    />
    <img v-if="props.tag == 'runningFlow'" src="./image/runningFlow.png" />
    <img v-if="props.tag == 'runningFlow_a'" src="./image/runningFlow_a.png" />
    <img v-if="props.tag == 'singleControl'" src="./image/singleControl.png" />
    <img
      v-if="props.tag == 'singleControl_a'"
      src="./image/singleControl_a.png"
    />
    <img v-if="props.tag == 'peripheral'" src="./image/peripheral.png" />
    <img v-if="props.tag == 'peripheral_a'" src="./image/peripheral_a.png" />
    <img v-if="props.tag == 'communication'" src="./image/communication.png" />
    <img
      v-if="props.tag == 'communication_a'"
      src="./image/communication_a.png"
    />
    <img v-if="props.tag == 'alarm'" src="./image/alarm.png" />
    <img v-if="props.tag == 'alarm_a'" src="./image/alarm_a.png" />

    <!-- 历史数据 -->
    <img v-if="props.tag == 'metricalData'" src="./image/metricalData.png" />
    <img
      v-if="props.tag == 'metricalData_a'"
      src="./image/metricalData_a.png"
    />
    <img v-if="props.tag == 'realTimeData'" src="./image/realTimeData.png" />
    <img
      v-if="props.tag == 'realTimeData_a'"
      src="./image/realTimeData_a.png"
    />
    <img v-if="props.tag == 'curveGraph'" src="./image/curveGraph.png" />
    <img v-if="props.tag == 'curveGraph_a'" src="./image/curveGraph_a.png" />
    <!-- 日志管理 -->
    <img v-if="props.tag == 'runLog'" src="./image/runLog.png" />
    <img v-if="props.tag == 'runLog_a'" src="./image/runLog_a.png" />
    <img v-if="props.tag == 'alarmLog'" src="./image/alarmLog.png" />
    <img v-if="props.tag == 'alarmLog_a'" src="./image/alarmLog_a.png" />
    <img v-if="props.tag == 'operationLog'" src="./image/operationLog.png" />
    <img
      v-if="props.tag == 'operationLog_a'"
      src="./image/operationLog_a.png"
    />

    <!-- 系统设置 -->
    <img v-if="props.tag == 'reportedData'" src="./image/reportedData.png" />
    <img
      v-if="props.tag == 'reportedData_a'"
      src="./image/reportedData_a.png"
    />

    <!-- 仪表管理 -->
    <img v-if="props.tag == 'andan'" src="./image/andan.png" />
    <img v-if="props.tag == 'andan_a'" src="./image/andan_a.png" />
    <img v-if="props.tag == 'zonglin'" src="./image/zonglin.png" />
    <img v-if="props.tag == 'zonglin_a'" src="./image/zonglin_a.png" />
    <img v-if="props.tag == 'zongdan'" src="./image/zongdan.png" />
    <img v-if="props.tag == 'zongdan_a'" src="./image/zongdan_a.png" />
    <img v-if="props.tag == 'CODcr'" src="./image/CODcr.png" />
    <img v-if="props.tag == 'CODcr_a'" src="./image/CODcr_a.png" />
    <img v-if="props.tag == 'CODmn'" src="./image/CODmn.png" />
    <img v-if="props.tag == 'CODmn_a'" src="./image/CODmn_a.png" />
    <img v-if="props.tag == 'sensor'" src="./image/sensor.png" />
    <img v-if="props.tag == 'sensor_a'" src="./image/sensor_a.png" />
  </div>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "IconC"
})
</script>
<script setup>
const props = defineProps(["tag"])
</script>

<style lang="scss" scoped>
.icon_c_wrap {
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
