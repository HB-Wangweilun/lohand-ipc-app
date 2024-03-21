<template>
  <div class="home_wrap">
    <!-- <Header></Header> -->
    <Main class="animate__animated animate__fadeInDown"></Main>
    <Footer class="animate__animated animate__fadeInUp"></Footer>
    <!--  v-contextmenu:contextmenu -->
    <!-- <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>复制</v-contextmenu-item>
      <v-contextmenu-item>粘贴</v-contextmenu-item>
      <v-contextmenu-item>撤销</v-contextmenu-item>
    </v-contextmenu> -->
    <!-- <h1>Home</h1>

    <el-button type="primary" @click="toLogin">去登录</el-button>
    <el-button type="primary" @click="toExample">去模版</el-button>

    <glass-card width="200" height="200">
      <div style="font-size: 50px">1111</div>
    </glass-card> -->
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "Home",
});
</script>
<script setup>
import Main from "./components/main/index.vue";
import Footer from "./components/footer/index.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const toLogin = () => {
  router.push({
    path: "/login",
  });
};

const toExample = () => {
  router.push({
    path: "/example",
  });
};

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
