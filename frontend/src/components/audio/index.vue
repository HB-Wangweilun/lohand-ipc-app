<template>
  <div>
    <audio id="myAudio">
      <source src="./click_sound1.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ClickAudio",
});
</script>
<script setup></script>

<style lang="scss" scoped></style>
