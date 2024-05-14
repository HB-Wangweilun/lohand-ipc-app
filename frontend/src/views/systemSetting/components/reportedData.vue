<template>
  <div class="reported_data_wrap">
    <!-- <JsonEditors></JsonEditors> -->
    <el-segmented
      v-model="currentSegmented"
      :options="segmentedList"
      size="large"
      style="margin-bottom: 20px"
      @click="playClickSound"
    />

    <HTTP v-if="currentSegmented == 'HTTP'"></HTTP>
    <MQTT v-if="currentSegmented == 'MQTT'"></MQTT>
    <TCP v-if="currentSegmented == 'TCP'"></TCP>

    <div class="action_bottom_box">
      <SaveButton class="save_button" @save-click="saveClick()"
        >保存</SaveButton
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "ReportedData"
})
</script>
<script setup>
// import JsonEditors from "./jsonEditors.vue"
import SaveButton from "../../../components/global/saveButton.vue"
import HTTP from "./http.vue"
import MQTT from "./mqtt.vue"
import TCP from "./tcp.vue"
import { playClickSound } from "../../../utils/other.js"
import { useReportedDataStore } from "../../../store"

const reportedDataStore = useReportedDataStore()

// 选择模式列表
const segmentedList = ref(["HTTP", "MQTT", "TCP"])

// 当前选择的模式
const currentSegmented = ref("HTTP")

// 保存的点击事件
const saveClick = () => {
  switch (currentSegmented.value) {
    case "HTTP":
      console.log("HTTP-数据：", reportedDataStore.httpData)
      break
    case "MQTT":
      console.log("MQTT-数据：", reportedDataStore.mqttData)
      break
    case "TCP":
      console.log("TCP-数据：", reportedDataStore.tcpData)
      break

    default:
      break
  }
}
</script>

<style lang="scss" scoped>
@import url(../../../assets/css/segmented/segmented-1.scss);
.reported_data_wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .action_bottom_box {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
