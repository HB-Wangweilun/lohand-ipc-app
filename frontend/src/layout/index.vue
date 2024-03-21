<template>
  <VScaleScreen :width="1920" height="1080">
    <div class="layout_warp">
      <Header></Header>
      <Bubble></Bubble>
      <div class="layout_main_wrap">
        <router-view></router-view>
      </div>
    </div>
  </VScaleScreen>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Layout",
});
</script>
<script setup>
import Header from "./components/header/index.vue";
import Bubble from "./components/bubble/index.vue";
import VScaleScreen from "v-scale-screen";
</script>

<style lang="scss" scoped>
.layout_warp {
  width: 1920px;
  height: 1080px;
  font-family: SYHT-Regular;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .layout_main_wrap {
    // border: 1px solid red;
    height: 94.44%;
    box-sizing: border-box;
  }
}

// .inner-header {
//   height: 65vh;
//   width: 100%;
//   margin: 0;
//   padding: 0;
// }
</style>
