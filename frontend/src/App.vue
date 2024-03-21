<template>
  <div>
    <router-view />
    <ClickAudio></ClickAudio>
  </div>
</template>

<script>
import "./App.scss";
import { defineComponent, onUnmounted } from "vue";
export default defineComponent({
  name: "App",
});
</script>
<script setup>
import ClickAudio from "./components/audio/index.vue";
document.getElementById("loader").remove();

onUnmounted(() => {});
</script>

<style lang="less" scoped></style>
