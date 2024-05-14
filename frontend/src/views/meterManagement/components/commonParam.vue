<template>
  <div class="common_param_wrap">
    <div class="one_data_box data_list_box">
      <div
        class="item"
        v-for="(dO, indexOne) in showDataComp.dataOne"
        :key="indexOne"
      >
        <span class="label">{{ dO.label }}</span>
        <span class="value">{{ dO.value }}</span>
        <span class="unit">{{ dO.unit ? dO.unit : "" }}</span>
      </div>
    </div>
    <div class="two_data_box data_list_box">
      <div
        class="item"
        v-for="(tO, indexTwo) in showDataComp.dataTwo"
        :key="indexTwo"
      >
        <span class="label">{{ tO.label }}</span>
        <span class="value">{{ tO.value }}</span>
        <span class="unit">{{ tO.unit ? tO.unit : "" }}</span>
      </div>
    </div>
    <div class="three_data_box data_list_box">
      <div
        class="item"
        v-for="(TrO, indexThree) in showDataComp.dataThree"
        :key="indexThree"
      >
        <span class="label">{{ TrO.label }}</span>
        <span class="value">{{ TrO.value }}</span>
        <span class="unit">{{ TrO.unit ? TrO.unit : "" }}</span>
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
import { defineComponent, ref, onMounted, computed } from "vue"
export default defineComponent({
  name: "CommonParam"
})
</script>
<script setup>
import mockData from "../data/commonParamData.json"
// props
const props = defineProps(["paramName"])

// showDataComp
const showDataComp = computed(() => {
  let dataO = {
    dataOne: mockData.dataOne,
    dataTwo: mockData.dataTwo,
    dataThree: mockData.dataThree
  }

  // 切换对应的label
  dataO.dataOne[0].label = props.paramName

  return dataO
})

// 通讯状态
const communicationStatus = ref(false)

// init
onMounted(() => {
  mockData.dataOne[0].label = props.paramName
})
</script>

<style lang="scss" scoped>
.common_param_wrap {
  width: 100%;
  height: 100%;
  padding: 10px 0px 0px 20px;
  // border: 1px solid red;
  display: flex;
  flex-direction: row;
  position: relative;

  .data_list_box {
    // border: 1px solid red;
    height: 100%;
    width: 580px;
    display: flex;
    flex-direction: column;

    .item {
      display: flex;
      flex-direction: row;
      height: 52px;
      // line-height: 48px;

      .label {
        display: inline-block;
        width: 260px;
        font-size: 20px;
        letter-spacing: 2px;
      }

      .value {
        font-size: 22px;
        letter-spacing: 2px;
        font-family: SYHT-Bold;
      }

      .unit {
        font-size: 14px;
        letter-spacing: 2px;
        margin-left: 24px;
        position: relative;
        top: 10px;
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
