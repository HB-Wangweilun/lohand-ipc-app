<template>
  <div class="layout_header_wrap">
    <img
      class="logo_img"
      @click="toHome"
      src="../../../assets/image/logo.png"
    />
    <div
      class="action_box"
      :class="{ is_opacity: globalVariableStore.isHome }"
      style="opacity:"
    >
      <div class="content_box" @click="toHome">
        <!-- <img
          class="return_home_icon"
          src="../../../assets/icon/icon-home.png"
        /> -->

        <!-- <span class="text">返回首页</span> -->
      </div>
    </div>
    <HeaderTextRoll></HeaderTextRoll>
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
    <LoginC
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
          <el-form-item
            label="用户名"
            style="margin-top: 10px; margin-bottom: 14px"
          >
            <el-select
              v-model="userLoginInfo.userId"
              placeholder="请选择用户"
              size="large"
              style="width: 260px"
            >
              <el-option
                v-for="(ul, indexU) in usersList"
                :key="indexU"
                :label="ul.userName"
                :value="ul.userId"
              />
            </el-select>
            <span class="verify_msg">{{ userInfoVerifyErrInfo.userId }}</span>
            <!-- <el-input v-model="userLoginInfo.userName" style="width: 260px" /> -->
          </el-form-item>

          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="userLoginInfo.userPass"
              style="width: 260px"
            />
            <span class="verify_msg">{{ userInfoVerifyErrInfo.userPass }}</span>
          </el-form-item>
        </el-form>
      </div>
    </LoginC>

    <OutDialog></OutDialog>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "Header"
})
</script>
<script setup>
import dayjs from "dayjs"
import { useGlobalVariableStore, useUserStore } from "../../../store"
import { useRouter } from "vue-router"
import LoginC from "../../../components/loginC/index.vue"
import HeaderTextRoll from "./headerTextRoll.vue"
import OutDialog from "./outDialog.vue"
import { openScreenKeyboardFunc, playClickSound } from "../../../utils/other.js"
import { selectUsersApi, loginApi } from "../../../api/user.js"
import { ipc } from "../../../utils/ipcRenderer"

const globalVariableStore = useGlobalVariableStore()
const userStore = useUserStore()
const router = useRouter()

// 用户名和密码校验错误信息
const userInfoVerifyErrInfo = ref({
  userId: "",
  userPass: ""
})

// 用户登录信息
const userLoginInfo = ref({
  userId: "",
  userPass: ""
})

// 表单校验规则
// const rules = ref({
//   userId: [{ required: true, message: "请选择用户", trigger: "blur" }],
//   userPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
// })

// 用户信息列表
const usersList = ref([])

// 刷新页面的点击事件
const reloadPage = () => {
  location.reload()
  // ipc.send("restart")
}

// 是否显示用户登录弹窗的标识
const isShowUserLoginDialog = ref(false)

// 是否显示注销账户和退出系统的弹窗
const isShowUserOutDialog = ref(false)

// 关闭用户登录弹窗
const closeUserLoginDialog = () => {
  playClickSound()
  isShowUserLoginDialog.value = false
}

// 打开用户登录弹窗
const showUserLoginDialog = () => {
  playClickSound()
  isShowUserLoginDialog.value = true
}

// 关闭注销账户和退出系统的弹窗
const closeUserOutDialog = () => {
  isShowUserOutDialog.value = false
}

// 打开注销账户和退出系统的弹窗
const showUserOutDialog = () => {
  isShowUserOutDialog.value = true
}

// 确定点击事件
const userLoginDialogOkClick = async () => {
  playClickSound()

  // 校验表单
  if (userLoginInfo.value.userId != "" && userLoginInfo.value.userPass != "") {
    loginFunc()
  } else {
    if (userLoginInfo.value.userId == "") {
      userInfoVerifyErrInfo.value.userId = "请选择用户"
    } else {
      userInfoVerifyErrInfo.value.userId = ""
    }

    if (userLoginInfo.value.userPass == "") {
      userInfoVerifyErrInfo.value.userPass = "请输入密码"
    } else {
      userInfoVerifyErrInfo.value.userPass = ""
    }
  }
}

// 登录
const loginFunc = async () => {
  userStore.userInfo = userLoginInfo.value
  await loginApi(userLoginInfo.value)
    .then((res) => {
      if (res.result == "success") {
        userStore.isUserLogin = true
        closeUserLoginDialog()
      } else if (res.result == "error") {
        userStore.isUserLogin = false
        userInfoVerifyErrInfo.value.userPass = res.msg
      }
    })
    .catch(() => {
      userStore.isUserLogin = false
    })
}

// 用户头像点击事件
const userClick = () => {
  playClickSound()
  if (userStore.isUserLogin) {
    console.log("用户已登录")
  } else {
    isShowUserLoginDialog.value = true
    console.log("用户未登录")
  }
}

const toHome = () => {
  playClickSound()
  router.push({
    path: "/home"
  })
}
const time = ref(dayjs().format("YYYY-MM-DD HH:mm:ss"))

const updateTimeFunc = () => {
  setInterval(() => {
    time.value = dayjs().format("YYYY-MM-DD HH:mm:ss")
  }, 1000)
}

// 查询用户信息列表的函数
const selectUsersFunc = async () => {
  await selectUsersApi().then((res) => {
    usersList.value = res.data
    // console.log(res.data, "用户列表")
  })
}

onMounted(() => {
  selectUsersFunc()
  updateTimeFunc()
  userStore.userInfo = {
    userId: "",
    userPass: ""
  }

  console.log(globalVariableStore.envMode)
})
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
    cursor: pointer;
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
    top: 20px;
    left: 176px;
  }

  .right_box {
    text-align: right;
    width: 670px;
    // border: 1px solid red;
    letter-spacing: 3px;
    padding: 0px 25px 0px 290px;
    position: relative;
    top: 0px;
    display: flex;

    .time_icon {
      width: 32px;
      height: 32px;
      position: relative;
      top: 11px;
      left: -20px;
    }

    .text {
      font-size: 22px;
      position: relative;
      top: -4px;
      left: -14px;
    }

    .user_box {
      margin-left: 20px;
      .user_icon {
        width: 38px;
        height: 38px;
        position: relative;
        top: 19px;
        cursor: pointer;
      }
    }
  }
}

.login_dialog_box {
  height: 200px;
  padding: 40px 20px 0px 50px;
  color: white;
}

.verify_msg {
  color: rgb(247, 67, 67);
  // border: 1px solid red;
  display: inline-block;
  width: 200px;
  height: 30px;
  font-size: 16px;
  font-family: SYHT-Regular;
  letter-spacing: 2px;
  margin: 0;
}
</style>
