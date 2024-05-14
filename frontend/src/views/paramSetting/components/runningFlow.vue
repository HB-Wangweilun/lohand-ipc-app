<template>
  <div class="running_flow_wrap">
    <div class="flow_tabs_box">
      <div
        :class="{
          flow_tab_item: true,
          is_show_right_border: true,
          is_active: tabsData[1].isActive,
          is_activec: !tabsData[1].isActive
        }"
        @click="tabItemClick('definition')"
      >
        <img class="tab_item_img" src="../image/processDefinition.png" />
        <span class="title">流程定义</span>
      </div>
      <div
        :class="{
          flow_tab_item: true,

          is_active: tabsData[0].isActive,
          is_activec: !tabsData[0].isActive
        }"
        @click="tabItemClick('single')"
      >
        <img class="tab_item_img" src="../image/singleProcessControl.png" />
        <span class="title">步骤单控</span>
      </div>
    </div>

    <div class="flow_content_box">
      <!-- 流程单控选择模块 -->
      <div class="flow_single_box" v-if="currentTab == 'single'">
        <StepModeCard
          v-for="(fsrd, indexF) in flowSingleRadioData"
          :key="indexF"
          :title="fsrd.label"
          :isActive="flowSingleData == fsrd.label"
          @click="setFlowSingleData"
        ></StepModeCard>
      </div>
      <!-- <el-radio-group
        v-if="currentTab == 'single'"
        class="flow_single_box_group"
        v-model="flowSingleData"
      >
        <el-radio
          v-for="(fsrd, index) in flowSingleRadioData"
          :key="index"
          :label="fsrd.label"
          :value="fsrd.label"
          @click="flowSingleRadioClick"
        ></el-radio>
      </el-radio-group> -->

      <!-- 流程定义选择模块 -->
      <el-radio-group
        v-if="currentTab == 'definition'"
        class="flow_definition_box_group"
        v-model="flowDefinitionData"
      >
        <el-radio
          v-for="(fdrd, index) in flowDefinitionRadioData"
          :key="index"
          :label="fdrd.processName"
          :value="fdrd.processName"
          @click="flowDefinitionRadioClick"
          @change="flowDefinitionRadioChange(fdrd)"
          >{{ fdrd.processName }}：
          <span v-for="(cl, indexC) in fdrd.processStepList" :key="indexC">
            <span v-if="indexC !== 0">
              <img class="arrows_img" src="../image/to_right_arrows.png" />
            </span>
            <span>{{ cl.stepName }}</span>
          </span>
        </el-radio>
      </el-radio-group>
    </div>

    <!-- 当前状态/模式 -->
    <div class="flow_status_mode_box">
      <!-- 流程单控 -->
      <div class="single_box" v-if="currentTab == 'single'">
        <span class="label">当前状态：</span>
        <span
          :class="{
            value: true,
            is_green: flowSingleStatus == '运行中',
            is_red: flowSingleStatus == '停止'
          }"
          >{{ flowSingleStatus }}</span
        >
      </div>
      <!-- 流程定义 -->
      <div class="definition_box" v-if="currentTab == 'definition'">
        <span class="label">当前模式：</span>
        <span v-if="flowDefinitionData == '模式1'" class="value">模式1</span>
        <span v-if="flowDefinitionData == '模式2'" class="value">模式2</span>
        <span v-if="flowDefinitionData == '模式3'" class="value">模式3</span>
        <span v-if="flowDefinitionData == '模式4'" class="value">模式4</span>
      </div>
    </div>

    <!-- 操作 -->
    <div class="action_box">
      <!-- 停止 -->
      <el-button
        v-if="currentTab == 'single'"
        type="primary"
        @click="flowSingleStopClick"
      >
        <img class="save_img" src="../image/stop.png" />
        停止
      </el-button>
      <!-- 运行 -->
      <el-button
        v-if="currentTab == 'single'"
        type="primary"
        @click="flowSingleRunningClick"
      >
        <img class="save_img" src="../image/running.png" />
        运行
      </el-button>

      <!-- 保存 -->
      <SaveButton
        v-if="currentTab == 'definition'"
        @save-click="flowDefinitionSaveClick"
        >保存</SaveButton
      >
    </div>

    <!-- 保存成功提示 -->
    <HintPopUp
      v-if="isShowSaveSuccessHintPopUp"
      title="提示"
      :show="isShowSaveSuccessHintPopUp"
      :message-content="'保存成功！'"
    >
    </HintPopUp>

    <!-- 加载效果 -->
    <LoadingC v-if="isLoading" class="loading_mode"></LoadingC>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "RunningFlow"
})
</script>
<script setup>
import SaveButton from "../../../components/global/saveButton.vue"
import HintPopUp from "../../../components/global/hintPopUp.vue"
import StepModeCard from "./stepModeCard.vue"
import LoadingC from "../../../components/loadingC/index.vue"
import { playClickSound } from "../../../utils/other.js"
import {
  selectRunFlowSetApi,
  chooseFlowApi,
  selectAllStepApi
} from "../../../api/paramSetting.js"

// 加载标识
const isLoading = ref(false)

// 查询流程数据的函数
const selectRunFlowSetFunc = async () => {
  isLoading.value = true
  await selectRunFlowSetApi().then((res) => {
    console.log(res.data, "运行流程设置数据")
    flowDefinitionRadioData.value = res.data
    res.data.forEach((item) => {
      if (item.isSelect == 1) {
        flowDefinitionData.value = item.processName
      }
    })

    isLoading.value = false
  })
}

// 查询所有流程的函数
const selectAllStepFunc = async () => {
  isLoading.value = true
  await selectAllStepApi().then((res) => {
    flowSingleRadioData.value = res.data.map((item) => {
      return {
        label: item.stepName,
        value: item.stepName,
        stepId: item.stepId
      }
    })

    console.log(flowSingleRadioData.value)
    isLoading.value = false
  })
}

// init
onMounted(() => {
  selectRunFlowSetFunc()
  selectAllStepFunc()
  processId.value = 1
  // console.log(currentTab.value)
})

// 流程单控停止点击事件
const flowSingleStopClick = () => {
  playClickSound()
}

// 流程单控运行点击事件
const flowSingleRunningClick = () => {
  playClickSound()
}

// 流程定义保存点击事件
const flowDefinitionSaveClick = async () => {
  let data = {
    processId: processId.value
  }
  await chooseFlowApi(data)
    .then((res) => {
      isShowSaveSuccessHintPopUp.value = true
      setTimeout(() => {
        isShowSaveSuccessHintPopUp.value = false
      }, 1500)
    })
    .finally(() => {
      selectRunFlowSetFunc()
    })
}

// 流程单控Radio点击事件
const flowSingleRadioClick = () => {
  playClickSound()
}

// 流程定义Radio点击事件
const flowDefinitionRadioClick = () => {
  playClickSound()
  // console.log(flowDefinitionData.value)
}

// 流程定义Radio change事件
const flowDefinitionRadioChange = (e) => {
  let nProcessId = e.processId
  processId.value = nProcessId
}

// tab项点击事件
const tabItemClick = (type) => {
  playClickSound()
  switch (type) {
    case "single":
      tabsData.value[0].isActive = true
      tabsData.value[1].isActive = false
      currentTab.value = "single"
      break

    case "definition":
      tabsData.value[0].isActive = false
      tabsData.value[1].isActive = true
      currentTab.value = "definition"
      break

    default:
      break
  }
}

// 修改步骤单控选择数据
const setFlowSingleData = (flag) => {
  flowSingleData.value = flag
}

/* 数据 */
// 流程单控选择数据
const flowSingleData = ref("采水")

// 当前选择的processId
const processId = ref(null)

// 流程单控状态
const flowSingleStatus = "停止"

// 保存成功提示弹窗显示的标识
const isShowSaveSuccessHintPopUp = ref(false)

// 流程单控单选数据列表
const flowSingleRadioData = ref([])

// 流程定义选择数据
const flowDefinitionData = ref("")

// 流程定义单选数据列表
const flowDefinitionRadioData = ref([])

// 当前tab项
const currentTab = ref("definition")

// tabs数据
const tabsData = ref([
  {
    title: "步骤单控",
    isActive: false
  },
  {
    title: "流程定义",
    isActive: true
  }
])
</script>

<style lang="scss" scoped>
.running_flow_wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .flow_tabs_box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 400px;
    // border: 1px solid red;

    .flow_tab_item {
      position: relative;
      display: flex;
      width: 200px;
      // border: 1px solid red;
      padding: 10px 0px 16px 32px;
      line-height: 22px;
      transition: 2s;
      // border-right: 1px solid rgba(255, 255, 255, 0.5);

      .tab_item_img {
        width: 28px;
        height: 28px;
        margin-right: 12px;
      }

      .title {
        font-size: 22px;
        font-family: SYHT-Bold;
        letter-spacing: 2px;
      }
    }

    .is_active::after {
      position: absolute;
      content: "";
      height: 3px;
      width: 70%;
      background-color: rgba(255, 255, 255, 0.8);
      bottom: 0;
      left: 15%;
      transition: 2s;

      // border-bottom: 3px solid rgba(255, 255, 255, 0.8);
    }

    .is_show_right_border::before {
      position: absolute;
      top: 14%;
      right: 0;
      content: "";
      height: 60%;
      width: 2px;
      background-color: rgba(255, 255, 255, 0.85);
    }
  }

  .flow_content_box {
    .flow_single_box {
      padding-left: 30px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  /* 当前状态/模式 */
  .flow_status_mode_box {
    position: absolute;
    bottom: 0;
    left: 0;

    .label {
      font-size: 19px;
      font-family: SYHT-Bold;
      letter-spacing: 2px;
    }

    .value {
      font-size: 18px;
      letter-spacing: 2px;
      color: #00ffff;
    }

    .is_green {
      color: green;
      font-family: SYHT-Bold;
    }

    .is_red {
      color: red;
      font-family: SYHT-Bold;
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

/* Radio */

// 单控
:deep(.flow_single_box_group) {
  padding: 40px 0px 40px 30px;
  width: 1720px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  // border: 1px solid red;
}

// 定义
:deep(.flow_definition_box_group) {
  padding: 40px 0px 40px 30px;
  width: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .el-radio {
    margin-bottom: 50px;

    .is_highlight {
      color: #00ffff;
      font-family: SYHT-Bold;
    }

    .arrows_img {
      width: 40px;
      margin: 0px 14px 2px 14px;
    }
  }
}

:deep(.el-radio) {
  text-align: left;
  .el-radio__label {
    color: white;
    font-size: 22px;
    font-family: SYHT-Regular;
    letter-spacing: 2px;
    position: relative;
    top: -2px;
  }
}

:deep(.el-radio) {
  // height: 0px;
  .el-radio__original {
  }

  .el-radio__inner {
    width: 20px;
    height: 20px;
    background: transparent;
    border: 2px solid white;
  }

  .el-radio__inner::after {
    width: 6px;
    height: 6px;
    background-color: white;
  }
}

:deep(.el-radio__label) {
  position: relative;
  top: -1px;
}

/* 停止和运行按钮 */
.save_img {
  width: 24px;
  height: 24px;
  margin-right: 14px;
  position: relative;
  top: 2px;
}

/* save button */
:deep(.el-button--primary) {
  background: linear-gradient(
    180deg,
    rgb(23, 170, 238) 0%,
    rgba(15, 104, 251, 1) 100%
  );
  border: none;
  box-shadow:
    1px 1px 2px #7056e2,
    -1px -1px 2px #7056e2;
  font-family: "SYHT-Bold";
  font-size: 22px;
  padding: 26px 40px 26px 58px;
  letter-spacing: 14px;
  border-radius: 10px;
  span {
    color: white !important;
  }
}
:deep(.el-button--primary:active) {
  transform: scale(0.9);
}
</style>
