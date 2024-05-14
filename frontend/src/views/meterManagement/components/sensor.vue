<template>
  <div class="sensor_wrap">
    <div class="param_list_box">
      <div class="item" v-for="(ssd, indexS) in sensorData" :key="indexS">
        <span class="label">{{ ssd.label }}</span>
        <span class="value">{{ ssd.value }}</span>
        <span class="unit">{{ ssd.unit }}</span>
      </div>
    </div>

    <div class="communication_status_box">
      <span class="label">通讯状态:</span>
      <img v-if="communicationStatus" class="icon" src="../image/link.png" />
      <img v-else class="icon" src="../image/not_link.png" />
      <span class="status_text">{{
        communicationStatus ? "已连接" : "未连接"
      }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "Sensor"
})
</script>
<script setup>
// 通讯状态
const communicationStatus = ref(false)

// 传感器数据
const sensorData = ref([
  {
    label: "温度",
    value: "23.0",
    unit: "℃"
  },
  {
    label: "pH",
    value: "--",
    unit: ""
  },
  {
    label: "溶解氧",
    value: "--",
    unit: "mg/L"
  },
  {
    label: "电导率",
    value: "--",
    unit: "μS/cm"
  },
  {
    label: "浊度",
    value: "--",
    unit: "mg/L"
  },
  {
    label: "铵离子",
    value: "--",
    unit: "mg/L"
  },
  {
    label: "CODuv",
    value: "--",
    unit: "mg/L"
  },
  {
    label: "叶绿素",
    value: "--",
    unit: "mg/L"
  },
  {
    label: "藻密度",
    value: "--",
    unit: "mg/L"
  }
])
</script>

<style lang="scss" scoped>
.sensor_wrap {
  width: 100%;
  height: 100%;
  padding: 10px 0px 0px 20px;
  position: relative;
  // border: 1px solid red;

  .param_list_box {
    width: 600px;
    height: 100%;
    display: flex;
    flex-direction: column;
    // border: 1px solid red;

    .item {
      font-size: 22px;
      letter-spacing: 2px;
      height: 58px;

      .label {
        display: inline-block;
        width: 180px;
      }

      .value {
        font-size: 24px;
        font-family: SYHT-Bold;
      }

      .unit {
        margin-left: 20px;
        font-size: 16px;
      }
    }
  }

  .communication_status_box {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 23px;
    letter-spacing: 2px;

    .label {
      margin-right: 12px;
    }

    .icon {
      width: 26px;
      height: 26px;
      position: relative;
      top: 4px;
    }

    .status_text {
      font-size: 22px;
      margin-left: 10px;
    }
  }
}
</style>
