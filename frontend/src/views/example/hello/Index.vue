<template>
  <div class="hello_wrap">
    <el-button type="primary" @click="close">关闭窗口</el-button>
    <el-button type="primary" @click="maximize">最大化</el-button>
    <el-button type="primary" @click="minimize">最小化</el-button>
    <el-button type="primary" @click="restoreDown">向下还原</el-button>
    <el-button
      type="primary"
      v-if="currentEnv == 'development'"
      @click="exitFullScreen"
      >退出全屏</el-button
    >
    <el-button
      type="primary"
      v-if="currentEnv == 'development'"
      @click="goFullScreen"
      >进入全屏</el-button
    >
    <el-button type="primary" @click="openScreenKeyboard">打开新窗口</el-button>
    <el-button type="primary" @click="sendMsgMain">给主程序发消息</el-button>
    <!-- 拖拽 -webkit-app-region: drag -->

    <div>
      <el-input
        v-model="valueI"
        style="width: 240px"
        placeholder="Please input"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  name: "Hello",
});
</script>
<script setup>
// 引入
import { ipc } from "../../../utils/ipcRenderer.js";
import { useUserStore } from "../../../store/index.js";
import { currentEnv } from "../../../libs/baseUrl.js";
const userStore = useUserStore();

const valueI = ref("123");

const close = () => {
  ipc.send("close");
  ipc.send("window-close");
};

const maximize = () => {
  ipc.send("max");
};

const minimize = () => {
  ipc.send("min");
};

const restoreDown = () => {
  ipc.send("restoreDown");
};

const exitFullScreen = () => {
  ipc.send("exitFullScreen");
};

const goFullScreen = () => {
  ipc.send("goFullScreen");
};

const openScreenKeyboard = () => {
  ipc.send("openScreenKeyboard");
};

const sendMsgMain = () => {
  ipc.send("sendMsgMain", "1111");
};

// init
onMounted(() => {});
</script>

<style scoped>
.hello_wrap {
  /* 可拖拽 */
  /* -webkit-app-region: drag; */
  font-family: "思源黑体-Regular";
}
</style>
