<template>
  <div class="scroll_div">
    <marquee direction="left" scrollamount="4" behavior="scroll">
      {{ textRollInfo.msg }}
      <!-- <span class="text">{{ globalVariableStore.textRollInfo.msg }}1</span> -->
    </marquee>
  </div>
</template>

<script>
import { defineComponent, watch, nextTick, ref, onMounted, computed } from "vue"
export default defineComponent({
  name: "HeaderTextRoll"
})
</script>
<script setup>
import { useGlobalVariableStore } from "../../../store"
import WebSockets from "ws"
// import { io } from "socket.io-client"
// import { setupWebSocket, retryConnection } from "../../../utils/websocket.js"

const globalVariableStore = useGlobalVariableStore()

// props
const props = defineProps(["text"])

// 文字滚动的信息
const textRollInfo = ref({
  msg: "暂无操作...",
  status: "success"
})

// 滚动文本颜色计算属性
const rollTextColorComp = computed(() => {
  let color = ""
  switch (textRollInfo.value.status) {
    case "success":
      color = "#32e278"
      break

    case "error":
      color = "#f25656"
      break

    case "info":
      color = "#cccccc"
      break

    default:
      break
  }
  // console.log(textRollInfo.value.status)
  // console.log(color)
  return color
})

const wsUrl = "ws://192.168.0.161:12006"

// 初始化WebSocket连接

onMounted(() => {
  // setupWebSocket()
  createWebSocket()
})

/* WebSockets */

let maxRetries = 60 // 最大重连次数
let retryCount = 0 // 当前重连次数

const createWebSocket = async () => {
  let socket = new WebSocket(wsUrl)
  // 连接
  socket.onopen = function (event) {
    if (retryCount > 0) {
      clearInterval(webSocketReconnectionSetInterval)
    }
    console.log("WebSocket 已连接:", event)
    socket.send("前端已连接:" + event.target.url)
  }

  // 错误
  socket.onerror = function (error) {
    console.error("WebSocket error observed:", error)
    // retryConnection()
    // heartFunc()
  }

  // 接受消息
  socket.onmessage = (message) => {
    console.log("前端接收消息:", message.data)
    console.log(JSON.parse(message.data))
    let data = JSON.parse(message.data)
    switch (data.code) {
      case "001":
        if (Number(data.data) == 0) {
          globalVariableStore.operateStatus = false
        } else if (Number(data.data) == 1) {
          globalVariableStore.operateStatus = true
        }
        break

      case "002":
        textRollInfo.value.msg = data.data
        break

      default:
        break
    }
  }

  // 断开连接
  socket.onclose = (error) => {
    console.error("断开连接")
    // webSocketReconnection()
    heartFunc()
  }
}

// 心跳检测函数
const heartFunc = () => {
  retryCount++
  if (retryCount <= maxRetries) {
    setTimeout(() => {
      console.log(`尝试重连 WebSocket 第 ${retryCount} 次`)
      createWebSocket()
    }, 3000)
  } else {
    console.log("放弃重连 WebSocket")
  }
}
/* ---------------------------------------------------------------------------------- */

/* WebSocket */

// const setupWebSocket = async () => {
//   let socket = new WebSocket(wsUrl)
//   try {
//     // 连接
//     socket.onopen = function (event) {
//       if (retryCount > 0) {
//         clearInterval(webSocketReconnectionSetInterval)
//       }
//       console.log("WebSocket 已连接:", event)
//       socket.send("前端已连接:" + event.target.url)
//     }

//     // 错误
//     socket.onerror = function (error) {
//       console.error("WebSocket error observed:", error)
//       retryConnection()
//     }

//     // 接受消息
//     socket.onmessage = (message) => {
//       console.log("前端接收消息:", message.data)
//       textRollInfo.value.msg = message.data
//     }

//     // 断开连接
//     socket.onclose = (error) => {
//       console.error("断开连接")
//       webSocketReconnection()
//     }
//     // 其他事件处理（如onmessage, onclose）
//   } catch (error) {
//     console.error("WebSocket setup error:", error)
//     // retryConnection()
//   }
// }

// // const retryConnection = async () => {
// //   if (retryCount < maxRetries) {
// //     retryCount++
// //     console.log(`Retrying connection. Attempt ${retryCount} of ${maxRetries}`)
// //     setTimeout(setupWebSocket(wsUrl), 3000) // 3秒后尝试重新连接
// //   } else {
// //     console.error("Maximum retries reached. Giving up.")
// //     // 停止重连，可以在这里执行清理工作或者其他逻辑
// //   }
// // }

// // 重连函数
// const webSocketReconnection = () => {
//   // console.log();
//   // 开始重新连接
//   var webSocketReconnectionSetInterval = setInterval(() => {
//     let socket = new WebSocket(wsUrl)
//     // 增加次数
//     retryCount++
//     if (retryCount <= maxRetries) {
//       console.log(`WebSocket重新连接，第${retryCount}次`)
//       try {
//         // 连接
//         socket.onopen = function (event) {
//           if (retryCount > 0) {
//             clearInterval(webSocketReconnectionSetInterval)
//           }
//           console.log("WebSocket 已连接:", event)
//           socket.send("前端已连接:" + event.target.url)
//         }
//         // 错误
//         socket.onerror = function (error) {
//           console.error("WebSocket error observed:", error)
//           retryConnection()
//         }

//         // 接受消息
//         socket.onmessage = (message) => {
//           console.log("前端接收消息:", message.data)
//           textRollInfo.value.msg = message.data
//         }

//         // 断开连接
//         socket.onclose = (error) => {
//           console.error("断开连接")
//           webSocketReconnection()
//         }

//         // 其他事件处理（如onmessage, onclose）
//       } catch (error) {
//         console.error("WebSocket setup error:", error)
//         // retryConnection()
//       }
//     } else {
//       console.log(`WebSocket重新连接次数超过 60 次,放弃尝试连接!`)
//     }
//   }, 35000)
// }

// WebSocket 心跳检测
// let ws_heartCheck = {
//   // 心跳间隔
//   timeout: 5000,
//   // 执行心跳的定时器
//   timeoutObj: null,
//   // 服务器超时定时器
//   serverTimeoutObj: null,
//   // 重置方法
//   reset: () => {
//     clearTimeout(this.timeoutObj)
//     clearTimeout(this.serverTimeoutObj)
//     return this
//   },
//   // 启动方法
//   start: () => {
//     var self = this
//     this.timeoutObj = setTimeout(() => {
//       // 这里发送一个心跳信息，houi
//     }, 1000)
//   }
// }
</script>

<style lang="scss" scoped>
$rollTextColorComp: v-bind(rollTextColorComp);

.scroll_div {
  position: fixed;
  // right: 40px;
  top: 32px;
  left: 88.8%;
  // background: url(./zouzi_bg.png);
  height: 44px;
  background-size: 100% 100%;
  padding: 0px 3px 0px 3px;
  // box-shadow:
  //   1px 1px 2px #696969,
  //   -1px -1px 2px #696969;
  transform: translateX(-50%);

  marquee {
    padding: 0px 10px 26px 10px;
    box-sizing: border-box;
    width: 254px;
    // border: 1px solid red;
    position: relative;
    right: 18px;
    color: $rollTextColorComp;
    font-size: 18px;
    letter-spacing: 2px;
    font-family: SYHT-Bold;
    position: relative;
    top: -8px;

    .text {
      font-size: 18px;
      letter-spacing: 2px;
      font-family: SYHT-Bold;

      // color: #36c56f;
      position: relative;
      top: -8px;
    }
  }
}
</style>
