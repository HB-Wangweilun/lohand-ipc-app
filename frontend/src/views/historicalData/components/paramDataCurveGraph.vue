<template>
  <div class="param_data_curve_graph_wrap" id="curveEl" @click="playClickSound">
    <!-- ParamDataCurveGraph -->
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, nextTick } from "vue"
export default defineComponent({
  name: "ParamDataCurveGraph"
})
</script>
<script setup>
import * as echarts from "echarts"
import "echarts-gl"
import { playClickSound, generateToolTipEleFunc } from "../../../utils/other.js"

// props
const props = defineProps(["paramName", "dataList"])

// 曲线图容器 - Ref
// const curveBoxRef = ref("")

// 参数曲线图初始化函数
const paramDataCurveChartsInit = () => {
  // 曲线图容器元素
  let paramDataCurveChartsEle = document.getElementById("curveEl")

  // 曲线图容器对象
  let paramDataCurveCharts = echarts.init(paramDataCurveChartsEle, null)

  paramDataCurveCharts.showLoading({
    text: "加载中",
    maskColor: "rgba(0,0,0,0.1)",
    textColor: "#ffffff",
    color: "#2574fb"
  })

  setTimeout(() => {
    paramDataCurveCharts.hideLoading()
  }, 1000)

  /* xxx-------------------------------------- */
  let result = props.dataList

  console.log(result)
  let xData = result.map((item) => {
    return item.name
  })
  let keys = ["value"],
    seriesData = []
  let color = ["27, 216, 137", "0, 124, 250"]
  keys.forEach((key, index) => {
    seriesData.push({
      name: props.paramName,
      data: result.map((item) => {
        return item[key]
      }),
      type: "line",
      yAxisIndex: 0,
      symbol: "none",
      symbolSize: 7,
      barWidth: 14,
      splitNumber: 6,
      smooth: false,
      itemStyle: {
        color: `rgba(${color[index]},1)`
      },
      lineStyle: {
        color: `rgba(${color[index]},1)`,
        width: 2
      },
      areaStyle: {
        opacity: 1,
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          type: "linear",
          global: false,
          colorStops: [
            {
              offset: 0,
              color: `rgba(${color[index]},0.35)`
            },
            {
              offset: 0.8,
              color: "rgba(6, 8, 41,0.2)"
            }
          ]
        },
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowBlur: 10
      }
    })
    seriesData.push({
      name: key + "数",
      data: [
        {
          coords: result.map((item) => {
            return [item.name, item[key]]
          })
        }
      ],
      type: "lines",
      coordinateSystem: "cartesian2d",
      zlevel: 1,
      polyline: true,
      smooth: true,
      symbol: "circle",
      effect: {
        show: true,
        trailLength: 0.4,
        symbol: "circle",
        period: 120,
        symbolSize: 8
      },
      lineStyle: {
        normal: {
          color: `rgba(${color[index]},1)`,
          width: 0,
          opacity: 0,
          curveness: 0
        }
      }
    })
  })

  // 曲线图配置
  let option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      className: "curve_graph_tooltip_wrap",
      axisPointer: {
        type: "line"
      },
      formatter: function (params) {
        console.log(params)
        return generateToolTipEleFunc(params[0])
      },
      backgroundColor: "transparent",
      borderColor: "rgba(58, 16, 125, 0)",
      textStyle: {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    grid: {
      x: 40,
      y: 20,
      x2: 30,
      y2: 40
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xData,
      axisPointer: {
        handle: {
          show: false
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: "rgba(255,255,255,1)"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 18,
        interval: 0,
        color: "white",
        fontFamily: "SYHT-Regular"
      }
    },
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            type: [3, 2],
            dashOffset: 0,
            color: "rgba(166, 199, 254,0.6)"
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 2,
            color: "rgba(255,255,255,0.6)"
          }
        },
        axisLabel: {
          fontSize: 16,
          interval: "auto",
          color: "white",
          fontFamily: "SYHT-Regular"
        }
      }
    ],
    series: seriesData
  }

  // 设置曲线图配置
  paramDataCurveCharts.setOption(option)
}

// nextTick 异步函数
nextTick(() => {
  // 执行初始化图表
  paramDataCurveChartsInit()
})

// Init
onMounted(() => {})
</script>

<style lang="scss" scoped>
.param_data_curve_graph_wrap {
  width: 100%;
  height: 93%;
  border: 0px solid rgb(27, 216, 137);
  // background-color: transparent
}
</style>
