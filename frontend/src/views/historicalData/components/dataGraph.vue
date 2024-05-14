<template>
  <div class="data_graph_wrap">
    <div class="header_box">
      <div class="param_select_tabs_box">
        <div
          :class="{
            param_item_box: true,
            is_active: currentParamName == psl.paramName
          }"
          v-for="(psl, indexP) in paramSelectList"
          :key="indexP"
          @click="paramItemClick(psl)"
        >
          <div class="content">
            <DataGraphImg
              :current-param-name="currentParamName"
              :param-name="psl.paramName"
            ></DataGraphImg>
            <span class="param_name">{{ psl.paramName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mode_tabs_box">
      <div class="mode_tabs_wrap">
        <div class="mode_tab_item_box">
          <span
            :class="{
              mode_name: true,
              is_active: currentMode == msd
            }"
            v-for="(msd, indexM) in modeSelectData"
            :key="indexM"
            @click="modeItemClick(msd)"
            ><span class="text">
              {{ msd == "day" ? "日" : msd == "week" ? "周" : "月" }}
              <span v-if="currentMode == msd" class="bar"></span>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="chart_box">
      <ParamDataCurveGraph
        v-if="isCharts"
        :data-list="chartData"
        :param-name="currentParamName"
      ></ParamDataCurveGraph>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue"
export default defineComponent({
  name: "DataGraph"
})
</script>
<script setup>
import DataGraphImg from "./dataGraphImg.vue"
import ParamDataCurveGraph from "./paramDataCurveGraph.vue"
import { playClickSound } from "../../../utils/other.js"
import { selectParamCurveDataApi } from "../../../api/historicalData.js"
import { useParamHistoricalDataStore } from "../../../store"

const paramHistoricalDataStore = useParamHistoricalDataStore()

// 模式选择点击事件
const modeItemClick = (mode) => {
  playClickSound()
  currentMode.value = mode
  console.log(currentMode.value)
  selectDataFunc()
}

// 参数点击事件
const paramItemClick = (item) => {
  playClickSound()
  currentParamName.value = item.paramName
  selectDataFunc()
}

// dataListComp
// const dataListComp = computed(() => {
//   let list
//   dataList.map((item) => {
//      let newKes = { name:'' }
//   })

// })

// dataList ComP
const dataListComp = computed(() => {
  let list = []
  switch (currentMode.value) {
    case "day":
      list = [
        { name: "00:00", value: 25 },
        { name: "01:00", value: 50 },
        { name: "02:00", value: 29 },
        { name: "03:00", value: 26 },
        { name: "04:00", value: 30 },
        { name: "05:00", value: 70 },
        { name: "06:00", value: 75 },
        { name: "07:00", value: 26 },
        { name: "08:00", value: 36 },
        { name: "09:00", value: 62 },
        { name: "10:00", value: 43 },
        { name: "11:00", value: 75 },
        { name: "12:00", value: 26 },
        { name: "13:00", value: 24 },
        { name: "14:00", value: 75 },
        { name: "15:00", value: 26 },
        { name: "16:00", value: 36 },
        { name: "17:00", value: 62 },
        { name: "18:00", value: 43 },
        { name: "19:00", value: 75 },
        { name: "20:00", value: 26 },
        { name: "21:00", value: 24 },
        { name: "22:00", value: 75 },
        { name: "23:00", value: 26 }
      ]
      break

    case "week":
      list = [
        { name: "星期一", value: 25 },
        { name: "星期二", value: 50 },
        { name: "星期三", value: 29 },
        { name: "星期四", value: 26 },
        { name: "星期五", value: 30 },
        { name: "星期六", value: 70 },
        { name: "星期日", value: 75 }
      ]
      break
    case "month":
      list = [
        { name: "1日", value: 25 },
        { name: "2日", value: 50 },
        { name: "3日", value: 29 },
        { name: "4日", value: 26 },
        { name: "5日", value: 30 },
        { name: "6日", value: 70 },
        { name: "7日", value: 75 },
        { name: "8日", value: 26 },
        { name: "9日", value: 36 },
        { name: "10日", value: 62 },
        { name: "11日", value: 43 },
        { name: "12日", value: 75 },
        { name: "13日", value: 26 },
        { name: "14日", value: 24 },
        { name: "15日", value: 75 },
        { name: "16日", value: 26 },
        { name: "17日", value: 36 },
        { name: "18日", value: 62 },
        { name: "19日", value: 43 },
        { name: "20日", value: 75 },
        { name: "21日", value: 26 },
        { name: "22日", value: 24 },
        { name: "23日", value: 75 },
        { name: "24日", value: 26 },
        { name: "25日", value: 62 },
        { name: "26日", value: 43 },
        { name: "27日", value: 75 },
        { name: "28日", value: 26 },
        { name: "29日", value: 24 },
        { name: "30日", value: 75 },
        { name: "31日", value: 26 }
      ]
      break
    default:
      break
  }
  return list
})

// 数据查询函数
const selectDataFunc = async () => {
  let data = {
    param: currentParamName.value,
    dateFlag: currentMode.value
  }
  await selectParamCurveDataApi(data).then((res) => {
    let nData = res.data.map((item) => {
      return {
        name: item.dataTime,
        value: item.paramValue == "--" ? 0 : Number(item.paramValue)
      }
    })
    // for (let i = 0; i < 50; i++) {
    //   nData.push({
    //     name: "2024-05-06 14:29:59",
    //     value: nData[0].value
    //   })
    // }
    chartData.value = nData
    isCharts.value = false
    setTimeout(() => {
      isCharts.value = true
    }, 100)
    console.log(nData, "数据曲线图数据")
  })
}

/* 数据 ---------------------------------------------- */
// 当前选择的参数
const currentParamName = ref("COD")

// 当前选择的模式   日-day / 周-week / 月-month
const currentMode = ref("day")

// 模式选择数据
const modeSelectData = ["day", "week", "month"]

// 显示图表的标识
const isCharts = ref(false)

// 参数选择列表
const paramSelectList = ref([
  {
    paramName: "温度",
    label: "温度"
  },
  {
    paramName: "总磷",
    label: "总磷"
  },
  {
    paramName: "浊度",
    label: "浊度"
  },
  {
    paramName: "电导率",
    label: "电导率"
  },
  {
    paramName: "pH",
    label: "pH"
  },
  {
    paramName: "COD",
    label: "COD"
  },
  {
    paramName: "溶解氧",
    label: "溶解氧"
  },
  {
    paramName: "氨氮",
    label: "温度"
  },
  {
    paramName: "总氮",
    label: "温度"
  }
])

// 图表展示数据
const chartData = ref([])

// Init
onMounted(() => {
  if (paramHistoricalDataStore.currentHomeClickParamName != "")
    currentParamName.value = paramHistoricalDataStore.currentHomeClickParamName

  selectDataFunc()
})
</script>

<style lang="scss" scoped>
.data_graph_wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .header_box {
    width: 100%;
    height: 9%;
    background-color: #3577f1;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow:
      1px 1px 4px rgba(255, 255, 255, 0.3),
      -1px -1px 4px rgba(255, 255, 255, 0.3);
    padding: 0px 0px 0px 0px;
    position: relative;

    .param_select_tabs_box {
      // width: 100%;
      // border: 1px solid red;
      // width: 83.4%;
      border-radius: 8px;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 14px 0px 0px 22px;
      background: rgba(0, 0, 0, 0.1);

      .param_item_box {
        // padding: 0px 60px 0px 60px;
        // border: 1px solid red;
        width: 180px;
        height: 46px;
        line-height: 46px;
        border-radius: 8px;
        margin-right: 20px;
        position: relative;

        box-sizing: border-box;
        text-align: center;
        // padding-left: 60px;
        // background-color: red;

        .content {
          // display: flex;
          // flex-direction: row;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 10px;
          right: 0;
          margin: auto;
          // border: 1px solid red;
          width: 104px;

          .param_name {
            font-size: 18px;
            font-family: SYHT-Regular;
            letter-spacing: 2px;
            margin-left: 2px;
          }
        }
      }

      .is_active {
        background-color: white;
        color: #1d4ed8;
        position: relative;
      }

      .is_active::before {
        content: ""; /* 必须设置，即使不添加任何内容 */
        display: inline-block; /* 或者 block，根据需求 */
        width: 102%; /* 设置宽度 */
        height: 50px; /* 设置高度 */
        border-radius: 12px;
        position: absolute;
        top: -4px;
        left: -4px;
        border: 2px solid rgba(255, 255, 255, 0.8);
      }
    }
  }

  .mode_tabs_box {
    height: 7%;
    // border: 1px solid red;
    position: relative;

    .mode_tabs_wrap {
      width: 180px;
      height: 100%;
      // border: 1px solid red;
      position: absolute;
      top: 0;
      right: 26px;

      .mode_tab_item_box {
        // border: 1px solid red;
        width: 100%;
        height: 100%;
        line-height: 50px;
        display: flex;

        .mode_name {
          width: 69px;
          // padding: 0px 30px 0px 30px;
          display: inline-block;
          text-align: center;
          // border: 1px solid red;

          .text {
            font-size: 20px;
            font-family: SYHT-Regular;
            position: relative;

            .bar {
              display: inline-block;
              height: 2px;
              width: 100%;
              background: #c2e3ff;
              position: absolute;
              bottom: -6px;
              left: 0;
            }
          }
        }

        .is_active {
          .text {
            font-family: SYHT-Bold;
          }
        }
      }
    }
  }

  .chart_box {
    width: 100%;
    height: 89%;
    // border: 1px solid red;
  }
}
</style>
