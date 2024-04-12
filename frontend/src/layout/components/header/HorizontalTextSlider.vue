<template>
  <div class="scroll_div">
    <marquee direction="left" scrollamount="4" behavior="scroll">
      <span class="text">{{ globalVariableStore.textRollInfo.msg }}</span>
      <!-- <span class="text">{{ globalVariableStore.textRollInfo.msg }}1</span> -->
    </marquee>
  </div>
</template>

<script>
import { defineComponent, watch, nextTick, ref, onMounted, computed } from "vue"
export default defineComponent({
  name: "HorizontalTextSlider"
})
</script>
<script setup>
import { useGlobalVariableStore } from "../../../store"

// store
const globalVariableStore = useGlobalVariableStore()

// props
const props = defineProps(["text"])

// 滚动文本颜色计算属性
const rollTextColorComp = computed(() => {
  let color = ""
  switch (globalVariableStore.textRollInfo.status) {
    case "success":
      color = "#32e278"
      break

    default:
      break
  }
  return color
})

// onMounted(() => {

// })
</script>

<style lang="scss" scoped>
$rollTextColorComp: v-bind(rollTextColorComp);

.scroll_div {
  position: fixed;
  // right: 40px;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);

  marquee {
    padding: 0px 10px 0px 10px;
    // width: 150px;
    // border: 1px solid red;

    .text {
      font-size: 24px;
      letter-spacing: 2px;
      font-family: SYHT-Bold;
      color: $rollTextColorComp;
      color: #36c56f;
    }
  }
}
</style>
