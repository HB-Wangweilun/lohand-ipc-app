<template>
  <div class="running_mode_wrap">
    <TitleC title="参数设置"></TitleC>
    <div class="param_setting_box">
      <div class="param_setting_item">
        <span class="label">采水时间：</span>
        <el-input-number
          v-model="paramSettingData.collectWaterTime"
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
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "RunningMode",
});
</script>
<script setup>
import TitleC from "../../../components/global/titleC.vue";
import SaveButton from "../../../components/global/saveButton.vue";
import { playClickSound } from "../../../utils/other.js";

// 保存点击事件
const saveClick = () => {
  // playClickSound();
};

// 输入框点击事件-触发点击音效
const inputPlaySound = () => {
  playClickSound();
};

// 参数设置数据
const paramSettingData = ref({
  // 采集时间
  collectWaterTime: 0,
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
  sampleCupInflowAndDrainWaterTime: 0,
});
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

/* Number - input */
::v-deep .el-input-number {
  width: 180px;
  height: 40px;
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
