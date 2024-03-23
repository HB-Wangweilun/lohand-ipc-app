<template>
  <div class="init_wrap">
    <div class="cleaning_water_entrance_box">
      <TitleC title="清洗水入口选择"></TitleC>
      <el-radio-group
        class="cleaning_water_entrance_group"
        v-model="cleaningWaterEntranceIndex"
      >
        <el-radio
          v-for="(cweo, indexc) in cleaningWaterEntranceOptions"
          :key="indexc"
          :label="cweo.value"
        ></el-radio>
      </el-radio-group>
    </div>
    <div class="sampling_pump_job_mode_box">
      <TitleC title="采样泵工作模式"></TitleC>
      <el-radio-group
        class="sampling_pump_job_mode_group"
        v-model="samplingPumpJobModeIndex"
      >
        <el-radio
          v-for="(spjm, indexs) in samplingPumpJobModeOptions"
          :key="indexs"
          :label="spjm.value"
        ></el-radio>
      </el-radio-group>
    </div>
    <div class="sensor_box">
      <TitleC title="传感器选择"></TitleC>
      <div class="sensor_content">
        <span class="sensor_label">版本：</span>
        <el-select
          class="sensor_select"
          v-model="sensorIndex"
          placeholder="Select"
          size="large"
          style="width: 140px"
        >
          <el-option
            v-for="(so, indexso) in sensorOptions"
            :key="indexso"
            :label="so.name"
            :value="so.name"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  name: "Init",
});
</script>
<script setup>
import TitleC from "../../../components/global/titleC.vue";

// 清洗水入口选择数据下标
const cleaningWaterEntranceIndex = ref("原水");

// 采样泵工作模式数据下标
const samplingPumpJobModeIndex = ref("采样泵1");

// 传感器选择数据下标
const sensorIndex = ref("普通版");

// 清洗水入口选择数据Options
const cleaningWaterEntranceOptions = ref([
  {
    index: 0,
    name: "原水",
    value: "原水",
  },
  {
    index: 1,
    name: "自来水",
    value: "自来水",
  },
]);

// 采样泵工作模式数据Options
const samplingPumpJobModeOptions = ref([
  {
    index: 0,
    name: "采样泵1",
    value: "采样泵1",
  },
  {
    index: 1,
    name: "采样泵2",
    value: "采样泵2",
  },
  {
    index: 2,
    name: "采样泵1、2交替",
    value: "采样泵1、2交替",
  },
]);

// 传感器选择数据Options
const sensorOptions = ref([
  {
    index: 0,
    name: "普通版",
    value: "普通版",
  },
  {
    index: 1,
    name: "认证版",
    value: "认证版",
  },
]);

onMounted(() => {});
</script>

<style lang="scss" scoped>
.init_wrap {
  .cleaning_water_entrance_box {
    margin-bottom: 36px;
    .cleaning_water_entrance_group {
      padding: 4px 24px;
    }
  }

  .sampling_pump_job_mode_box {
    margin-bottom: 36px;
    .sampling_pump_job_mode_group {
      padding: 4px 24px;
    }
  }

  .sensor_box {
    .sensor_content {
      padding: 16px 20px;
      .sensor_label {
        font-size: 20px;
        margin-right: 6px;
      }

      .sensor_select {
        position: relative;
        top: -4px;
      }
    }
  }
}

::v-deep .el-select {
  .el-select__wrapper {
    .el-select__selection {
      .el-select__selected-item {
        font-size: 18px;
        font-family: SYHT-Bold;
        color: rgb(126, 126, 126);
        letter-spacing: 2px;
      }
    }
  }
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

// ::v-deep
</style>
