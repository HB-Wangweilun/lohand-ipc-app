<template>
  <div class="single_control_wrap">
    <TitleC title="模块单控"></TitleC>
    <!-- 单控内容 -->
    <div class="single_control_content_box">
      <div
        class="single_control_item_box"
        v-for="(mscl, indexM) in modeSingleControlList"
        :key="indexM"
      >
        <img
          v-if="mscl.icon == '采样泵'"
          class="icon"
          src="../image/采样泵.png"
        />
        <img
          v-if="mscl.icon == '空压机'"
          class="icon"
          src="../image/空压机.png"
        />
        <img
          v-if="mscl.icon == '进样阀'"
          class="icon jyf"
          src="../image/进样阀.png"
        />
        <img
          v-if="mscl.icon == '清洗阀'"
          class="icon"
          src="../image/清洗阀.png"
        />
        <img
          v-if="mscl.icon == '气吹阀'"
          class="icon"
          src="../image/气吹阀.png"
        />
        <img
          v-if="mscl.icon == '除藻机'"
          class="icon"
          src="../image/除藻机.png"
        />
        <img
          v-if="mscl.icon == '排空阀'"
          class="icon"
          src="../image/排空阀.png"
        />
        <img
          v-if="mscl.icon == '加药阀'"
          class="icon"
          src="../image/加药阀.png"
        />
        <img
          v-if="mscl.icon == '进样泵进水'"
          class="icon"
          src="../image/进样泵进水.png"
        />
        <img
          v-if="mscl.icon == '进样泵排水'"
          class="icon"
          src="../image/进样泵排水.png"
        />
        <img
          v-if="mscl.icon == '隔膜泵排水'"
          class="icon"
          src="../image/gemobengpaishui.png"
        />
        <span class="label">{{ mscl.moduleName }}：</span>
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

    <!-- 提示 -->
    <HintPopUp
      v-if="isShowHintPopUp"
      title="提示"
      :show="isShowHintPopUp"
      :message-content="popMessage"
      :font-size="34"
      :letter-spacing="14"
      :is-show-icon="false"
    >
    </HintPopUp>

    <!-- 提示 - 复位成功 -->
    <HintPopUp
      v-if="isShowResetPop"
      title="提示"
      :show="isShowResetPop"
      :message-content="resetMessageContent"
      :is-show-icon="true"
    >
    </HintPopUp>

    <!-- 提示 - 保存成功 -->
    <HintPopUp
      v-if="isShowSaveSuccessHintPopUp"
      title="提示"
      :show="isShowSaveSuccessHintPopUp"
      :message-content="'保存成功!'"
      :is-show-icon="true"
    >
    </HintPopUp>

    <!-- 加载 -->
    <LoadingC v-if="isShowLoading" class="loadingc_mode"></LoadingC>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "SingleControl"
})
</script>
<script setup>
import { playClickSound } from "../../../utils/other.js"
import HintPopUp from "../../../components/global/hintPopUp.vue"
import LoadingC from "../../../components/loadingC/index.vue"
import TitleC from "../../../components/global/titleC.vue"
import {
  selectModuleSetApi,
  runModuleApi,
  resetSetApi
} from "../../../api/paramSetting.js"

// 显示加载效果的标识
const isShowLoading = ref(false)

// 复位提示显示的标识
const isShowResetPop = ref(false)

// 显示保存成功的标识
const isShowSaveSuccessHintPopUp = ref(false)

// 复位信息提示内容
const resetMessageContent = ref("")

// 复位点击事件
const restorationClick = async () => {
  isShowLoading.value = true
  playClickSound()
  await resetSetApi()
    .then((res) => {
      resetMessageContent.value = "复位成功！"
    })
    .catch((res) => {
      resetMessageContent.value = "复位失败！"
    })
    .finally(() => {
      selectModuleSetFunc()
      isShowResetPop.value = true
      setTimeout(() => {
        isShowResetPop.value = false
      }, 1500)
      isShowLoading.value = false
    })
}

// 提示信息
const popMessage = ref("")

// 显示提示的标识
const isShowHintPopUp = ref(false)

// 单控项change事件
const modeSingleItemSwitchChange = (item) => {
  console.log(item, "开关")
  playClickSound()

  // 判断是否是 采样泵1 和 采样泵2
  if (item.moduleName == "采样泵1" || item.moduleName == "采样泵2") {
    // 判断是开启还是关闭
    if (item.status) {
      // 开启
      switch (item.moduleName) {
        case "采样泵1":
          popMessage.value = "将会同时打开 进样阀1、进样阀3!"
          isShowHintPopUp.value = true
          setTimeout(() => {
            isShowHintPopUp.value = false
          }, 3000)
          break
        case "采样泵2":
          popMessage.value = "将会同时打开 进样阀2、进样阀3!"
          isShowHintPopUp.value = true
          setTimeout(() => {
            isShowHintPopUp.value = false
          }, 3000)
          break
        default:
          break
      }
    } else {
      // 关闭
      switch (item.moduleName) {
        case "采样泵1":
          popMessage.value = "将会同时关闭 进样阀1、进样阀3!"
          isShowHintPopUp.value = true
          setTimeout(() => {
            isShowHintPopUp.value = false
          }, 1500)
          break
        case "采样泵2":
          popMessage.value = "将会同时关闭 进样阀2、进样阀3!"
          isShowHintPopUp.value = true
          setTimeout(() => {
            isShowHintPopUp.value = false
          }, 3000)
          break
        default:
          break
      }
    }
  }
  setTimeout(() => {
    runModuleFunc(item)
  }, 200)
  console.log(item)
}

// 运行模块的函数
const runModuleFunc = async (item) => {
  console.log(item)
  let data = {
    moduleId: item.moduleId,
    status: item.status ? 1 : 0
  }
  await runModuleApi(data)
    .then((res) => {
      // isShowSaveSuccessHintPopUp.value = true
      // setTimeout(() => {
      //   isShowSaveSuccessHintPopUp.value = false
      // }, 1500)
      if (res.result == "success") {
        setTimeout(() => {
          selectModuleSetFunc()
        }, 1000)
      } else {
        console.log("...............")
        // popMessage.value = "请先确认已打开进样阀2、进样阀3!"
        // isShowHintPopUp.value = true
        // setTimeout(() => {
        //   isShowHintPopUp.value = false
        // }, 1500)
      }
    })
    .catch(() => {})
    .finally(() => {})
}

// 图标匹配列表
const iconList = {
  采样泵1: "采样泵",
  采样泵2: "采样泵",
  空压机: "空压机",
  进样阀1: "进样阀",
  进样阀2: "进样阀",
  进样阀3: "进样阀",
  清洗阀1: "清洗阀",
  气吹阀: "气吹阀",
  除藻机: "除藻机",
  排空阀1: "排空阀",
  排空阀2: "排空阀",
  排空阀3: "排空阀",
  加药阀: "加药阀",
  进样泵进水: "进样泵进水",
  进样泵排水: "进样泵排水",
  隔膜泵排水: "隔膜泵排水"
}

// 查询模块单控设置数据的函数
const selectModuleSetFunc = async () => {
  await selectModuleSetApi().then((res) => {
    console.log(res.data, "模块单控数据")
    res.data.forEach((item) => {
      item.icon = iconList[item.moduleName]
      item.status = item.status == true ? true : false
    })

    modeSingleControlList.value = res.data
  })
}

// 模块单控列表
const modeSingleControlList = ref([])

// init
onMounted(() => {
  selectModuleSetFunc()
})
</script>

<style lang="scss" scoped>
.single_control_wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .single_control_content_box {
    width: 98%;
    height: 400px;
    padding: 20px 0px 0px 20px;
    // border: 1px solid red;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .single_control_item_box {
      // border: 1px solid red;
      width: 320px;
      height: 50px;
      .label {
        width: 140px;
        display: inline-block;
        // border: 1px solid red;
        font-family: SYHT-regular;
        font-size: 20px;
        letter-spacing: 2px;
        margin-right: 10px;
      }

      .icon {
        width: 30px;
        margin-right: 10px;
        position: relative;
        top: 6px;
      }

      .jyf {
        top: 3px;
      }
    }
  }

  .action_box {
    position: absolute;
    bottom: 0;
    right: 20px;
  }

  /* 加载 */
  .loadingc_mode {
    position: absolute;
    top: 34%;
    left: 48%;
    transform: translate(-50%, -50%);
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

:deep(.el-switch) {
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

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: #13ce66 !important;
  border: 1px solid rgb(140, 191, 247) !important;
}
</style>
