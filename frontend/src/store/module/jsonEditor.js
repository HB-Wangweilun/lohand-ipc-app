import { defineStore } from "pinia"
import { ref, computed } from "vue"

const storeSetup = () => {
  /* 定义数据--------------------------------------------------------------------- */
  // 默认json数据
  const defaultJsonViewData = ref({
    name: "张三",
    age: 28,
    address: "古潭街20号",
    hobby: ["篮球", "足球"]
  })

  /* 定义函数--------------------------------------------------------------------- */

  // 返回参数
  return {
    defaultJsonViewData
  }
}

// 导出Store
export const useJsonEditorStore = defineStore("jsonEditor", storeSetup, {
  persist: true
})
