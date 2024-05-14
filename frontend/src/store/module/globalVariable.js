import { defineStore } from "pinia"
import { ref, computed } from "vue"

const storeSetup = () => {
  /* 定义数据--------------------------------------------------------------------- */
  // 标题
  const navTitle = ref("")

  // 当前是否是首页的标识
  const isHome = ref(true)

  // 当前的环境
  const envMode = ref(import.meta.env.MODE)

  // 文字滚动的信息
  const textRollInfo = ref({
    msg: "设备采水成功!",
    status: "error"
  })

  // 按钮操作状态
  const operateStatus = ref(false)

  /* 定义函数--------------------------------------------------------------------- */

  // 返回参数
  return {
    navTitle,
    isHome,
    envMode,
    textRollInfo,
    operateStatus
  }
}

// 导出Store
export const useGlobalVariableStore = defineStore(
  "globalVariable",
  storeSetup,
  {
    persist: true
  }
)
