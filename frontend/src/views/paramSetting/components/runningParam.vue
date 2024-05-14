<template>
  <div class="running_mode_wrap">
    <TitleC title="参数设置"></TitleC>
    <div class="param_setting_box">
      <div class="param_setting_item">
        <span class="label">采水时间：</span>
        <el-input-number
          v-model="paramSettingData.gatherWaterTime"
          :min="1"
          :max="1000"
          @click="inputPlaySound"
        />
        <span class="unit">分钟</span>
      </div>
      <div class="param_setting_item">
        <span class="label">残留水排空时间：</span>
        <el-input-number
          v-model="paramSettingData.residualWaterEvacuationTime"
          :min="1"
          :max="1000"
          @click="inputPlaySound"
        />
        <span class="unit">分钟</span>
      </div>
      <div class="param_setting_item">
        <span class="label">沉砂时间：</span>
        <el-input-number
          v-model="paramSettingData.sandSettingTime"
          :min="1"
          :max="1000"
          @click="inputPlaySound"
        />
        <span class="unit">分钟</span>
      </div>
      <div class="param_setting_item">
        <span class="label">气吹清洗时间：</span>
        <el-input-number
          v-model="paramSettingData.airBlowingCleaningTime"
          :min="1"
          :max="1000"
          @click="inputPlaySound"
        />
        <span class="unit">分钟</span>
      </div>
      <div class="param_setting_item">
        <span class="label">排空时间：</span>
        <el-input-number
          v-model="paramSettingData.evacuationTime"
          :min="1"
          :max="1000"
          @click="inputPlaySound"
        />
        <span class="unit">分钟</span>
      </div>
      <div class="param_setting_item">
        <span class="label">清洗水进水时间：</span>
        <el-input-number
          v-model="paramSettingData.cleaningWaterInflowTime"
          :min="1"
          :max="1000"
          @click="inputPlaySound"
        />
        <span class="unit">分钟</span>
      </div>
      <div class="param_setting_item">
        <span class="label">样杯清洗次数：</span>
        <el-input-number
          v-model="paramSettingData.sampleCupRinseCount"
          :min="1"
          :max="1000"
          @click="inputPlaySound"
        />
        <span class="unit">次</span>
      </div>

      <div class="param_setting_item">
        <span class="label">样杯进/排水时间：</span>
        <el-input-number
          v-model="paramSettingData.sampleCupInflowAndDrainWaterTime"
          :min="1"
          :max="1000"
          @click="inputPlaySound"
        />
        <span class="unit">分钟</span>
      </div>
    </div>

    <div class="action_box">
      <!-- <el-button type="primary" @click="saveClick">保存</el-button> -->
      <SaveButton @save-click="saveClick">保存</SaveButton>
    </div>

    <!-- 保存成功提示 -->
    <HintPopUp
      v-if="isShowSaveSuccessHintPopUp"
      title="提示"
      :show="isShowSaveSuccessHintPopUp"
      :message-content="'保存成功！'"
    >
    </HintPopUp>

    <LoadingC v-if="isLoading" class="loading_mode"></LoadingC>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue"
export default defineComponent({
  name: "RunningMode"
})
</script>
<script setup>
import TitleC from "../../../components/global/titleC.vue"
import SaveButton from "../../../components/global/saveButton.vue"
import HintPopUp from "../../../components/global/hintPopUp.vue"
import LoadingC from "../../../components/loadingC/index.vue"
import { playClickSound } from "../../../utils/other.js"
import {
  selectRunParamSetApi,
  updateRunParamSetApi
} from "../../../api/paramSetting.js"

// 加载标识
const isLoading = ref(false)

// 保存点击事件
const saveClick = async () => {
  // playClickSound();
  let data = {
    runParamId: paramSettingData.value.runParamId,
    gatherWaterTime: paramSettingData.value.gatherWaterTime,
    precipitateTime: paramSettingData.value.sandSettingTime,
    drainTime: paramSettingData.value.evacuationTime,
    temClearCount: paramSettingData.value.sampleCupRinseCount,
    residualWaterDrainTime: paramSettingData.value.residualWaterEvacuationTime,
    airCleanTime: paramSettingData.value.airBlowingCleaningTime,
    cleanWaterEnterTime: paramSettingData.value.cleaningWaterInflowTime,
    temWaterOutTime: paramSettingData.value.sampleCupInflowAndDrainWaterTime
  }
  await updateRunParamSetApi(data)
    .then((res) => {
      isShowSaveSuccessHintPopUp.value = true
      setTimeout(() => {
        isShowSaveSuccessHintPopUp.value = false
      }, 1500)
    })
    .finally(() => {
      selectRunParamSetFunc()
    })
}

// 输入框点击事件-触发点击音效
const inputPlaySound = () => {
  playClickSound()
}

// 参数设置数据
const paramSettingData = ref({
  // runparamId
  runParamId: "",
  // 采水时间
  gatherWaterTime: 0,
  // 沉砂时间
  sandSettingTime: 0,
  // 排空时间
  evacuationTime: 0,
  // 样杯清洗次数
  sampleCupRinseCount: 0,
  // 残留水排空时间
  residualWaterEvacuationTime: 0,
  // 气吹清洗时间
  airBlowingCleaningTime: 0,
  // 清洗水进水时间
  cleaningWaterInflowTime: 0,
  // 样杯 进/排 水时间
  sampleCupInflowAndDrainWaterTime: 0
})

// 保存成功提示弹窗显示的标识
const isShowSaveSuccessHintPopUp = ref(false)

// 查询运行参数设置的函数
const selectRunParamSetFunc = async () => {
  isLoading.value = true
  await selectRunParamSetApi().then((res) => {
    console.log(res.data, "运行参数设置数据")
    paramSettingData.value.runParamId = res.data.runParamId

    // 采水时间
    paramSettingData.value.gatherWaterTime = res.data.gatherWaterTime

    // 沉砂时间
    paramSettingData.value.sandSettingTime = res.data.precipitateTime

    // 排空时间
    paramSettingData.value.evacuationTime = res.data.drainTime

    // 样杯清洗次数
    paramSettingData.value.sampleCupRinseCount = res.data.temClearCount

    // 残留水排空时间
    paramSettingData.value.residualWaterEvacuationTime =
      res.data.residualWaterDrainTime

    // 气吹清洗时间
    paramSettingData.value.airBlowingCleaningTime = res.data.airCleanTime

    // 清洗水进水时间
    paramSettingData.value.cleaningWaterInflowTime =
      res.data.cleanWaterEnterTime

    // 样杯进排水时间
    paramSettingData.value.sampleCupInflowAndDrainWaterTime =
      res.data.temWaterOutTime

    isLoading.value = false
  })
}

// init
onMounted(() => {
  selectRunParamSetFunc()
})
</script>

<style lang="scss" scoped>
.running_mode_wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .param_setting_box {
    width: 70%;
    height: 340px;
    padding: 20px 0px 0px 0px;
    // border: 1px solid red;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .param_setting_item {
      // border: 1px solid red;
      width: 580px;
      height: 50px;

      .label {
        display: inline-block;
        width: 208px;
        text-align: right;
        margin-right: 6px;
        // border: 1px solid red;
        font-size: 22px;
        letter-spacing: 2px;
      }

      .unit {
        margin-left: 8px;
        letter-spacing: 2px;
        font-size: 17px;
      }
    }
  }

  .action_box {
    position: absolute;
    bottom: 0;
    right: 20px;
  }

  .loading_mode {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

/* save button */
// :deep .el-button--primary {
//   background: linear-gradient(
//     180deg,
//     rgb(23, 170, 238) 0%,
//     rgba(15, 104, 251, 1) 100%
//   );
//   border: none;
//   box-shadow:
//     1px 1px 2px #7056e2,
//     -1px -1px 2px #7056e2;
//   font-family: "SYHT-Bold";
//   font-size: 22px;
//   padding: 26px 50px 26px 68px;
//   letter-spacing: 14px;
//   span {
//     color: white !important;
//   }
// }
// :deep .el-button--primary:active {
//   transform: scale(0.9);
// }

/* Number - input */
:deep(.el-input-number) {
  width: 200px;
  height: 40px;
  position: relative;
  top: -4px;

  .el-input-number__decrease {
    width: 46px;
    font-size: 20px;
    z-index: 0;
  }

  .el-input-number__increase {
    font-size: 20px;
    width: 46px;
    z-index: 0;
  }

  .el-input {
    // z-index: 2;
    margin-left: 47px;
    width: 52.8%;
    .el-input__wrapper {
      padding: 0;
      // z-index: 2;
      .el-input__inner {
        // z-index: 2;
        font-size: 18px;
        font-family: SYHT-Bold;
        color: gray;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
