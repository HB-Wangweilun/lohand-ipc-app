<template>
  <div class="peripheral_wrap">
    <!-- tabs -->
    <div class="flow_tabs_box">
      <div
        :class="{
          flow_tab_item: true,
          is_show_right_border: true,
          is_active: tabsData[0].isActive,
          is_activec: !tabsData[0].isActive,
        }"
        @click="tabItemClick('airConditioner')"
      >
        <div class="content">
          <img class="tab_item_img" src="../image/airConditioner.png" />
          <span class="title">空调设置</span>
        </div>
      </div>
      <div
        :class="{
          flow_tab_item: true,
          is_show_right_border: true,
          is_active: tabsData[1].isActive,
          is_activec: !tabsData[1].isActive,
        }"
        @click="tabItemClick('upsStatus')"
      >
        <div class="content">
          <img class="tab_item_img" src="../image/ups.png" />
          <span class="title">UPS状态</span>
        </div>
      </div>
      <div
        :class="{
          flow_tab_item: true,
          is_active: tabsData[2].isActive,
          is_activec: !tabsData[2].isActive,
        }"
        @click="tabItemClick('samplingApparatusSetting')"
      >
        <div class="content">
          <img class="tab_item_img" src="../image/samplingSetting.png" />
          <span class="title">采样器设置</span>
        </div>
      </div>
    </div>

    <!-- 内容 -->
    <div class="peripheral_content_box">
      <!-- 空调设置内容 -->
      <div
        class="air_conditioner_content_box"
        v-if="currentTab == 'airConditioner'"
      >
        <!-- 空调设置内容 -->
        <!-- 温度展示 -->
        <div class="air_info_show_box">
          <div class="current_temp_box">
            <img class="icon" src="../image/airTemp.png" />
            <span class="label">当前空调温度：</span>
            <span class="value">{{ airTempData.currentTemp }}</span>
            <span class="unit">℃</span>
          </div>
          <div class="air_switch_box">
            <img class="icon" src="../image/airSwitch.png" />
            <span class="label">空调开关：</span>
            <el-switch v-model="airSwitchStatus" @click="airSwitchClick" />
          </div>
        </div>
        <div class="temp_view_box">
          <div class="item">
            <img class="icon" src="../image/refrigeration.png" />
            <span class="label">制冷开启温度：</span>
            <span class="value">{{ airTempData.coolStartTemp }}</span>
            <span class="unit">℃</span>
          </div>
          <div class="item">
            <img class="icon" src="../image/refrigeration.png" />
            <span class="label">制冷停止温度：</span>
            <span class="value">{{ airTempData.coolStopTemp }}</span>
            <span class="unit">℃</span>
          </div>

          <div class="item">
            <img class="icon" src="../image/warm.png" />
            <span class="label">加热开启温度：</span>
            <span class="value">{{ airTempData.heatStartTemp }}</span>
            <span class="unit">℃</span>
          </div>
          <div class="item">
            <img class="icon" src="../image/warm.png" />
            <span class="label">加热停止温度：</span>
            <span class="value">{{ airTempData.heatStopTemp }}</span>
            <span class="unit">℃</span>
          </div>
        </div>

        <div class="update_temp_box">
          <div class="item">
            <img class="icon" src="../image/refrigeration.png" />
            <span class="label">制冷开启温度：</span>
            <el-input-number
              v-model="airTempData.coolStartTemp"
              :step="0.1"
              :min="1"
              :max="1000"
              @click="inputNumberClick()"
            />
            <span class="unit">℃</span>
          </div>
          <div class="item">
            <img class="icon" src="../image/refrigeration.png" />
            <span class="label">制冷停止温度：</span>
            <el-input-number
              v-model="airTempData.coolStopTemp"
              :step="0.1"
              :min="1"
              :max="1000"
              @click="inputNumberClick()"
            />
            <span class="unit">℃</span>
          </div>
          <div class="item">
            <img class="icon" src="../image/warm.png" />
            <span class="label">加热开启温度：</span>
            <el-input-number
              v-model="airTempData.heatStartTemp"
              :step="0.1"
              :min="1"
              :max="1000"
              @click="inputNumberClick()"
            />
            <span class="unit">℃</span>
          </div>
          <div class="item">
            <img class="icon" src="../image/warm.png" />
            <span class="label">加热停止温度：</span>
            <el-input-number
              v-model="airTempData.heatStopTemp"
              :step="0.1"
              :min="1"
              :max="1000"
              @click="inputNumberClick()"
            />
            <span class="unit">℃</span>
          </div>
        </div>
      </div>

      <!-- UPS状态内容 -->
      <div class="upsStatus_content_box" v-if="currentTab == 'upsStatus'">
        <div class="upsStatus_item_box">
          <img class="icon" src="../image/upsInputVoltage.png" />
          <span class="label">UPS输入电压：</span>
          <span class="value">{{ upsStatusData.upsInputVoltage }}</span>
          <span class="unit">V</span>
        </div>
        <div class="upsStatus_item_box">
          <img class="icon" src="../image/upsOutputVoltage.png" />
          <span class="label">UPS输出电压：</span>
          <span class="value">{{ upsStatusData.upsOnputVoltage }}</span>
          <span class="unit">V</span>
        </div>
        <div class="upsStatus_item_box">
          <img class="icon" src="../image/cellVoltage.png" />
          <span class="label">UPS单元电压：</span>
          <span class="value">{{ upsStatusData.upsCellVoltage }}</span>
          <span class="unit">V</span>
        </div>
        <div class="upsStatus_item_box">
          <img class="icon" src="../image/upsTemp.png" />
          <span class="label">UPS温度：</span>
          <span class="value">{{ upsStatusData.upsTemp }}</span>
          <span class="unit">V</span>
        </div>
        <div class="upsStatus_item_box">
          <img class="icon" src="../image/upsInputVoltage.png" />
          <span class="label">UPS上次输入电压：</span>
          <span class="value">{{ upsStatusData.upsLastInputVoltage }}</span>
          <span class="unit">V</span>
        </div>
        <div class="upsStatus_item_box">
          <img class="icon" src="../image/upsIncomingFrequency.png" />
          <span class="label">UPS输入频率：</span>
          <span class="value">{{ upsStatusData.upsInputFrequency }}</span>
          <span class="unit">V</span>
        </div>
      </div>

      <!-- 采样器设置内容 -->
      <div
        class="samplingApparatusSetting_content_box"
        v-if="currentTab == 'samplingApparatusSetting'"
      >
        <!-- 采样器设置内容 -->
        <div class="one_box">
          <div class="sampler_function_box">
            <img class="icon" src="../image/sampling.png" />
            <span class="label">采样器功能</span>
            <el-switch
              v-model="samplingSwitchStatus"
              @click="samplingSwitchClick"
            />
          </div>

          <div class="last_samplingBottleNumber_box">
            <img class="icon" src="../image/samplingBottleNumber.png" />
            <span class="label">上次采样瓶号：</span>
            <span class="value">--</span>
          </div>
        </div>
        <div class="two_box">
          <div
            class="item"
            v-for="(sspd, indexS) in samplingSettingParamData"
            :key="indexS"
          >
            <img
              v-if="sspd.icon == 'andan'"
              class="icon"
              src="../image/andan.png"
            />
            <img
              v-if="sspd.icon == 'zonglin'"
              class="icon"
              src="../image/zonglin.png"
            />
            <img
              v-if="sspd.icon == 'zongdan'"
              class="icon"
              src="../image/zongdan.png"
            />
            <img
              v-if="sspd.icon == 'CODcr'"
              class="icon"
              src="../image/CODcr.png"
            />
            <img
              v-if="sspd.icon == 'CODmn'"
              class="icon"
              src="../image/CODmn.png"
            />
            <img
              v-if="sspd.icon == 'samplingQuantity'"
              class="icon"
              src="../image/samplingQuantity.png"
            />
            <span class="label">{{ sspd.label }}</span>
            <el-input-number
              v-model="sspd.value"
              :step="0.01"
              :min="1"
              :max="1000"
              @click="inputNumberClick()"
              style="position: relative; top: 4px"
            />
            <span class="unit">{{ sspd.unit }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 通讯状态 -->
    <div class="communicationStatus_box">
      <span class="label">通讯状态： </span>
      <img
        v-if="communicationStatus == '未连接'"
        class="status_icon"
        src="../image/not_link.png"
      />
      <img
        v-if="communicationStatus == '已连接'"
        class="status_icon"
        src="../image/link.png"
      />
      <span class="value">{{ communicationStatus }}</span>
    </div>

    <!-- 操作 -->
    <div class="action_box">
      <SaveButton @save-click="saveClick" v-if="currentTab != 'upsStatus'"
        >保存</SaveButton
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import "./peripheral.scss";
export default defineComponent({
  name: "Peripheral",
});
</script>
<script setup>
import { playClickSound } from "../../../utils/other.js";
import SaveButton from "../../../components/global/saveButton.vue";

// 空调开关点击事件
const airSwitchClick = () => {
  playClickSound();
};

// 采样器功能开关点击事件
const samplingSwitchClick = () => {
  playClickSound();
};

// 温度输入框点击事件
const inputNumberClick = () => {
  playClickSound();
};

// 空调设置的保存事件
const airSettingSave = () => {};

// 空调采样器的保存事件a
const samplingSettingSave = () => {};

// 保存按钮点击事件
const saveClick = () => {
  switch (currentTab.value) {
    case "airConditioner":
      airSettingSave();
      break;

    case "samplingApparatusSetting":
      samplingSettingSave();
      break;

    default:
      break;
  }
};

// tab项点击事件
const tabItemClick = (type) => {
  playClickSound();
  switch (type) {
    case "airConditioner":
      tabsData.value[0].isActive = true;
      tabsData.value[1].isActive = false;
      tabsData.value[2].isActive = false;
      currentTab.value = "airConditioner";
      break;

    case "upsStatus":
      tabsData.value[0].isActive = false;
      tabsData.value[1].isActive = true;
      tabsData.value[2].isActive = false;
      currentTab.value = "upsStatus";
      break;

    case "samplingApparatusSetting":
      tabsData.value[0].isActive = false;
      tabsData.value[1].isActive = false;
      tabsData.value[2].isActive = true;
      currentTab.value = "samplingApparatusSetting";
      break;

    default:
      break;
  }

  console.log(currentTab.value);
};

// 通讯状态
const communicationStatus = ref("未连接");

// 当前tab
const currentTab = ref("airConditioner");

// tabs列表
const tabsData = ref([
  {
    title: "空调设置",
    isActive: true,
  },
  {
    title: "UPS状态",
    isActive: false,
  },
  {
    title: "采样器设置",
    isActive: false,
  },
]);

// 空调开关状态
const airSwitchStatus = ref(false);

// 空调温度数据
const airTempData = ref({
  // 当前温度
  currentTemp: 22.5,
  // 制冷开启温度
  coolStartTemp: 22.5,
  // 制冷停止温度
  coolStopTemp: 22.5,
  // 加热开启温度
  heatStartTemp: 22.5,
  // 加热停止温度
  heatStopTemp: 22.5,
});

// ups状态数据
const upsStatusData = ref({
  // UPS输入电压
  upsInputVoltage: "2.5",
  // UPS输出电压
  upsOnputVoltage: "2.5",
  // UPS单元电压
  upsCellVoltage: "2.5",
  // UPS温度
  upsTemp: "2.5",
  // UPS上次输入电压
  upsLastInputVoltage: "2.5",
  // UPS输入频率
  upsInputFrequency: "2.5",
});

// 采样器设置参数数据
const samplingSettingParamData = ref([
  {
    label: "氨氮采样阈值：",
    icon: "andan",
    value: 2.26,
    unit: "mg/L",
  },
  {
    label: "总磷采样阈值：",
    icon: "zonglin",
    value: 2.26,
    unit: "mg/L",
  },
  {
    label: "总氮采样阈值：",
    icon: "zongdan",
    value: 2.26,
    unit: "mg/L",
  },
  {
    label: "CODcr采样阈值：",
    icon: "CODcr",
    value: 2.26,
    unit: "mg/L",
  },
  {
    label: "CODmn采样阈值：",
    icon: "CODmn",
    value: 2.26,
    unit: "mg/L",
  },
  {
    label: "采样量：",
    icon: "samplingQuantity",
    value: 2.26,
    unit: "mL",
  },
]);

// 采样器功能开关状态
const samplingSwitchStatus = ref(false);
</script>

<style lang="scss" scoped>
/* switch */
::v-deep .el-switch {
  transform: scale(1.6);
  position: relative;
  // top: -3px;
  margin-left: 6px;

  .el-switch__core {
    .el-switch__action {
    }
  }

  .el-switch.is-checked {
  }
}

::v-deep .el-switch.is-checked .el-switch__core {
  background-color: #13ce66 !important;
  border: 1px solid rgb(140, 191, 247) !important;
}

/* Number - input */
::v-deep .el-input-number {
  width: 180px;
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
</style>
