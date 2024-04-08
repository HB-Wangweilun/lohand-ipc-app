<template>
  <div class="water_polo" :id="cId">
    <div class="top_content">
      <img class="icon" src="../image/andan.png" />
      <span class="paramName">{{ props.paramName }}</span>
    </div>
    <span class="unit">{{ props.unit }}</span>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, nextTick } from "vue"
export default defineComponent({
  name: "WaterPolo"
})
</script>
<script setup>
import * as echarts from "echarts"
import "echarts-liquidfill/src/liquidFill.js"
// import "echarts-gl"
import { generateLetterPrefixedId } from "../../../utils/other.js"

// props
const props = defineProps([
  "cId",
  "paramName",
  "value",
  "unit",
  "scope",
  "status"
])

// nextTick
nextTick(() => {
  ecInit()
})

// EC init
const ecInit = () => {
  console.log(cId.value, "水球ID")
  let ecEl = document.getElementById(cId.value)
  let waterPoloEc = echarts.init(ecEl, null, { renderer: "svg" })
  // 水球内部数据--蓝色
  // var value = 0.72
  // // 水球颞部数据--灰色
  // var value3 = 76
  // var value1 = 75.2
  // var value2 = 75.2

  // var data = [value, value, value]

  let option = {
    backgroundColor: "transparent", //背景色
    series: [
      {
        type: "liquidFill", //水位图
        radius: "86%", //显示比例
        center: ["50%", "50%"], //中心点
        amplitude: 14, //水波振幅
        data: [0.5, 0.5, 0.5], // data个数代表波浪数
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#446bf5"
              },
              {
                offset: 1,
                color: "#2ca3e2"
              }
            ],
            globalCoord: false
          }
        ], //波浪颜色
        backgroundStyle: {
          borderWidth: 1, //外边框
          // borderColor: '#23cc72', //边框颜色
          color: "RGBA(51, 66, 127, 0.4)" //边框内部填充部分颜色
        },
        label: {
          //标签设置
          position: ["50%", "64%"],
          formatter: props.value, //显示文本,
          fontSize: "36", //文本字号,
          color: "#fff"
        },
        outline: {
          // show: false
          borderDistance: 0,
          itemStyle: {
            borderWidth: 1,
            borderColor: "rgba(24, 40, 101,0.7)"
          }
        }
      }
    ]
  }

  waterPoloEc.setOption(option)
}

const cId = ref("")

onMounted(() => {
  cId.value = generateLetterPrefixedId()
})
</script>

<style lang="scss" scoped>
.water_polo {
  // border: 1px solid red;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  position: relative;

  .top_content {
    position: absolute;
    top: 16%;
    left: 50%;
    transform: translateX(-50%);
    line-height: 50px;
    // height: 50px;
    z-index: 99;
    // border: 1px solid red;

    .icon {
      width: 36px;
      margin-right: 10px;
    }

    .paramName {
      font-size: 24px;
      letter-spacing: 3px;
      font-family: SYHT-Bold;
      position: relative;
      top: -8px;
    }
  }

  .unit {
    font-size: 18px;
    position: absolute;
    top: 78%;
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 2px;
    margin-left: 2px;
    z-index: 99;
    font-family: SYHT-Regular;
  }
}

.water_polo:active {
  transform: scale(0.9);
  transition: 0.3s;
}
</style>
