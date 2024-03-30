<template>
  <div class="icon_c_wrap">
    <img
      class="iconc_img"
      v-if="props.name == 'meterManagement'"
      src="./image/home-module-icon-meterManagement.png"
    />
    <img
      class="iconc_img"
      v-if="props.name == 'logManagement'"
      src="./image/home-module-icon-logManagement.png"
    />
    <img
    
      class="iconc_img"
      v-if="props.name == 'logOut'"
      src="./image/home-module-icon-logOut.png"
    />
    <img
      class="iconc_img"
      v-if="props.name == 'moreFunction'"
      src="./image/home-module-icon-moreFunction.png"
    />
    <img
      class="iconc_img"
      v-if="props.name == 'operationManagement'"
      src="./image/home-module-icon-operationManagement.png"
    />
    <img
      class="iconc_img"
      v-if="props.name == 'paramSetting'"
      src="./image/home-module-icon-paramSetting.png"
    />
    <img
      class="iconc_img"
      v-if="props.name == 'historicalData'"
      src="./image/home-module-icon-historicalData.png"
    />
    <img
      class="iconc_img"
      v-if="props.name == 'systemSetting'"
      src="./image/home-module-icon-systemSetting.png"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "IconC",
});
</script>


<script setup>
const props = defineProps(["name"]);
</script>

<style lang="scss" scoped>
.iconc_img {
  width: 120px;
  height: 120px;
  // position: relative;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
