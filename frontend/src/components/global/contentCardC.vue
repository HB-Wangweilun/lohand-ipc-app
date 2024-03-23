<template>
  <div class="content_card_c_wrap">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ContentCardC",
});
</script>
<script setup></script>

<style lang="scss" scoped>
.content_card_c_wrap {
  padding: 20px;
  height: 100%;
  border-radius: 10px;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.2);
}
</style>
