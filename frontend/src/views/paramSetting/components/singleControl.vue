<template>
  <div class="single_control_wrap">
    <!-- 单控内容 -->
    <div class="single_control_content_box">
      <div
        class="single_control_item_box"
        v-for="(mscl, indexM) in modeSingleControlList"
        :key="indexM"
      >
        <span class="label">{{ mscl.label }}：</span>
        <el-switch
          v-model="mscl.status"
          @change="modeSingleItemSwitchChange(mscl)"
        />
      </div>
    </div>
    <!-- 操作 -->
    <div class="action_box">
      <el-button type="primary" @click="restorationClick">
        <img class="save_img" src="../image/restoration.png" />
        复位
      </el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  name: "SingleControl",
});
</script>
<script setup>
import { playClickSound } from "../../../utils/other.js";

// 复位点击事件
const restorationClick = () => {
  playClickSound();
  modeSingleControlList.value.forEach((mItem) => {
    if (mItem.label == "排空阀3") {
      mItem.status = true;
    } else {
      mItem.status = false;
    }
  });
};

// 单控项change事件
const modeSingleItemSwitchChange = (item) => {
  playClickSound();
  if (item.label == "采样泵1" || item.label == "采样泵2") {
    switch (item.label) {
      case "采样泵1":
        console.log("请先确认已打开采样泵1、采样泵3!");
        break;
      case "采样泵2":
        console.log("请先确认已打开采样泵2、采样泵3!");

        break;
      default:
        break;
    }
  }
  console.log(item);
};

// 模块单控列表
const modeSingleControlList = ref([
  {
    label: "采样泵1",
    status: false,
  },
  {
    label: "采样泵2",
    status: false,
  },
  {
    label: "空压机",
    status: false,
  },
  {
    label: "进样阀1",
    status: false,
  },
  {
    label: "进样阀2",
    status: false,
  },
  {
    label: "进样阀3",
    status: false,
  },
  {
    label: "清洗阀1",
    status: false,
  },
  {
    label: "气吹阀",
    status: false,
  },
  {
    label: "除藻机",
    status: false,
  },
  {
    label: "排空阀1",
    status: false,
  },
  {
    label: "排空阀2",
    status: false,
  },
  {
    label: "加药阀",
    status: false,
  },
  {
    label: "进样泵进水",
    status: false,
  },
  {
    label: "进样泵排水",
    status: false,
  },
  {
    label: "排空阀3",
    status: true,
  },
]);
</script>

<style lang="scss" scoped>
.single_control_wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .single_control_content_box {
    width: 80%;
    height: 500px;
    padding: 16px 0px 0px 4px;
    // border: 1px solid red;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .single_control_item_box {
      // border: 1px solid red;
      width: 260px;
      height: 50px;
      .label {
        font-family: SYHT-regular;
        font-size: 20px;
        letter-spacing: 2px;
        margin-right: 10px;
      }
    }
  }

  .action_box {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
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

::v-deep .el-switch {
  transform: scale(1.6);
  position: relative;
  top: -3px;
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
</style>
