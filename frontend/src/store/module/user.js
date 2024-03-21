import { defineStore } from "pinia";
import { ref, computed } from "vue";

const storeSetup = () => {
  /* 定义数据--------------------------------------------------------------------- */
  const userInfo = ref({
    userName: "",
    userPwd: "",
  });

  const isUserLogin = computed(() => {
    let flag;
    if (userInfo.value.userName == "" && userInfo.value.userPwd == "") {
      flag = false;
    } else {
      flag = true;
    }
    return flag;
  });

  /* 定义函数--------------------------------------------------------------------- */

  // 返回参数
  return {
    userInfo,
    isUserLogin,
  };
};

// 导出Store
export const useUserStore = defineStore("user", storeSetup, { persist: true });
