<template>
  <div>
    <h1>Login</h1>
    <el-button type="primary" @click="toHome">去首页</el-button>
    <el-button type="primary" @click="toExample">去模版</el-button>
    <el-button type="primary" @click="toLoading">去加载</el-button>
    <el-button type="primary" @mousedown="playClickAudio">播放音效</el-button>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "Login",
});
</script>
<script setup>
import { playClickSound } from "../../utils/other.js";
import { loginApi } from "../../api/login.js";
import { useRouter } from "vue-router";
// import { app } from "electron";

const router = useRouter();
const toHome = () => {
  router.push({
    path: "/home",
  });
};

const toExample = () => {
  router.push({
    path: "/example",
  });
};

const loginFunc = async () => {
  await loginApi().then((res) => {
    console.log(res);
  });
};

const toLoading = () => {
  router.push({
    path: "/loading",
  });
};

const playClickAudio = () => {
  playClickSound();
};

onMounted(() => {
  // loginFunc();
  console.log(import.meta.env.MODE);
});
</script>

<style lang="scss" scoped></style>
