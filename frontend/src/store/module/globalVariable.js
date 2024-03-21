import { defineStore } from "pinia";
import { ref, computed } from "vue";

const storeSetup = () => {
  /* 定义数据--------------------------------------------------------------------- */
  // 标题
  const navTitle = ref("");

  // 当前是否是首页的标识
  const isHome = ref(true);

  /* 定义函数--------------------------------------------------------------------- */

  // 返回参数
  return {
    navTitle,
    isHome,
  };
};

// 导出Store
export const useGlobalVariableStore = defineStore(
  "globalVariable",
  storeSetup,
  {
    persist: true,
  }
);