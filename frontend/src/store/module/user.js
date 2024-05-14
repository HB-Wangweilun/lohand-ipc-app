import { defineStore } from "pinia"
import { ref, computed } from "vue"

const storeSetup = () => {
  /* 定义数据--------------------------------------------------------------------- */
  const userInfo = ref({
    userId: "",
    userPass: ""
  })

  // 登录状态标识
  const isUserLogin = ref(false)

  // 是否显示无权限弹窗的标识
  const isShowNoAccessDialog = ref(false)

  /* 定义函数--------------------------------------------------------------------- */

  // 返回参数
  return {
    userInfo,
    isUserLogin,
    isShowNoAccessDialog
  }
}

// 导出Store
export const useUserStore = defineStore("user", storeSetup, { persist: false })
