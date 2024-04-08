<template>
  <VScaleScreen :width="1920" height="1080">
    <div class="layout_warp">
      <Header></Header>
      <Bubble></Bubble>
      <div class="layout_main_wrap">
        <router-view></router-view>
      </div>
    </div>
  </VScaleScreen>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "Layout"
})
</script>
<script setup>
import Header from "./components/header/index.vue"
import Bubble from "./components/bubble/index.vue"
import VScaleScreen from "v-scale-screen"
import { enterScreensaverFunc } from "../utils/other.js"

/* 判断用户多长时间无操作 - 30分钟进入屏保程序 */
let idleTime = 0

function startTimer() {
  idleTime = 0
  window.setInterval(timerIncrement, 1000) // 每秒增加计时
}

function timerIncrement() {
  idleTime = idleTime + 1 // 每秒计时增加1秒
  // console.log(idleTime)
  if (idleTime > 1800) {
    // 假设5秒无操作为无操作
    alertUser() // 用户无操作5秒后执行的操作
  }
}

function alertUser() {
  console.log("您已经30分钟无操作了！")
  // 可以在这里执行更多操作，比如弹窗提示用户

  // 进入屏保
  // C:\Windows\System32\Mystify.scr -s
  enterScreensaverFunc()
  // startTimer()
  idleTime = 0
}

// 开始计时
startTimer()

// 监听鼠标移动和键盘按下事件来重置计时器
document.addEventListener("mousemove", resetTimer)
document.addEventListener("keydown", resetTimer)

function resetTimer() {
  idleTime = 0 // 用户有操作，重置计时器
}
</script>

<style lang="scss" scoped>
.layout_warp {
  width: 1920px;
  height: 1080px;
  font-family: SYHT-Regular;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .layout_main_wrap {
    // border: 1px solid red;
    height: 94.44%;
    box-sizing: border-box;
  }
}

// .inner-header {
//   height: 65vh;
//   width: 100%;
//   margin: 0;
//   padding: 0;
// }
</style>
