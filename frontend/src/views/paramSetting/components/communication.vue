<template>
  <div class="communication_wrap">
    <!-- tabs -->
    <div class="communication_tabs_box">
      <div
        :class="{
          communication_tab_item: true,
          is_show_right_border: true,
          is_active: tabsData[0].isActive,
          is_activec: !tabsData[0].isActive
        }"
        @click="tabItemClick('instrument')"
      >
        <img
          style="
            transform: scale(1.1);
            position: relative;
            top: -2px;
            left: 2px;
          "
          class="tab_item_img"
          src="../image/instrument.png"
        />
        <span class="title">仪表通信设置</span>
      </div>
      <!-- <div
        :class="{
          communication_tab_item: true,
          is_active: tabsData[1].isActive,
          is_activec: !tabsData[1].isActive
        }"
        @click="tabItemClick('platform')"
      >
        <img class="tab_item_img" src="../image/platform.png" />
        <span class="title">平台通信设置</span>
      </div> -->
    </div>

    <!-- 仪表通信设置内容 -->
    <div class="instrument_content_box" v-if="currentTab == 'instrument'">
      <div
        class="item"
        v-for="(icsd, indexI) in instrumentCommunicationSettingData"
        :key="indexI"
      >
        <span class="label">{{ icsd.label }}：</span>
        <el-input-number
          v-model="icsd.value"
          :step="1"
          :min="0"
          :max="1000"
          @click="inputNumberClick()"
        />
      </div>
    </div>

    <!-- 平台通信设置内容 -->
    <div class="platform_content_box" v-if="currentTab == 'platform'">
      平台通信设置内容
    </div>

    <!-- 通讯参数 -->
    <div class="communication_param_box">
      <span class="label">通讯参数：</span>
      <span class="baudRate">
        波特率 -<span class="value">{{ communicationParamData.baudRate }}</span>
      </span>
      <span class="dataBit">
        数据位 -<span class="value"> {{ communicationParamData.dataBit }}</span>
        <span v-if="communicationParamData.dataBit !== '无'" class="unit"
          >位</span
        >
      </span>
      <span class="stopBit">
        停止位 -<span class="value"> {{ communicationParamData.stopBit }}</span>
        <span v-if="communicationParamData.stopBit !== '无'" class="unit"
          >位</span
        >
      </span>
      <span class="parityBit">
        校验位 -<span class="value">
          {{ communicationParamData.parityBit }}</span
        >
        <span v-if="communicationParamData.parityBit !== '无'" class="unit"
          >位</span
        >
      </span>
    </div>

    <!-- 操作 -->
    <div class="action_box">
      <SaveButton @save-click="saveClick">保存</SaveButton>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
import "./communication.scss"
export default defineComponent({
  name: "Communication"
})
</script>
<script setup>
import { playClickSound } from "../../../utils/other.js"
import SaveButton from "../../../components/global/saveButton.vue"

// 仪表通信设置保存事件
const instrumentCommunicationSave = () => {}

// 平台通信设置保存事件
const platformCommunicationSave = () => {}

// 保存点击事件
const saveClick = () => {}

// 数字输入框点击事件
const inputNumberClick = () => {
  playClickSound()
}

// 当前tab
const currentTab = ref("instrument")

// tab项点击事件
const tabItemClick = (type) => {
  playClickSound()
  switch (type) {
    case "instrument":
      tabsData.value[0].isActive = true
      tabsData.value[1].isActive = false
      currentTab.value = "instrument"
      break

    case "platform":
      tabsData.value[0].isActive = false
      tabsData.value[1].isActive = true
      currentTab.value = "platform"
      break

    default:
      break
  }
}

// tabs数据
const tabsData = ref([
  {
    title: "仪表通信设置",
    isActive: true
  },
  {
    title: "平台通信设置",
    isActive: false
  }
])

// 仪表通信设置数据
const instrumentCommunicationSettingData = ref([
  {
    label: "氨氮地址",
    value: 0
  },
  {
    label: "压力表地址",
    value: 0
  },
  {
    label: "总磷地址",
    value: 0
  },
  {
    label: "空调地址",
    value: 0
  },
  {
    label: "总氮地址",
    value: 0
  },
  {
    label: "采样器地址",
    value: 0
  },
  {
    label: "CODcr地址",
    value: 0
  },
  {
    label: "传感器地址",
    value: 0
  },
  {
    label: "CODmn地址",
    value: 0
  },
  {
    label: "通讯板地址",
    value: 0
  }
])

// 通讯参数数据
const communicationParamData = ref({
  baudRate: 9600,
  dataBit: 8,
  stopBit: 1,
  parityBit: "无"
})
</script>

<style lang="scss" scoped>
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
