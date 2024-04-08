<template>
  <div class="real_time_data_wrap">
    <!-- <RealTimeDataCard
      :class="{
        is_bottom: i % 2 != 0
      }"
      v-for="i in 9"
      :key="i"
    ></RealTimeDataCard> -->
    <div class="top">
      <RealTimeDataCard
        v-for="(itemT, indexT) in topListComp"
        :key="indexT"
        :cId="`waterPolo_top_${indexT}`"
        :paramName="itemT.paramName"
        :unit="itemT.paramUnit"
        :value="itemT.paramValue"
      ></RealTimeDataCard>
    </div>

    <div class="bottom">
      <RealTimeDataCard
        v-for="(itemB, indexB) in bottomListComp"
        :key="indexB"
        :cId="`waterPolo_bottom_${indexB}`"
        :paramName="itemB.paramName"
        :unit="itemB.paramUnit"
        :value="itemB.paramValue"
      ></RealTimeDataCard>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue"
export default defineComponent({
  name: "RealTimeData"
})
</script>
<script setup>
import RealTimeDataCard from "./realTimeDataCard.vue"
import { selectHomeParamDataApi } from "../../../api/home.js"
import UnitJson from "../../../data/unit.json"

// 参数数据列表
const paramDataList = ref([
  {
    paramName: "pH",
    paramValue: "--",
    paramUnit: ""
  },
  {
    paramName: "氨氮",
    paramValue: "--",
    paramUnit: "mg/L"
  },
  {
    paramName: "余氯",
    paramValue: "--",
    paramUnit: "mg/L"
  },
  {
    paramName: "CODcr",
    paramValue: "--",
    paramUnit: "mg/L"
  },
  {
    paramName: "CODmn",
    paramValue: "--",
    paramUnit: "mg/L"
  },
  {
    paramName: "浊度",
    paramValue: "--",
    paramUnit: "NTU"
  },
  {
    paramName: "ORP",
    paramValue: "--",
    paramUnit: "mV"
  },
  {
    paramName: "溶解氧",
    paramValue: "--",
    paramUnit: "mg/L"
  },
  {
    paramName: "电导率",
    paramValue: "--",
    paramUnit: "μS/cm"
  }
])

// topListComp
const topListComp = computed(() => {
  return paramDataList.value.slice(0, 4)
})

// bottomListComp
const bottomListComp = computed(() => {
  return paramDataList.value.slice(4, 9)
})

// 处理参数数据的函数
const disposeParamDataFunc = (params) => {
  if (params == null) return
  let nParamData = []
  for (const param in params) {
    // console.log(param)
    nParamData.push({
      paramName: param,
      paramValue: params[param] == "--" ? "--" : Number(params[param]),
      paramUnit: UnitJson.unitKeys[param] ? UnitJson.unitKeys[param] : ""
    })
  }

  paramDataList.value = nParamData
  console.log(paramDataList.value)
}

// 查询参数数据的函数
const selectHomeParamDataFunc = async () => {
  await selectHomeParamDataApi().then((res) => {
    disposeParamDataFunc(res.data.checkDataMap)
  })
}

// init
onMounted(() => {
  selectHomeParamDataFunc()
})
</script>

<style lang="scss" scoped>
.real_time_data_wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 44px 55px 0px 0px;

  // .real_time_data_item {
  // }

  // .is_bottom {
  //   position: relative;
  //   top: 350px;
  // }

  .top {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0px 0px 60px 0px;
    padding: 0px 180px 0px 180px;
  }

  .bottom {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0px 10px 0px 10px;
  }
}
</style>
