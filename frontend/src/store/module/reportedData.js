import { defineStore } from "pinia"
import { ref, computed } from "vue"

const storeSetup = () => {
  /* 定义数据--------------------------------------------------------------------- */
  // HTTP 数据
  const httpData = ref({
    url: "d.lohand.com",
    jsonData: {
      data: []
    }
  })

  // MQTT 数据
  const mqttData = ref({
    serverAddress: "127.0.0.1",
    portNumber: "9904",
    account: "admin",
    password: "123456",
    subscribeTopics: "",
    jsonData: {
      data: []
    }
  })

  // TCP 数据
  const tcpData = ref({
    serverAddress: "d.lohand.com",
    portNumber: "9904",
    isUsingRegistrationPackage: false,
    isUsingHeartbeatPackage: false,
    registrationPackage: {},
    heartbeatPackage: {}
  })

  /* 定义函数-------------------------------- ------------------------------------- */

  // 返回参数
  return {
    httpData,
    mqttData,
    tcpData
  }
}

// 导出Store
export const useReportedDataStore = defineStore("reportedData", storeSetup, {
  persist: true
})
