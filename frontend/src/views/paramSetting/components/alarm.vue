<template>
  <div class="alarm_wrap">
    <TitleC title="报警设置"></TitleC>
    <div class="alarm_setting_box">
      <div
        class="alarm_setting_item"
        v-for="(asd, indexA) in alarmSettingData"
        :key="indexA"
      >
        <el-switch v-model="asd.status" @click="switchClick" />
        <img
          class="icon"
          v-if="asd.icon == 'pipeline'"
          src="../image/pipeline.png"
        />
        <img
          class="icon"
          v-if="asd.icon == 'instationTemp'"
          src="../image/instationTemp.png"
        />
        <img class="icon" v-if="asd.icon == 'temp'" src="../image/temp.png" />
        <img class="icon" v-if="asd.icon == 'ph'" src="../image/ph.png" />
        <img
          class="icon"
          v-if="asd.icon == 'rongjieyang'"
          src="../image/rongjieyang.png"
        />
        <img
          class="icon"
          v-if="asd.icon == 'diandaolv'"
          src="../image/diandaolv.png"
        />
        <img
          class="icon"
          v-if="asd.icon == 'zhuodu'"
          src="../image/zhuodu.png"
        />
        <img class="icon" v-if="asd.icon == 'andan'" src="../image/andan.png" />

        <img
          class="icon"
          v-if="asd.icon == 'zonglin'"
          src="../image/zonglin.png"
        />
        <img
          class="icon"
          v-if="asd.icon == 'zongdan'"
          src="../image/zongdan.png"
        />
        <img class="icon" v-if="asd.icon == 'CODcr'" src="../image/CODcr.png" />
        <img class="icon" v-if="asd.icon == 'CODmn'" src="../image/CODmn.png" />
        <span class="label">{{ asd.paramName }}：</span>
        <!-- <span class="rangeType">{{ asd.rangeType }}</span> -->
        <el-select
          class="range_type"
          v-model="asd.rangeType"
          placeholder="请选择版本"
          size="large"
          @click="selectClick()"
        >
          <el-option
            v-for="(so, index) in paramRangeTypeSelectOptions"
            :label="so.label"
            :value="so.value"
            @click="selectOpionClick()"
          />
        </el-select>
        <!-- <span class="rangeLeft">{{ asd.rangeLeftValue }}</span> -->
        <el-input-number
          v-if="asd.rangeType == '两者之间'"
          v-model="asd.rangeLeftValue"
          class="rangeLeft"
          :step="0.001"
          :min="0"
          :max="1000"
          @click="numberInputClick()"
          style="position: relative; top: -4px"
        />
        <span v-if="asd.rangeType == '两者之间'" style="margin-right: 16px">
          -
        </span>
        <el-input-number
          v-if="asd.rangeType == '两者之间'"
          v-model="asd.rangeRightValue"
          :step="0.001"
          :min="0"
          :max="1000"
          @click="numberInputClick()"
          style="position: relative; top: -4px"
        />

        <el-input-number
          v-if="asd.rangeType == '大于等于' || asd.rangeType == '小于等于'"
          v-model="asd.rangeCenterValue"
          :step="0.001"
          :min="0"
          :max="1000"
          @click="numberInputClick()"
          style="position: relative; top: -4px"
        />
        <!-- <span class="rangeCenter">{{ asd.rangeCenterValue }}</span> -->
        <!-- <span class="rangeRight">{{ asd.rangeRightValue }}</span> -->
        <span class="unit">{{ asd.unit }}</span>
        <SaveButton class="save_button" @save-click="saveClick(asd)"
          >保存</SaveButton
        >
      </div>
    </div>
    <!-- 操作 -->
    <!-- <div class="action_box">
     
    </div> -->

    <!-- 保存成功提示 -->
    <HintPopUp
      title="提示"
      :show="isShowSaveSuccessHintPopUp"
      :message-content="'保存成功！'"
    >
    </HintPopUp>

    <!-- 加载 -->
    <LoadingC v-if="isShowLoading" class="loadingc_mode"></LoadingC>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
import "./alarm.scss"
export default defineComponent({
  name: "Alarm"
})
</script>
<script setup>
import TitleC from "../../../components/global/titleC.vue"
import SaveButton from "../../../components/global/saveButton.vue"
import HintPopUp from "../../../components/global/hintPopUp.vue"
import LoadingC from "../../../components/loadingC/index.vue"
import { playClickSound } from "../../../utils/other.js"
import alarmJsonData from "../data/alarm.json"
import {
  selectAlarmSetApi,
  updateAlarmSetApi,
  editAlarmStatusApi
} from "../../../api/paramSetting.js"

// 选择框的option点击事件
const selectOpionClick = () => {
  playClickSound()
}

// 选择框的点击事件
const selectClick = () => {
  playClickSound()
}

// 保存点击事件
const saveClick = async (item) => {
  let data = {
    paramReportId: item.paramReportId,
    paramReportRange: ""
  }

  // 拼接范围数据
  switch (item.rangeType) {
    case "两者之间":
      data.paramReportRange = `${item.rangeLeftValue}-${item.rangeRightValue}`
      break
    case "大于等于":
      data.paramReportRange = `>=${item.rangeCenterValue}`
      break
    case "小于等于":
      data.paramReportRange = `<=${item.rangeCenterValue}`
      break
    default:
      break
  }
  console.log(data)
  // playClickSound();
  await updateAlarmSetApi(data).then((res) => {
    isShowSaveSuccessHintPopUp.value = true
    setTimeout(() => {
      isShowSaveSuccessHintPopUp.value = false
    }, 1500)
  })
}

// switch点击事件
const switchClick = () => {
  playClickSound()
}

// 数字输入框点击事件
const numberInputClick = () => {
  playClickSound()
}

// 报警设置数据
const alarmSettingData = ref([])

// 参数范围类型选择数据
const paramRangeTypeSelectOptions = ref([
  {
    label: "两者之间",
    value: "两者之间"
  },
  {
    label: "大于等于",
    value: "大于等于"
  },
  {
    label: "小于等于",
    value: "小于等于"
  }
])

// 查询报警配置的函数
const selectAlarmSetFunc = async () => {
  isShowLoading.value = true
  await selectAlarmSetApi().then((res) => {
    console.log(res, "报警配置数据")
    let nAlarmSetData = res.data.map((itemA) => {
      let rData = judgeRangeValueTypeF(itemA.paramReportRange)
      return {
        paramName: itemA.paramName,
        rangeType: rData.type,
        rangeLeftValue: Number(rData.leftValue),
        rangeRightValue: Number(rData.rightValue),
        rangeCenterValue: Number(rData.centerValue),
        unit: paramUnitMatchingFunc(itemA.paramName),
        status: itemA.status == 1 ? true : false,
        icon: paramIconMatchingFunc(itemA.paramName),
        paramReportId: itemA.paramReportId
      }
    })
    alarmSettingData.value = nAlarmSetData

    isShowLoading.value = false
  })
}

// 参数单位匹配函数
const paramUnitMatchingFunc = (paramName) => {
  return alarmJsonData.paramUnitList[paramName]
}

// 参数icon匹配函数
const paramIconMatchingFunc = (paramName) => {
  return alarmJsonData.paramIconList[paramName]
}

// 保存成功显示的标识
const isShowSaveSuccessHintPopUp = ref(false)

// 显示加载效果的标识
const isShowLoading = ref(false)

// 判断范围值的类型的函数
const judgeRangeValueTypeF = (value) => {
  let rData = {
    type: "",
    leftValue: "",
    rightValue: "",
    centerValue: ""
  }
  if (value.indexOf("-") != -1) {
    rData.type = "两者之间"
    let values = value.split("-")
    console.log(values)
    rData.leftValue = values[0]
    rData.rightValue = values[1]
  } else if (value.indexOf(">") != -1) {
    rData.type = "大于等于"
    let values = value.split(">=")
    rData.centerValue = values[1]
    // console.log(values)
  } else {
    rData.type = "小于等于"
    let values = value.split("<=")
    rData.centerValue = values[1]
    // console.log(values)
  }
  return rData
}

// init
onMounted(() => {
  selectAlarmSetFunc()
})
</script>

<style lang="scss" scoped>
/* switch */
:deep(.el-switch) {
  // transform: scale(1.6);
  position: relative;
  // top: -3px;
  margin-right: 20px;

  .el-switch__core {
    width: 64px;
    height: 32px;
    border-radius: 30px;
    .el-switch__action {
      width: 26px;
      height: 26px;
      left: 3px !important;
    }
  }
}

:deep(.el-switch.is-checked) {
  .el-switch__core {
    .el-switch__action {
      left: 35px !important;
    }
  }
}

/* Number - input */
:deep(.el-input-number) {
  width: 200px;
  height: 40px;
  position: relative;
  top: -4px;
  .el-input-number__decrease {
    width: 46px;
    font-size: 20px;
  }

  .el-input-number__increase {
    font-size: 20px;
    width: 46px;
  }

  .el-input {
    .el-input__wrapper {
      .el-input__inner {
        font-size: 18px;
        font-family: SYHT-Bold;
        color: gray;
        letter-spacing: 1px;
      }
    }
  }
}

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: #13ce66 !important;
  border: 1px solid rgb(140, 191, 247) !important;
}

:deep(.el-select) {
  .el-select__wrapper {
    .el-select__selection {
      .el-select__selected-item {
        font-size: 14px;
        font-family: SYHT-Bold;
        color: rgb(126, 126, 126);
        letter-spacing: 2px;
      }
    }
  }
}
</style>
