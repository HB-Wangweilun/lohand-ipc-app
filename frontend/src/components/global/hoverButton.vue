<template>
  <div class="hover_button_wrap">
    <van-floating-bubble icon="chat">
      <!-- <div
        :class="{
          dev_operate_box: true,
          run: operateStatus,
          stop: !operateStatus
        }"
      >
        <div class="top">
          <img
            class="icon"
            v-if="operateStatus"
            src="../../assets/image/stop.svg"
          />
          <img class="icon" v-else src="../../assets/image/run.svg" />
        </div>
        <div class="bottom">
          <span class="text">{{ operateStatus ? "停止" : "运行" }}</span>
        </div>
      </div> -->
      <div class="container">
        <input
          type="checkbox"
          id="checkbox"
          :checked="globalVariableStore.operateStatus"
          @click="hoverButtonClick"
        />
        <label for="checkbox" class="button">
          <span class="icon">
            <svg
              data-darkreader-inline-fill=""
              style="--darkreader-inline-fill: #000000"
              fill=""
              xml:space="preserve"
              viewBox="0 0 30.143 30.143"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              id="Capa_1"
              version="1.1"
              width="200px"
              height="200px"
            >
              <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path
                    data-darkreader-inline-fill=""
                    d="M20.034,2.357v3.824c3.482,1.798,5.869,5.427,5.869,9.619c0,5.98-4.848,10.83-10.828,10.83 c-5.982,0-10.832-4.85-10.832-10.83c0-3.844,2.012-7.215,5.029-9.136V2.689C4.245,4.918,0.731,9.945,0.731,15.801 c0,7.921,6.42,14.342,14.34,14.342c7.924,0,14.342-6.421,14.342-14.342C29.412,9.624,25.501,4.379,20.034,2.357z"
                  ></path>
                  <path
                    data-darkreader-inline-fill=""
                    d="M14.795,17.652c1.576,0,1.736-0.931,1.736-2.076V2.08c0-1.148-0.16-2.08-1.736-2.08 c-1.57,0-1.732,0.932-1.732,2.08v13.496C13.062,16.722,13.225,17.652,14.795,17.652z"
                  ></path>
                </g>
              </g>
            </svg>
          </span>
        </label>
      </div>
    </van-floating-bubble>

    <HintPopUp
      v-if="isShowDialog"
      :show="isShowDialog"
      :title="`提示`"
      font-size="35"
      :is-show-icon="false"
      :message-content="dialogMessage"
    ></HintPopUp>

    <!-- 确定强制停止的弹窗 -->
    <forceStopMessageBox
      v-if="isShowForceStopMessageBox"
      :show="isShowForceStopMessageBox"
      :title="`提示`"
      font-size="30"
      :is-show-icon="false"
      :message-content="'设备正在运行，是否需要强制停止?'"
      @closeDialog="closeForceStopDialog"
      @okClick="forceStopFunc"
    ></forceStopMessageBox>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  computed
} from "vue"
import "./hoverBotton.scss"
export default defineComponent({
  name: "HoverButton"
})
</script>
<script setup>
import { playClickSound } from "../../utils/other"
import { showToast } from "vant"
import {
  selectStatusApi,
  startApi,
  stopApi,
  forceStopApi
} from "../../api/hoverButton.js"
import HintPopUp from "./hintPopUp.vue"
import { useGlobalVariableStore } from "../../store"
import { ElMessageBox } from "element-plus"
import forceStopMessageBox from "./forceStopMessageBox.vue"

// 是否显示强制停止弹窗的标识
const isShowForceStopMessageBox = ref(false)

const globalVariableStore = useGlobalVariableStore()

// 弹窗信息
const dialogMessage = ref("")

// 显示弹窗的标识
const isShowDialog = ref(false)

// 操作状态
// false - 停止中    true - 运行中
// const operateStatus = ref(false)

// 显示弹窗
const showDialog = () => {
  isShowDialog.value = true
}

// 关闭弹窗
const closeDialog = () => {
  isShowDialog.value = false
}

// 关闭强制停止的弹窗
const closeForceStopDialog = () => {
  isShowForceStopMessageBox.value = false
  // 恢复按钮状态
  let count = 0
  var closesi = setInterval(() => {
    console.log(111)
    if (count < 2) {
      count++
      globalVariableStore.operateStatus = !globalVariableStore.operateStatus
      console.log(`执行关闭${count}次`, globalVariableStore.operateStatus)
    } else {
      clearInterval(closesi)
    }
  }, 20)
}

// 查询状态的函数
const selectStatusFunc = async () => {
  selectStatusApi().then((res) => {
    console.log(res.data, "当前状态")
    res.data == 0
      ? (globalVariableStore.operateStatus = false)
      : (globalVariableStore.operateStatus = true)
  })
}

// 点击按钮的函数
const hoverButtonClick = (e) => {
  console.log(e.target.checked)
  console.log(globalVariableStore.operateStatus)
  // globalVariableStore.operateStatus = !globalVariableStore.operateStatus
  if (globalVariableStore.operateStatus) {
    console.log("将要执行关闭")

    stopFunc(e)
  } else {
    console.log("将要执行启动")

    startFunc(e)
  }
}

// 强制停止函数
const forceStopFunc = async () => {
  await forceStopApi().then((res) => {
    console.log("强制停止")
    closeForceStopDialog()
    globalVariableStore.operateStatus = false
  })
}

// 停止函数
const stopFunc = async (e) => {
  let flag = e.target.checked
  await stopApi().then((res) => {
    switch (res.result) {
      case "success":
        globalVariableStore.operateStatus = false
        break

      case "error":
        isShowForceStopMessageBox.value = true
        setTimeout(() => {
          isShowForceStopMessageBox.value = false
        }, 2000000)
        // console.log("关闭失败")
        // let count = 0
        // var closesi = setInterval(() => {
        //   console.log(111)
        //   if (count < 2) {
        //     count++
        //     globalVariableStore.operateStatus =
        //       !globalVariableStore.operateStatus
        //     console.log(`执行关闭${count}次`, globalVariableStore.operateStatus)
        //   } else {
        //     clearInterval(closesi)
        //   }
        // }, 20)
        break

      default:
        break
    }
  })
}

// 启动状态的函数
const startFunc = async (e) => {
  if (e.target.checked) {
    console.log("开启")
    console.log(e.target.checked)
    globalVariableStore.operateStatus = e.target.checked
    let flag = globalVariableStore.operateStatus
    playClickSound()
    startApi()
      .then((res) => {
        switch (res.result) {
          case "success":
            dialogMessage.value = res.data
            if (globalVariableStore.operateStatus) {
              isShowDialog.value = true
              setTimeout(() => {
                isShowDialog.value = false
              }, 2000)
            }
            console.log(dialogMessage.value)
            console.log(isShowDialog.value)
            // operateStatus.value = !operateStatus.value
            break
          case "error":
            dialogMessage.value = res.data
            globalVariableStore.operateStatus = flag
            break
          default:
            break
        }
      })
      .catch((err) => {
        // console.log(operateStatus.value)
      })
      .finally((err) => {
        // console.log(err)
      })
  } else {
    console.log("关闭")
    let count = 0
    var closesi = setInterval(() => {
      console.log(111)
      if (count < 2) {
        count++
        globalVariableStore.operateStatus = !globalVariableStore.operateStatus
        console.log(`执行关闭${count}次`, globalVariableStore.operateStatus)
      } else {
        clearInterval(closesi)
      }
    }, 200)
  }
}

onMounted(() => {
  selectStatusFunc()
  // setInterval(() => {
  //   operateStatus.value = !operateStatus.value
  // }, 2000)
})
</script>

<style lang="scss" scoped>
@import url(../../assets/css/van-floating-bubble/floating-1.scss);
// @import url();

:deep(.el-overlay) {
  z-index: 99999999999999999999 !important;

  .el-overlay-message-box {
    .el-message-box {
      .el-message-box__header {
        background: rgba(94, 142, 230, 0.4) !important;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .el-message-box__title {
          span {
            border: 1px solid red;
          }
        }
        .el-message-box__headerbtn {
          display: none !important;
        }
      }
    }
  }
}

// :deep(.el-overlay){

// }

// .dev_operate_box {
//   width: 100%;
//   height: 100%;
//   color: white;
//   font-size: 20px;
//   font-family: SYHT-Bold;
//   letter-spacing: 5px;
//   padding: 16px 0px 0px 0px;
//   transition: 0.3s;

//   .top {
//     // border: 1px solid white;
//     position: relative;
//     width: 100%;
//     height: 40px;

//     .icon {
//       width: 32px;
//       height: 32px;
//       position: absolute;
//       left: 50%;
//       transform: translateX(-50%);
//     }
//   }

//   .bottom {
//     width: 100%;
//     height: 50px;
//     text-align: center;
//     .text {
//       text-align: center;
//     }
//   }
// }

// .run {
//   background: rgba(red, 0.7);
// }

// .stop {
//   background: rgba(rgb(9, 47, 216), 0.7);
// }

.hover_button_wrap {
  position: fixed;
  top: 0px;
  right: 0px;
}

.container {
  cursor: pointer;
  width: 7em;
  height: 7em;
  position: relative;
}

.button {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid rgba(#090909, 0.5);
  background-color: transparent;
  background-image: linear-gradient(
    145deg,
    rgba(#171717, 0.5),
    rgba(#444245, 0.5)
  );
  box-sizing: border-box;
  box-shadow:
    inset 2px 2px 0 rgba(#7d7c7e, 0.5),
    inset -2px -2px 0px rgba(#1c1c1c, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid rgba(7, 219, 77, 0.5);
  animation: animeDefaultBorder 0.3s linear alternate-reverse infinite;
}

.container input {
  display: none;
}

.button::before {
  position: absolute;
  content: "";
  width: 7.25em;
  height: 7.25em;
  border-radius: inherit;
  background-color: transparent;
  // background-image: linear-gradient(145deg, #262626, #606060);
  z-index: -1;
  // box-shadow:
  //   11px 11px 22px #141414,
  //   -11px -11px 22px #525252;
}

.button .icon {
  width: 60px;
  height: 60px;
  display: inline-block;
}

.button .icon svg {
  height: 100%;
  width: 100%;
  fill: rgba(7, 197, 54, 0.5);

  animation: animeDefaultFill 0.3s linear alternate-reverse infinite;
}

.container input:checked + .button {
  // box-shadow:
  //   inset -2px -2px 0 #5e5e5e,
  //   inset 2px 2px 0 #1c1c1c;
  border: 4px solid rgba(215, 0, 0, 0.5);
  animation: animeBorder 0.3s linear alternate-reverse infinite;
}

.container input:checked + .button .icon svg {
  fill: rgba(215, 0, 0, 0.5);
  animation: animeFill 0.3s linear alternate-reverse infinite;
}

/* 启动状态 */
@keyframes animeFill {
  to {
    fill: rgba(194, 0, 0, 0.754);
  }
}

@keyframes animeBorder {
  to {
    border-color: rgba(175, 0, 0, 0.878);
  }
}

/* 默认状态 */
@keyframes animeDefaultFill {
  to {
    fill: rgba(18, 207, 50, 0.754);
  }
}

@keyframes animeDefaultBorder {
  to {
    border-color: rgba(33, 197, 69, 0.878);
  }
}
</style>
