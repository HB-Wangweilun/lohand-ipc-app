<template>
  <div class="real_time_data_card_wrap">
    <WaterPolo
      :c-id="props.cId"
      :paramName="props.paramName"
      :unit="props.unit"
      :value="props.value"
    ></WaterPolo>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "RealTimeDataCard"
})
</script>
<script setup>
import WaterPolo from "./waterPolo.vue"

// props
const props = defineProps([
  "cId",
  "paramName",
  "value",
  "unit",
  "scope",
  "status"
])

onMounted(() => {
  console.log(props)
})
</script>

<style lang="scss" scoped>
.real_time_data_card_wrap {
  width: 300px;
  height: 300px;
  border-radius: 15px;
  // background: rgba(255, 255, 255, 0.4);

  // border: 2px solid rgba(255, 255, 255, 0.2);

  backdrop-filter: blur(24px);
}
</style>
