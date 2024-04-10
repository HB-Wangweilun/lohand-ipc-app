<template>
  <div class="water_polo" :id="cId">
    <div class="top_content">
      <img
        class="icon"
        v-if="props.paramName == '氨氮'"
        src="../image/andan.png"
      />
      <img class="icon" v-if="props.paramName == 'pH'" src="../image/pH.png" />
      <img
        class="icon"
        v-if="props.paramName == '余氯'"
        src="../image/yulv.png"
      />
      <img
        class="icon"
        v-if="props.paramName == 'CODcr'"
        src="../image/CODcr.png"
      />
      <img
        class="icon"
        v-if="props.paramName == 'COD'"
        src="../image/CODcr.png"
      />
      <img
        class="icon"
        v-if="props.paramName == 'CODmn'"
        src="../image/CODmn.png"
      />
      <img
        class="icon"
        v-if="props.paramName == '浊度'"
        src="../image/zhuodu.png"
      />
      <img
        class="icon"
        v-if="props.paramName == 'ORP'"
        src="../image/ORP.png"
      />
      <img
        class="icon"
        v-if="props.paramName == '溶解氧'"
        src="../image/rongjieyang.png"
      />
      <img
        class="icon"
        v-if="props.paramName == '电导率'"
        src="../image/diandaolv.png"
      />
      <img
        class="icon"
        v-if="props.paramName == '总磷'"
        src="../image/zonglin.png"
      />
      <img
        class="icon"
        v-if="props.paramName == '总氮'"
        src="../image/zongdan.png"
      />
      <img
        class="icon"
        v-if="props.paramName == '温度'"
        src="../image/temp.png"
      />
      <span class="paramName">{{ props.paramName }}</span>
    </div>
    <span class="unit">{{ props.unit }}</span>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  nextTick,
  onBeforeUnmount
} from "vue"
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
let ecEl
let waterPoloEc
const ecInit = () => {
  console.log(cId.value, "水球ID")
  ecEl = document.getElementById(cId.value)
  waterPoloEc = echarts.init(ecEl, null, { renderer: "svg" })
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
        waveAnimation: true, //停止动画 动画占用cpu过高 核心代码
        animationDuration: 0, //停止动画 动画占用cpu过高 核心代码
        animationDurationUpdate: 0, //停止动画 动画占用cpu过高 核心代码
        amplitude: 8, //水波振幅
        data: [0.5], // data个数代表波浪数
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
            borderColor: "rgba(39, 113, 250,0.6)"
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
  console.log(props)
})

onBeforeUnmount(() => {
  waterPoloEc.dispose()
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
