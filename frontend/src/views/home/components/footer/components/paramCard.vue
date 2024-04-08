<template>
  <div class="item">
    <div class="content">
      <div class="mark">
        <div class="bottom">
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('氨氮')"
            src="../image/andan.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('CODcr')"
            src="../image/CODcr.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('COD')"
            src="../image/CODcr.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('CODmn')"
            src="../image/CODmn.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('电导率')"
            src="../image/diandaolv.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('ORP')"
            src="../image/orp.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('pH')"
            src="../image/ph.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('溶解氧')"
            src="../image/rongjieyang.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('温度')"
            src="../image/temp.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('余氯')"
            src="../image/yulv.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('浊度')"
            src="../image/zhuodu.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('总氮')"
            src="../image/zongdan.png"
          />
          <img
            class="param_icon"
            v-if="isShowParamIconFunc('总磷')"
            src="../image/zonglin.png"
          />
          <span class="param_name">{{ props.paramName }}</span>
        </div>
        <span class="value">
          <!-- {{ props.paramValue }} -->
          <!-- <el-statistic :value="props.paramValue" />
          -->
          <count-up
            v-if="typeof props.paramValue == 'number'"
            :start-val="0"
            :end-val="props.paramValue"
            :duration="3"
            :decimal-places="3"
            :loop="1"
            :delay="2"
          >
          </count-up>
          <span v-else class="notData_value">{{ props.paramValue }}</span>
        </span>
        <span class="unit"> {{ props.paramUnit }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "ParamCard"
})
</script>
<script setup>
import CountUp from "vue-countup-v3"

const props = defineProps(["paramName", "paramValue", "paramUnit"])

const isShowParamIconFunc = (name) => {
  let flag
  if (name == props.paramName) {
    flag = true
  } else {
    flag = false
  }
  return flag
}

// onMounted(() => {
//   // console.log(props.paramValue)
//   if (props.paramValue == NaN) {
//     props.paramValue = "--"
//   }
//   console.log(props.paramValue)
// })
</script>

<style lang="scss" scoped>
.item {
  transition: 0.3s;
  width: 150px;
  height: 150px;
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  padding: 0px 0px;
  cursor: pointer;

  .content {
    // display: flex;
    // flex-direction: column;
    line-height: 50px;

    .mark {
      width: 150px;
      height: 150px;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      text-align: center;
      // line-height: 50px;
      display: flex;
      flex-direction: column;
      padding-top: 14px;
      box-sizing: border-box;

      .value {
        height: 50px;
        font-size: 30px;
        font-family: SYHT-Bold;
        // border: 1px solid red;

        .notData_value {
          letter-spacing: 2px;
          margin-left: 4px;
        }
      }

      .unit {
        height: 20px;
        // border: 1px solid red;
        line-height: 20px;
        color: rgb(223, 222, 222);
      }

      .bottom {
        margin: 16px 0px 0px 0px;
        display: flex;
        flex-direction: row;
        line-height: 22px;
        padding-left: 20px;

        .param_icon {
          width: 24px;
          height: 24px;
          margin-left: 18px;
        }

        .param_name {
          display: inline-block;
          width: 58px;
          // border: 1px solid red;
          font-size: 16px;
          // margin-left: 6px;
        }
      }
    }
  }
}

.item:active {
  transform: scale(0.8);
}
</style>
