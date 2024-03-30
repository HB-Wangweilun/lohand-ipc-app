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
        <span class="title">流程单控</span>
      </div>
    </div>

    <div class="flow_content_box">
      <!-- 流程单控选择模块 -->
      <el-radio-group
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
      </el-radio-group>

      <!-- 流程定义选择模块 -->
      <el-radio-group
        v-if="currentTab == 'definition'"
        class="flow_definition_box_group"
        v-model="flowDefinitionData"
      >
        <el-radio
          v-for="(fdrd, index) in flowDefinitionRadioData"
          :key="index"
          :label="fdrd.title"
          :value="fdrd.value"
          @click="flowDefinitionRadioClick"
          >{{ fdrd.title }}
          <span v-for="(cl, indexC) in fdrd.contentList" :key="indexC">
            <!-- <span v-if="indexC !== 0">&nbsp; → &nbsp;</span> -->
            <span v-if="indexC !== 0">
              <img class="arrows_img" src="../image/to_right_arrows.png" />
            </span>
            <span
              :class="{
                is_highlight: cl.isHighlight
              }"
              >{{ cl.value }}</span
            >
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
        <span v-if="flowDefinitionData == 'mode1'" class="value">模式一</span>
        <span v-if="flowDefinitionData == 'mode2'" class="value">模式二</span>
        <span v-if="flowDefinitionData == 'mode3'" class="value">模式三</span>
        <span v-if="flowDefinitionData == 'mode4'" class="value">模式四</span>
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
import { playClickSound } from "../../../utils/other.js"

onMounted(() => {
  console.log(currentTab.value)
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
const flowDefinitionSaveClick = () => {}

// 流程单控Radio点击事件
const flowSingleRadioClick = () => {
  playClickSound()
}

// 流程定义Radio点击事件
const flowDefinitionRadioClick = () => {
  playClickSound()
  console.log(flowDefinitionData.value)
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

/* 数据 */
// 流程单控选择数据
const flowSingleData = ref("采水")

// 流程单控状态
const flowSingleStatus = "停止"

// 流程单控单选数据列表
const flowSingleRadioData = ref([
  {
    label: "采水",
    value: "采水"
  },
  {
    label: "沉砂",
    value: "沉砂"
  },
  {
    label: "仪表测量",
    value: "仪表测量"
  },
  {
    label: "排空",
    value: "排空"
  },
  {
    label: "除藻清洗",
    value: "除藻清洗"
  },
  {
    label: "普通清洗",
    value: "普通清洗"
  },
  {
    label: "传感器保养",
    value: "传感器保养"
  },
  {
    label: "气吹清洗",
    value: "气吹清洗"
  }
])

// 流程定义选择数据
const flowDefinitionData = ref("mode1")

// 流程定义单选数据列表
const flowDefinitionRadioData = ref([
  {
    title: "模式一： ",
    contentList: [
      {
        value: "采水",
        isHighlight: false
      },
      {
        value: "传感器测量",
        isHighlight: false
      },
      {
        value: "沉砂",
        isHighlight: false
      },
      {
        value: "仪表测量",
        isHighlight: false
      },
      {
        value: "排空",
        isHighlight: false
      },
      {
        value: "除藻清洗",
        isHighlight: true
      },
      {
        value: "传感器保养",
        isHighlight: false
      }
    ],
    value: "mode1"
  },
  {
    title: "模式二： ",
    contentList: [
      {
        value: "采水",
        isHighlight: false
      },
      {
        value: "传感器测量",
        isHighlight: false
      },
      {
        value: "沉砂",
        isHighlight: false
      },
      {
        value: "仪表测量",
        isHighlight: false
      },
      {
        value: "排空",
        isHighlight: false
      },
      {
        value: "普通清洗",
        isHighlight: true
      },
      {
        value: "传感器保养",
        isHighlight: false
      }
    ],
    value: "mode2"
  },
  {
    title: "模式三： ",
    contentList: [
      {
        value: "采水",
        isHighlight: false
      },
      {
        value: "传感器测量",
        isHighlight: false
      },
      {
        value: "沉砂",
        isHighlight: false
      },
      {
        value: "仪表测量",
        isHighlight: false
      },
      {
        value: "排空",
        isHighlight: false
      },
      {
        value: "气吹清洗",
        isHighlight: true
      },
      {
        value: "传感器保养",
        isHighlight: false
      }
    ],
    value: "mode3"
  },
  {
    title: "模式四： ",
    contentList: [
      {
        value: "采水",
        isHighlight: false
      },
      {
        value: "传感器测量",
        isHighlight: false
      },
      {
        value: "沉砂",
        isHighlight: false
      },
      {
        value: "仪表测量",
        isHighlight: false
      },
      {
        value: "排空",
        isHighlight: false
      },
      {
        value: "传感器保养",
        isHighlight: false
      }
    ],
    value: "mode4"
  }
])

// 当前tab项
const currentTab = ref("definition")

// tabs数据
const tabsData = ref([
  {
    title: "流程单控",
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
}

/* Radio */

// 单控
::v-deep .flow_single_box_group {
  padding: 40px 0px 40px 30px;
  width: 1720px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // border: 1px solid red;
}

// 定义
::v-deep .flow_definition_box_group {
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

::v-deep .el-radio {
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

::v-deep .el-radio {
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

::v-deep .el-radio__label {
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
::v-deep .el-button--primary {
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
::v-deep .el-button--primary:active {
  transform: scale(0.9);
}
</style>
