<template>
  <div class="running_param_wrap">
    <TitleC title="模式设置"></TitleC>
    <el-radio-group class="mode_select_box_group" v-model="currentMode">
      <el-radio
        v-for="msld in modeSelectListData"
        :key="msld.index"
        :label="msld.label"
        :value="msld.label"
        @click="modeRadioClick"
      ></el-radio>
    </el-radio-group>

    <!-- 定时模式 -->
    <div class="timing_mode mode_card" v-if="currentMode == '定时模式'">
      <div
        :class="{
          time_select_item_box: true,
          is_active: tmsld.isActive,
          is_disabled: tmsld.isDisabled,
        }"
        v-for="(tmsld, indexT) in timingModeSelectListData"
        :key="indexT"
        @click="timeSelectItemClick(indexT)"
      >
        <span class="time_item_title">{{ tmsld.name }}</span>

        <img
          v-if="tmsld.isActive"
          class="corner_mark_img"
          src="../image/corner_mark.png"
        />

        <div class="disabled_mark_box" v-if="tmsld.isDisabled"></div>
      </div>
    </div>

    <!-- 周期模式 -->
    <div class="period_mode mode_card" v-if="currentMode == '周期模式'">
      <div class="select_item">
        <span class="label">起始时间：</span>
        <el-select
          class="period_item_select"
          v-model="periodModeSelectData.startTime"
          placeholder="请选择起始时间"
          size="large"
          style="width: 160px"
          @click="periodStartTimeSelectClick"
        >
          <el-option
            v-for="(pmst, indexso) in periodModeStartTimeSelectList"
            :key="indexso"
            :label="pmst.value"
            :value="pmst.value"
            @click="periodStartTimeOptionClick"
          />
        </el-select>
      </div>
      <div class="select_item">
        <span class="label">间隔时间：</span>
        <el-select
          class="period_item_select"
          v-model="periodModeSelectData.intervalTime"
          placeholder="请选择间隔时间"
          size="large"
          style="width: 160px"
          @click="periodIntervalTimeSelectClick"
        >
          <el-option
            v-for="(pmit, indexso) in periodModeIntervalTimeSelectList"
            :key="indexso"
            :label="`${pmit.value}小时`"
            :value="pmit.value"
            @click="periodIntervalTimeOptionClick"
          />
        </el-select>
      </div>
    </div>

    <!-- 当前模式 -->
    <div class="current_mode_box">
      <div class="current_mode_item">
        <span class="info_label">当前状态：</span>
        <span
          :class="{
            info_value: true,
            is_normal: currentStatus,
            is_not_normal: !currentStatus,
          }"
        >
          {{ currentStatus ? "正常" : "停止" }}
        </span>
      </div>
      <div class="current_mode_item">
        <span class="info_label">当前模式：</span>
        <span class="info_value">
          <span v-if="currentMode == '定时模式'">
            定时模式
            <span v-if="timingModeTimes.length == 0">(未选择时间)</span>
            <el-tag
              type="primary"
              class="timing_mode_tag"
              v-for="(tmt, indexT) in timingModeTimes"
              :key="indexT"
              >{{ tmt }}</el-tag
            >
          </span>
          <span v-if="currentMode == '周期模式'"
            >周期模式 (
            <span
              >起始时间：
              <el-tag type="primary" class="period_tag"
                >{{ periodModeSelectData.startTime }}
              </el-tag>
              ;&nbsp;
            </span>
            <span
              >间隔时间：
              <el-tag type="primary" class="period_tag"
                >{{ periodModeSelectData.intervalTime }}小时
              </el-tag>
            </span>
            )
          </span>
          <span v-if="currentMode == '触发模式'">触发模式</span>
        </span>
      </div>
    </div>

    <div class="action_box" v-if="currentMode !== '触发模式'">
      <!-- <el-button type="primary" @click="saveClick">保存</el-button> -->
      <SaveButton @save-click="saveClick">保存</SaveButton>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "RunningParam",
});
</script>
<script setup>
import TitleC from "../../../components/global/titleC.vue";
import SaveButton from "../../../components/global/saveButton.vue";
import { playClickSound } from "../../../utils/other.js";

// 周期模式起始时间的Select点击事件
const periodStartTimeSelectClick = () => {
  playClickSound();
};

// 周期模式起始时间的Option点击事件
const periodStartTimeOptionClick = () => {
  playClickSound();
};

// 周期模式间隔时间的Select点击事件
const periodIntervalTimeSelectClick = () => {
  playClickSound();
};

// 周期模式间隔时间的Option点击事件
const periodIntervalTimeOptionClick = () => {
  playClickSound();
};

// 定时模式保存事件
const timingModeSave = () => {
  // 更新定时模式已选中的时间
  let nTimingModeTimes = [];
  timingModeSelectListData.value.forEach((itemT) => {
    if (itemT.isActive) {
      nTimingModeTimes.push(itemT.value);
    }
  });
  timingModeTimes.value = nTimingModeTimes;
  console.log(timingModeTimes.value);
  // 拼接时间
  let timeJoinStr = timingModeTimes.value.join(";");
};

// 周期模式的保存事件
const periodModeSave = () => {
  console.log(periodModeSelectData.value);
};

// 保存的点击事件
const saveClick = () => {
  // playClickSound();
  // 根据不同的模式，触发不同的保存事件
  switch (currentMode.value) {
    case "定时模式":
      timingModeSave();
      break;

    case "周期模式":
      periodModeSave();
      break;

    default:
      break;
  }
};

// 运行模式的radio点击事件
const modeRadioClick = () => {
  playClickSound();
};

// 选择时间的点击事件
const timeSelectItemClick = (index) => {
  // 判断当前点击的是否是禁用状态，如果是直接退出
  if (timingModeSelectListData.value[index].isDisabled) {
    return;
  }

  // 播放音频
  playClickSound();

  // 创建介质新数组，用来存储数据
  let nTimingModeSelectListData = timingModeSelectListData.value;

  // 遍历数据，找到点击的时间，选中数据
  nTimingModeSelectListData.forEach((item, indexI) => {
    if (indexI == index) {
      item.isActive = !item.isActive;
    }
  });

  // 当前已经被选中的时间的下标列表
  let currentActiveTimeIndexs = [];

  // 遍历数据，找到已经选中的时间下标，形成一个数组
  nTimingModeSelectListData.forEach((item, indexI) => {
    if (item.isActive) {
      currentActiveTimeIndexs.push(indexI);
    }
    item.isDisabled = false;
  });

  // 遍历已经选中的时间下标数组，判断是否需要禁用
  currentActiveTimeIndexs.forEach((itemI) => {
    if (itemI == 0) {
      // 如果下标为0（00:00），则禁用下标为1（01:00）和下标为23（23:00）
      nTimingModeSelectListData[23].isDisabled = true;
      nTimingModeSelectListData[itemI + 1].isDisabled = true;
    } else if (itemI == 23) {
      // 如果下标为23（23:00），则禁用下标为22（22:00）和下标为0（00:00）
      nTimingModeSelectListData[0].isDisabled = true;
      nTimingModeSelectListData[itemI - 1].isDisabled = true;
    } else {
      // 如果下标不为0和23，则禁用下标为当前下标-1（上一次）和当前下标+1（下一次）
      if (!nTimingModeSelectListData[itemI - 1].isActive) {
        nTimingModeSelectListData[itemI - 1].isDisabled = true;
        nTimingModeSelectListData[itemI + 1].isDisabled = true;
      }
      if (!nTimingModeSelectListData[itemI + 1].isActive) {
        nTimingModeSelectListData[itemI + 1].isDisabled = true;
        nTimingModeSelectListData[itemI - 1].isDisabled = true;
      }
    }
  });

  // 更新响应式数据
  timingModeSelectListData.value = nTimingModeSelectListData;
};

// 模式选择列表数据
const modeSelectListData = [
  {
    index: 0,
    label: "定时模式",
    value: "timing_mode",
  },
  {
    index: 1,
    label: "周期模式",
    value: "period_mode",
  },
  {
    index: 2,
    label: "触发模式",
    value: "trigger_mode",
  },
];

// 当前选择的模式
const currentMode = ref("定时模式");

// 周期模式选择的数据
const periodModeSelectData = ref({
  startTime: "00:00",
  intervalTime: 3,
});

// 周期模式起始时间选择数据
const periodModeStartTimeSelectList = [
  {
    label: "00:00",
    value: "00:00",
  },
  {
    label: "01:00",
    value: "01:00",
  },
  {
    label: "02:00",
    value: "02:00",
  },
  {
    label: "03:00",
    value: "03:00",
  },
  {
    label: "04:00",
    value: "04:00",
  },
  {
    label: "05:00",
    value: "05:00",
  },
  {
    label: "06:00",
    value: "06:00",
  },
  {
    label: "07:00",
    value: "07:00",
  },
  {
    label: "08:00",
    value: "08:00",
  },
  {
    label: "09:00",
    value: "09:00",
  },
  {
    label: "10:00",
    value: "10:00",
  },
  {
    label: "11:00",
    value: "11:00",
  },
  {
    label: "12:00",
    value: "12:00",
  },
  {
    label: "13:00",
    value: "13:00",
  },
  {
    label: "14:00",
    value: "14:00",
  },
  {
    label: "15:00",
    value: "15:00",
  },
  {
    label: "16:00",
    value: "16:00",
  },
  {
    label: "17:00",
    value: "17:00",
  },
  {
    label: "18:00",
    value: "18:00",
  },
  {
    label: "19:00",
    value: "19:00",
  },
  {
    label: "20:00",
    value: "20:00",
  },
  {
    label: "21:00",
    value: "21:00",
  },
  {
    label: "22:00",
    value: "22:00",
  },
  {
    label: "23:00",
    value: "23:00",
  },
];

// 周期模式间隔时间选择数据
const periodModeIntervalTimeSelectList = [
  {
    label: 2,
    value: 2,
  },
  {
    label: 3,
    value: 3,
  },
  {
    label: 4,
    value: 4,
  },
  {
    label: 5,
    value: 5,
  },
  {
    label: 6,
    value: 6,
  },
  {
    label: 7,
    value: 7,
  },
  {
    label: 8,
    value: 8,
  },
  {
    label: 9,
    value: 9,
  },
  {
    label: 10,
    value: 10,
  },
  {
    label: 11,
    value: 11,
  },
  {
    label: 12,
    value: 12,
  },
  {
    label: 13,
    value: 13,
  },
  {
    label: 14,
    value: 14,
  },
  {
    label: 15,
    value: 15,
  },
  {
    label: 16,
    value: 16,
  },
  {
    label: 17,
    value: 17,
  },
  {
    label: 18,
    value: 18,
  },
  {
    label: 19,
    value: 19,
  },
  {
    label: 20,
    value: 20,
  },
  {
    label: 21,
    value: 21,
  },
  {
    label: 22,
    value: 22,
  },
  {
    label: 23,
    value: 23,
  },
];

// 定时模式选择列表数据
const timingModeSelectListData = ref([
  {
    name: "00:00",
    value: "00:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "01:00",
    value: "01:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "02:00",
    value: "02:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "03:00",
    value: "03:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "04:00",
    value: "04:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "05:00",
    value: "05:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "06:00",
    value: "06:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "07:00",
    value: "07:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "08:00",
    value: "08:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "09:00",
    value: "09:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "10:00",
    value: "10:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "11:00",
    value: "11:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "12:00",
    value: "12:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "13:00",
    value: "13:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "14:00",
    value: "14:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "15:00",
    value: "15:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "16:00",
    value: "16:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "17:00",
    value: "17:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "18:00",
    value: "18:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "19:00",
    value: "19:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "20:00",
    value: "20:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "21:00",
    value: "21:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "22:00",
    value: "22:00",
    isDisabled: false,
    isActive: false,
  },
  {
    name: "23:00",
    value: "23:00",
    isDisabled: false,
    isActive: false,
  },
]);

// 定时模式选择的时间
const timingModeTimes = ref([]);

// 当前状态
const currentStatus = ref(false);
</script>

<style lang="scss" scoped>
.running_param_wrap {
  height: 100%;
  position: relative;
  .mode_card {
    padding: 0px 20px 0px 20px;
  }
  .timing_mode {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0px 20px 0px 20px;

    .time_select_item_box {
      width: 190px;
      height: 150px;
      margin: 0px 10px 30px 4px;
      box-sizing: border-box;
      color: #504f4f;
      // border: 2px solid rgba(92, 91, 91, 0.4);
      background: rgb(255, 255, 255);
      text-align: center;
      border-radius: 6px;
      position: relative;
      cursor: pointer;

      .time_item_title {
        font-size: 24px;
        font-family: SYHT-Bold;
        letter-spacing: 2px;
        position: relative;
        top: 38%;
        transform: translateY(-50%);
      }

      .corner_mark_img {
        position: absolute;
        bottom: -1px;
        right: -1px;
        width: 50px;
        height: 50px;
        border-bottom-right-radius: 6px;
      }

      .disabled_mark_box {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 6px;
      }
    }

    .is_active {
      border: 1px solid #4398f6;
    }
  }

  .period_mode {
    display: flex;
    flex-direction: column;
    .select_item {
      margin-bottom: 20px;
      .label {
        font-size: 18px;
        font-family: SYHT-Bold;
        letter-spacing: 2px;
        margin-right: 8px;
      }

      .period_item_select {
        position: relative;
        top: -2px;
      }
    }
  }

  .current_mode_box {
    width: 70%;
    height: 70px;
    position: absolute;
    bottom: 0;
    left: 0px;
    // border: 1px solid red;
    display: flex;
    flex-direction: column;

    .current_mode_item {
      display: flex;
      flex-direction: row;
      height: 35px;
      line-height: 35px;
      // border: 1px solid red;

      .info_label {
        font-size: 19px;
        font-family: SYHT-Bold;
        letter-spacing: 2px;
      }

      .info_value {
        font-size: 18px;
        font-family: SYHT-Regular;
        letter-spacing: 2px;

        .timing_mode_tag {
          margin-left: 8px;
          margin-top: -4px;
          font-size: 16px;
        }

        .period_tag {
          font-size: 16px;
          margin-top: -4px;
          margin-left: -10px;
        }
      }

      .is_normal {
        color: green;
        font-family: SYHT-Bold;
      }

      .is_not_normal {
        color: red;
        font-family: SYHT-Bold;
      }
    }
  }

  .action_box {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}

/* save button */
// ::v-deep .el-button--primary {
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
// ::v-deep .el-button--primary:active {
//   transform: scale(0.9);
// }

/* Radio */
::v-deep .mode_select_box_group {
  padding: 6px 0px 40px 24px;
  width: 524px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // border: 1px solid red;
}

::v-deep .el-radio {
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

/* select */
::v-deep .el-select {
  .el-select__wrapper {
    .el-select__selection {
      .el-select__selected-item {
        font-size: 16px;
        font-family: SYHT-Bold;
        color: rgb(126, 126, 126);
        letter-spacing: 1px;
      }
    }
  }
}
</style>
