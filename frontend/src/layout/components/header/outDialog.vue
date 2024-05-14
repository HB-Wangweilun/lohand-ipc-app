<template>
  <div class="out_dialog_wrap"></div>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "OutDialog"
})
</script>
<script setup></script>

<style lang="scss" scoped>
.out_dialog_wrap {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99999999999999999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
