<template>
  <div class="icon_c_wrap">
    <img v-if="props.tag == 'init'" src="./image/init.png" />
    <img v-if="props.tag == 'init_a'" src="./image/init_a.png" />
    <img v-if="props.tag == 'runningMode'" src="./image/runningMode.png" />
    <img v-if="props.tag == 'runningMode_a'" src="./image/runningMode_a.png" />
    <img v-if="props.tag == 'runningParam'" src="./image/runningParam.png" />
    <img
      v-if="props.tag == 'runningParam_a'"
      src="./image/runningParam_a.png"
    />
    <img v-if="props.tag == 'runningFlow'" src="./image/runningFlow.png" />
    <img v-if="props.tag == 'runningFlow_a'" src="./image/runningFlow_a.png" />
    <img v-if="props.tag == 'singleControl'" src="./image/singleControl.png" />
    <img
      v-if="props.tag == 'singleControl_a'"
      src="./image/singleControl_a.png"
    />
    <img v-if="props.tag == 'peripheral'" src="./image/peripheral.png" />
    <img v-if="props.tag == 'peripheral_a'" src="./image/peripheral_a.png" />
    <img v-if="props.tag == 'communication'" src="./image/communication.png" />
    <img
      v-if="props.tag == 'communication_a'"
      src="./image/communication_a.png"
    />
    <img v-if="props.tag == 'alarm'" src="./image/alarm.png" />
    <img v-if="props.tag == 'alarm_a'" src="./image/alarm_a.png" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "IconC",
});
</script>
<script setup>
const props = defineProps(["tag"]);
</script>

<style lang="scss" scoped>
.icon_c_wrap {
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
