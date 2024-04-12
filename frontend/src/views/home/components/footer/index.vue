<template>
  <div class="home_footer_wrap">
    <!-- <div class="top">
      <paramCard
        :param-name="'氨氮'"
        :param-value="200"
        :param-unit="'mg/L'"
      ></paramCard>
      <paramCard
        :param-name="'CODcr'"
        :param-value="0.306"
        :param-unit="'mg/L'"
      ></paramCard>
      <paramCard
        :param-name="'CODmn'"
        :param-value="0.306"
        :param-unit="'mg/L'"
      ></paramCard>
      <paramCard
        :param-name="'溶解氧'"
        :param-value="0.306"
        :param-unit="'mg/L'"
      ></paramCard>
    </div> -->
    <div class="bottom">
      <paramCard
        :class="{
          is_top: indexP % 2 !== 0
        }"
        v-for="(pdl, indexP) in paramDataList"
        :key="indexP"
        :param-name="pdl.paramName"
        :param-value="pdl.paramValue"
        :param-unit="pdl.paramUnit"
      ></paramCard>
      <!-- <paramCard
        :param-name="'余氯'"
        :param-value="0.306"
        :param-unit="'mg/L'"
      ></paramCard>
      <paramCard
        :param-name="'浊度'"
        :param-value="0.306"
        :param-unit="'mg/L'"
      ></paramCard>
      <paramCard
        :param-name="'ORP'"
        :param-value="0.306"
        :param-unit="'mg/L'"
      ></paramCard>
      <paramCard
        :param-name="'电导率'"
        :param-value="0.306"
        :param-unit="'mg/L'"
      ></paramCard> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue"
export default defineComponent({
  name: "Footer"
})
</script>
<script setup>
import paramCard from "./components/paramCard.vue"
import { selectHomeParamDataApi } from "../../../../api/home.js"
import UnitJson from "../../../../data/unit.json"

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
  // console.log(paramDataList.value)
}

// 查询参数数据的函数
const selectHomeParamDataFunc = async () => {
  await selectHomeParamDataApi().then((res) => {
    disposeParamDataFunc(res.data.checkDataMap)
  })
}

var updateTimer = setInterval(() => {
  selectHomeParamDataFunc()
  console.log("数据查询计时中....")
}, 3000000)

// init
onMounted(() => {
  selectHomeParamDataFunc()
})

// destory
onUnmounted(() => {
  clearInterval(updateTimer)
})
</script>

<style lang="scss" scoped>
.home_footer_wrap {
  // margin-top: 20px;
  width: 1500px;
  position: absolute;
  top: 660px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 220px;
  // border: 1px solid red;
  // background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  animation-duration: 0.3s;

  .top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 172px;
    position: relative;
    top: 40px;
  }

  .bottom {
    // margin-top: 10px;
    margin-top: 150px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .is_top {
      position: relative;
      top: -100px;
    }
  }

  // 0, 0, 0, 0.4
  // background-color: rgb(235, 123, 32);

  // .item {
  //   width: 180px;
  //   height: 100%;
  //   // border: 1px solid red;
  //   display: flex;
  //   flex-direction: column;
  //   padding: 66px 100px;

  //   .content {
  //     display: flex;
  //     flex-direction: column;
  //     line-height: 50px;

  //     .mark {
  //       width: 140px;
  //       height: 140px;
  //       background-color: rgba(0, 0, 0, 0.2);
  //       border-radius: 50%;
  //       text-align: center;
  //       // line-height: 50px;
  //       display: flex;
  //       flex-direction: column;
  //       padding-top: 14px;

  //       .value {
  //         height: 50px;
  //         font-size: 30px;
  //         font-family: SYHT-Bold;
  //         // border: 1px solid red;
  //       }

  //       .unit {
  //         height: 20px;
  //         // border: 1px solid red;
  //         line-height: 20px;
  //       }

  //       .bottom {
  //         margin: 10px 0px 0px 0px;
  //         display: flex;
  //         flex-direction: row;
  //         line-height: 22px;
  //         padding-left: 20px;

  //         .param_icon {
  //           width: 24px;
  //           height: 24px;
  //           margin-left: 18px;
  //         }

  //         .param_name {
  //           font-size: 16px;
  //           margin-left: 8px;
  //         }
  //       }
  //     }
  //   }
  // }

  // .five_param_box {
  //   // height: 100%;
  //   // border: 1px solid red;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;
  //   padding: 0px;
  //   position: relative;
  //   top: 30px;

  //   .five_param_item {
  //     display: flex;
  //     flex-direction: row;
  //     height: 40px;
  //     line-height: 40px;
  //     // border: 1px solid red;

  //     .param_icon {
  //       width: 25px;
  //       height: 25px;
  //       position: relative;
  //       top: 8px;
  //     }

  //     .param_name {
  //       margin-left: 8px;
  //       font-size: 18px;
  //       position: relative;
  //       // top: px;
  //     }

  //     .value {
  //       margin-left: 16px;
  //       font-size: 20px;
  //       font-family: SYHT-Bold;
  //     }

  //     .unit {
  //       margin-left: 6px;
  //       font-size: 12px;
  //     }
  //   }
  // }
}
</style>
