<template>
  <!-- <div class="step_mode_card"> -->
  <div
    :class="{
      step_mode_card_wrap: true,
      is_active: props.isActive
    }"
    @click="stepItemClick"
  >
    <div class="step_mode_card_content">
      <img v-if="props.title == '采水'" src="../image/采水.png" />
      <img v-if="props.title == '沉砂'" src="../image/沉砂.png" />
      <img v-if="props.title == '仪表测量'" src="../image/仪表测量.png" />
      <img v-if="props.title == '排空'" src="../image/排空.png" />
      <img v-if="props.title == '除藻清洗'" src="../image/除藻清洗.png" />
      <img v-if="props.title == '普通清洗'" src="../image/普通清洗.png" />
      <img v-if="props.title == '传感器保养'" src="../image/传感器清洗.png" />
      <img v-if="props.title == '气吹清洗'" src="../image/气吹清洗.png" />
      <img v-if="props.title == '传感器测量'" src="../image/传感器测量.png" />
      <span class="title">{{ props.title }}</span>
    </div>
    <!-- <div v-if="props.isActive" class="active_border"></div> -->
  </div>
  <!-- </div> -->
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "StepModeCard"
})
</script>
<script setup>
import { playClickSound } from "../../../utils/other.js"

// props
const props = defineProps(["title", "icon", "isActive"])

// emits
const emits = defineEmits(["click"])

// 步骤单控每项点击事件
const stepItemClick = () => {
  playClickSound()
  emits("click", props.title)
}
</script>

<style lang="scss" scoped>
.step_mode_card {
  position: relative;
}
.step_mode_card_wrap {
  z-index: 60 !important;
  width: 230px;
  height: 200px;
  box-sizing: border-box;
  // border: 1px solid red;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  margin-right: 72px;
  margin-top: 60px;
  position: relative;
  // box-shadow:
  //   1px 1px 2px rgba(0, 0, 0, 0.6),
  //   -1px -1px 2px rgba(0, 0, 0, 0.6);

  .step_mode_card_content {
    display: flex;
    flex-direction: column;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 70px;
      margin-left: 50%;
      transform: translateX(-50%);
    }

    .title {
      font-size: 20px;
      margin-top: 20px;
      letter-spacing: 2px;
      margin-left: 4px;
    }
  }
}

.is_active {
  // box-shadow:
  //   3px 3px 6px rgba(0, 0, 0, 0.6),
  //   3px 3px 10px rgba(0, 0, 0, 0.6);
  background: linear-gradient(
    180deg,
    rgb(23, 170, 238) 0%,
    rgba(15, 104, 251, 1) 100%
  );
  box-shadow:
    1px 1px 2px #7056e2,
    -1px -1px 2px #7056e2;
}

.step_mode_card_wrap:active {
  transition: 0.5s;
  transform: scale(0.9);
}

.active_border {
  border: 1px solid red;
  height: 216px;
  width: 246px;
  position: absolute;
  border-radius: 12px;
  // border-color: ;
  border: 2px solid rgba(0, 0, 0, 0.5);
  top: -8px;
  left: -8px;
  transition: 0.5s;
}
</style>
