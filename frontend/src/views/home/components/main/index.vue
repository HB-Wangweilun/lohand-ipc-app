<template>
  <div class="home_main_wrap">
    <GlassCard
      v-for="(hml, index) in homeModuleList"
      class="glass_card_item"
      width="330"
      height="280"
      :background-color="hml.meta.backgroundColor"
      @click="moduleItemClick(hml)"
    >
      <div class="home_module_item_box">
        <IconC :name="hml.meta.icon"></IconC>
        <!-- <img
          class="module_item_icon"
          v-if="hml.meta.icon == 'meterManagement'"
          src="./image/home-module-icon-meterManagement.png"
        />
        <img
          class="module_item_icon"
          v-if="hml.meta.icon == 'paramSetting'"
          src="./image/home-module-icon-paramSetting.png"
        />
        <img
          class="module_item_icon"
          v-if="hml.meta.icon == 'systemSetting'"
          src="./image/home-module-icon-systemSetting.png"
        />
        <img
          class="module_item_icon"
          v-if="hml.meta.icon == 'selectData'"
          src="./image/home-module-icon-selectData.png"
        />
        <img
          class="module_item_icon"
          v-if="hml.meta.icon == 'logManagement'"
          src="./image/home-module-icon-logManagement.png"
        />
        <img
          class="module_item_icon"
          v-if="hml.meta.icon == 'operationManagement'"
          src="./image/home-module-icon-operationManagement.png"
        />
        <img
          class="module_item_icon"
          v-if="hml.meta.icon == 'logOut'"
          src="./image/home-module-icon-logOut.png"
        /> -->
        <!-- <img
          class="module_item_icon"
          v-if="hml.meta.icon == 'operationManagement'"
          src="./image/home-module-icon-operationManagement.png"
        /> -->
        <!-- <img
          class="module_item_icon"
          v-if="hml.meta.icon == 'moreFunction'"
          src="./image/home-module-icon-moreFunction.png"
        /> -->
        <!-- <img
          class="module_item_icon"
          src="../../../../assets/icon/home-module-icon-meterManagement.png"
        /> -->
        <span class="module_item_text">{{ hml.meta.title }}</span>
      </div>
    </GlassCard>
    <!-- <GlassCard class="glass_card_item" width="460" height="360"></GlassCard>
    <GlassCard class="glass_card_item" width="460" height="360"></GlassCard>
    <GlassCard class="glass_card_item" width="460" height="360"></GlassCard>
    <GlassCard class="glass_card_item" width="460" height="360"></GlassCard>
    <GlassCard class="glass_card_item" width="460" height="360"></GlassCard> -->
    <!-- <HintPopUp
      v-if="isShowNoAccessDialog"
      :show="isShowNoAccessDialog"
      :title="`提示`"
      font-size="40"
      :is-show-icon="false"
      :message-content="`该用户无权限访问`"
    ></HintPopUp> -->
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "Main"
})
</script>
<script setup>
import GlassCard from "../../../../components/global/GlassCard.vue"
import HintPopUp from "../../../../components/global/hintPopUp.vue"
import { ipc } from "../../../../utils/ipcRenderer.js"
import { playClickSound } from "../../../../utils/other.js"
import { useRouter, useRoute } from "vue-router"
import IconC from "./iconC.vue"
import { ElMessage } from "element-plus"
import { useUserStore } from "../../../../store"

const userStore = useUserStore()

const router = useRouter()
const route = useRoute()

// 无权限提示弹窗显示标识
const isShowNoAccessDialog = ref(false)

// 图标拼接函数
const iconPathJoinF = (icon) => {
  return `home-module-icon-${icon}.png`
}

// 首页模块列表
const homeModuleList = ref([])

// 模块点击事件
const moduleItemClick = (item) => {
  playClickSound()

  // 判断是否是已登录状态
  if (!userStore.isUserLogin) {
    // 未登录则进行判断是否是白名单路由
    if (item.meta.isRouteWhite) {
      // 白名单路由直接跳转
      switch (item.meta.title) {
        case "退出系统":
          ipc.send("close")
          ipc.send("window-close")
          break
        case "更多功能":
          ElMessage.info("该页面待开发!")
          break

        default:
          router.push({ path: item.path })
          break
      }
    } else {
      // 不是白名单路由则进行提示
      userStore.isShowNoAccessDialog = true
      setTimeout(() => {
        userStore.isShowNoAccessDialog = false
      }, 2000)
    }
  } else {
    switch (item.meta.title) {
      case "退出系统":
        ipc.send("close")
        ipc.send("window-close")
        break
      case "更多功能":
        ElMessage.info("该页面待开发!")
        break

      default:
        router.push({ path: item.path })
        break
    }
  }
  // if (item.meta.title == "退出系统") {
  // }
}

// init
onMounted(() => {
  let moduleRoutes = router
    .getRoutes()
    .filter((routeItem) => routeItem.meta.isModulePage)
  homeModuleList.value = moduleRoutes
})
</script>

<style lang="scss" scoped>
.home_main_wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 210px 100px 210px;
  animation-duration: 0.3s;

  .glass_card_item {
    transition: 0.4s;
    margin-top: 50px;
    cursor: pointer;

    .home_module_item_box {
      text-align: center;
      display: flex;
      flex-direction: column;
      padding: 50px 0px 0px 0px;

      .module_item_icon {
        width: 120px;
        height: 120px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        // border: 1px solid red;
      }

      .module_item_text {
        font-size: 24px;
        font-family: "SYHT-Bold";
        letter-spacing: 3px;
        position: relative;
        left: 5px;
        margin-top: 10px;
        // font-family: "SYHT-Regular";
      }
    }
  }

  .glass_card_item:active {
    transform: scale(0.8);
  }
}
</style>
