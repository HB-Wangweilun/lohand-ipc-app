import http from "../utils/http.js"

const Api = {
  // 查询状态
  selectStatus: "/device/selectStatus",

  // 启动
  start: "/device/start",

  // 停止
  stop: "/device/stop",

  // 强制停止
  forceStop: "/device/forceStop"
}

// 查询状态的Api
export const selectStatusApi = () => {
  return http.get(Api.selectStatus)
}

// 启动的Api
export const startApi = () => {
  return http.get(Api.start)
}

// 停止的Api
export const stopApi = () => {
  return http.post(Api.stop)
}

// 强制停止的Api
export const forceStopApi = () => {
  return http.post(Api.forceStop)
}
