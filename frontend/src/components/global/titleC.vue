<template>
  <div class="titlec_wrap">
    <div class="left_placeholder_box"></div>
    <span class="title">{{ props.title }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TitleC",
});
</script>
<script setup>
const props = defineProps(["title"]);
</script>

<style lang="scss" scoped>
.titlec_wrap {
  // width: 600px;
  height: 46px;
  line-height: 46px;
  // border: 1px solid red;
  position: relative;
  margin-bottom: 14px;
  background: linear-gradient(
    90deg,
    rgba(21, 183, 204, 0.4) 0%,
    rgba(22, 51, 212, 0) 100%
  );
  // border-top-right-radius: 10px;
  // border-bottom-right-radius: 10px;

  .left_placeholder_box {
    width: 7px;
    height: 100%;
    background: #89c0f0;
    position: absolute;
    top: 0;
    left: 0;
    // border-radius: 2px;
  }

  .title {
    margin-left: 20px;
    letter-spacing: 2px;
    font-size: 22px;
    font-family: SYHT-Bold;
  }
}
</style>
