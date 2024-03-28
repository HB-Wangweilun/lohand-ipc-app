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
          :step="0.01"
          :min="1"
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
          :step="0.01"
          :min="1"
          :max="1000"
          @click="numberInputClick()"
          style="position: relative; top: -4px"
        />

        <el-input-number
          v-if="asd.rangeType == '大于等于' || asd.rangeType == '小于等于'"
          v-model="asd.rangeCenterValue"
          :step="0.01"
          :min="1"
          :max="1000"
          @click="numberInputClick()"
          style="position: relative; top: -4px"
        />
        <!-- <span class="rangeCenter">{{ asd.rangeCenterValue }}</span> -->
        <!-- <span class="rangeRight">{{ asd.rangeRightValue }}</span> -->
        <span class="unit">{{ asd.unit }}</span>
      </div>
    </div>
    <!-- 操作 -->
    <div class="action_box">
      <SaveButton @save-click="saveClick">保存</SaveButton>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import "./alarm.scss";
export default defineComponent({
  name: "Alarm",
});
</script>
<script setup>
import TitleC from "../../../components/global/titleC.vue";
import SaveButton from "../../../components/global/saveButton.vue";
import { playClickSound } from "../../../utils/other.js";

// 选择框的option点击事件
const selectOpionClick = () => {
  playClickSound();
};

// 选择框的点击事件
const selectClick = () => {
  playClickSound();
};

// 保存点击事件
const saveClick = () => {
  // playClickSound();
};

// switch点击事件
const switchClick = () => {
  playClickSound();
};

// 数字输入框点击事件
const numberInputClick = () => {
  playClickSound();
};

// 报警设置数据
const alarmSettingData = ref([
  {
    paramName: "管路压力",
    rangeType: "两者之间",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "kPa",
    status: false,
    icon: "pipeline",
  },
  {
    paramName: "站内温度",
    rangeType: "两者之间",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "℃",
    status: false,
    icon: "instationTemp",
  },
  {
    paramName: "水温",
    rangeType: "大于等于",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "℃",
    status: false,
    icon: "temp",
  },
  {
    paramName: "PH",
    rangeType: "大于等于",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "",
    status: false,
    icon: "ph",
  },
  {
    paramName: "溶解氧",
    rangeType: "小于等于",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "mg/L",
    status: false,
    icon: "rongjieyang",
  },
  {
    paramName: "电导率",
    rangeType: "小于等于",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "µS/cm",
    status: false,
    icon: "diandaolv",
  },
  {
    paramName: "浊度",
    rangeType: "两者之间",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "NTU",
    status: false,
    icon: "zhuodu",
  },
  {
    paramName: "氨氮",
    rangeType: "小于等于",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "mg/L",
    status: false,
    icon: "andan",
  },
  {
    paramName: "总磷",
    rangeType: "小于等于",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "mg/L",
    status: false,
    icon: "zonglin",
  },
  {
    paramName: "总氮",
    rangeType: "两者之间",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "mg/L",
    status: false,
    icon: "zongdan",
  },
  {
    paramName: "CODcr",
    rangeType: "两者之间",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "mg/L",
    status: false,
    icon: "CODcr",
  },
  {
    paramName: "CODmn",
    rangeType: "小于等于",
    rangeLeftValue: 10.0,
    rangeRightValue: 20.0,
    rangeCenterValue: 15.0,
    rangeValue: "",
    unit: "mg/L",
    status: false,
    icon: "CODmn",
  },
]);

// 参数范围类型选择数据
const paramRangeTypeSelectOptions = ref([
  {
    label: "两者之间",
    value: "两者之间",
  },
  {
    label: "大于等于",
    value: "大于等于",
  },
  {
    label: "小于等于",
    value: "小于等于",
  },
]);
</script>

<style lang="scss" scoped>
/* switch */
::v-deep .el-switch {
  transform: scale(1.6);
  position: relative;
  // top: -3px;
  margin-right: 30px;

  .el-switch__core {
    .el-switch__action {
    }
  }

  .el-switch.is-checked {
  }
}

/* Number - input */
::v-deep .el-input-number {
  width: 160px;
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

::v-deep .el-switch.is-checked .el-switch__core {
  background-color: #13ce66 !important;
  border: 1px solid rgb(140, 191, 247) !important;
}

::v-deep .el-select {
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
