import { defineStore } from "pinia"
import { ref, computed } from "vue"

const storeSetup = () => {
  /* 定义数据--------------------------------------------------------------------- */
  // 当前从首页点击的参数名称
  const currentHomeClickParamName = ref("")

  /* 定义函数-------------------------------- ------------------------------------- */

  // 返回参数
  return {
    currentHomeClickParamName
  }
}

// 导出Store
export const useParamHistoricalDataStore = defineStore(
  "paramHistoricalData",
  storeSetup,
  {
    persist: true
  }
)
