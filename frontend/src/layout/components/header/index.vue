<template>
  <div class="layout_header_wrap">
    <img
      class="logo_img"
      v-if="globalVariableStore.isHome"
      src="../../../assets/image/logo.png"
    />
    <div
      class="action_box"
      :class="{ is_opacity: globalVariableStore.isHome }"
      style="opacity:"
    >
      <div class="content_box" @click="toHome">
        <img
          class="return_home_icon"
          src="../../../assets/icon/icon-home.png"
        />

        <!-- <span class="text">返回首页</span> -->
      </div>
    </div>
    <img
      v-if="
        globalVariableStore.envMode == 'development' &&
        !globalVariableStore.isHome
      "
      class="reload_icon"
      @click="reloadPage"
      src="../../../assets/icon/reload.png"
    />
    <!-- <div class="title_box">
      <span class="text">{{ globalVariableStore.navTitle }}</span>
    </div> -->
    <div class="right_box">
      <img class="time_icon" src="../../../assets/icon/icon-time1.png" />
      <span class="text">{{ time }}</span>
      <div class="user_box">
        <img
          class="user_icon"
          v-if="userStore.isUserLogin"
          src="../../../assets/icon/icon-user.png"
          @click="userClick"
        />
        <img
          class="user_icon"
          v-else
          src="../../../assets/icon/icon-user-h.png"
          @click="userClick"
        />
      </div>
    </div>

    <!-- 用户登录弹窗 -->
    <DialogC
      :show="isShowUserLoginDialog"
      :title="`用户登录`"
      :is-footer="true"
      @showDialog="showUserLoginDialog"
      @closeDialog="closeUserLoginDialog"
      @okClick="userLoginDialogOkClick"
    >
      <div class="login_dialog_box">
        <el-form
          label-width="auto"
          :model="userLoginInfo"
          style="max-width: 600px"
        >
          <el-form-item label="用户名">
            <el-input
              v-model="userLoginInfo.userName"
              style="width: 260px"
              @click="openScreenKeyboardFunc"
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="userLoginInfo.userPwd"
              style="width: 260px"
              @click="openScreenKeyboardFunc"
            />
          </el-form-item>
        </el-form>
      </div>
    </DialogC>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  name: "Header",
});
</script>
<script setup>
import dayjs from "dayjs";
import { useGlobalVariableStore, useUserStore } from "../../../store";
import { useRouter } from "vue-router";
import DialogC from "../../../components/dialogC/index.vue";
import {
  openScreenKeyboardFunc,
  playClickSound,
} from "../../../utils/other.js";

const globalVariableStore = useGlobalVariableStore();
const userStore = useUserStore();
const router = useRouter();

// 用户登录信息
const userLoginInfo = ref({
  userName: "",
  userPwd: "",
});

// 刷新页面的点击事件
const reloadPage = () => {
  location.reload();
};

// 是否显示用户登录弹窗的标识
const isShowUserLoginDialog = ref(false);

// 关闭用户登录弹窗
const closeUserLoginDialog = () => {
  playClickSound();
  isShowUserLoginDialog.value = false;
};

// 打开用户登录弹窗
const showUserLoginDialog = () => {
  playClickSound();
  isShowUserLoginDialog.value = true;
};

// 确定点击事件
const userLoginDialogOkClick = () => {
  playClickSound();
  userStore.userInfo = userLoginInfo.value;
};

// 用户头像点击事件
const userClick = () => {
  playClickSound();
  if (userStore.isUserLogin) {
    console.log("用户已登录");
  } else {
    isShowUserLoginDialog.value = true;
    console.log("用户未登录");
  }
};

const toHome = () => {
  playClickSound();
  router.push({
    path: "/home",
  });
};
const time = ref(dayjs().format("YYYY-MM-DD HH:mm:ss"));

const updateTimeFunc = () => {
  setInterval(() => {
    time.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }, 1000);
};

onMounted(() => {
  updateTimeFunc();
  userStore.userInfo = {
    userName: "",
    userPwd: "",
  };

  console.log(globalVariableStore.envMode);
});
</script>

<style lang="scss" scoped>
.layout_header_wrap {
  // border: 1px solid red;
  height: 60px;
  line-height: 60px;
  height: 5.56%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .logo_img {
    width: 140px;
    height: 46px;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .is_opacity {
    opacity: 0;
  }

  .action_box {
    width: 640px;
    // border: 1px solid red;

    .content_box {
      display: flex;
      flex-direction: row;
      position: relative;
      left: 25px;
      top: 10px;
      width: 40px;
      cursor: pointer;
      // border: 1px solid red;

      .return_home_icon {
        width: 40px;
        height: 40px;
      }

      .text {
        font-size: 26px;
        margin-left: 10px;
        letter-spacing: 2px;
      }
    }
  }

  .reload_icon {
    width: 36px;
    height: 36px;
    position: absolute;
    top: 12px;
    left: 100px;
  }

  .right_box {
    text-align: right;
    width: 640px;
    // border: 1px solid red;
    letter-spacing: 3px;
    padding: 0px 25px 0px 255px;
    position: relative;
    top: 0px;
    display: flex;

    .time_icon {
      width: 36px;
      height: 36px;
      position: relative;
      top: 13px;
      left: -20px;
    }

    .text {
      font-size: 22px;
      position: relative;
      // top: 13px;
      left: -14px;
    }

    .user_box {
      margin-left: 20px;
      .user_icon {
        width: 30px;
        height: 30px;
        position: relative;
        top: 10px;
        cursor: pointer;
      }
    }
  }
}

.login_dialog_box {
  padding: 40px 20px 0px 50px;
  color: white;
}
</style>
