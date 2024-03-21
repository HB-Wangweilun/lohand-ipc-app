<template>
  <div class="glass_card_wrap">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "GlassCard",
});
</script>
<script setup>
const props = defineProps(["width", "height", "backgroundColor"]);

const widthS = computed(() => {
  return props.width + "px";
});

const heightS = computed(() => {
  return props.height + "px";
});

const backgroundColorS = computed(() => {
  return props.backgroundColor;
});
</script>

<style lang="scss" scoped>
$widthS: v-bind(widthS);
$heightS: v-bind(heightS);
$backgroundColorS: v-bind(backgroundColorS);

.glass_card_wrap {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 8px 0px;
  width: $widthS;
  height: $heightS;
  // border: 1px solid red;
  border-radius: 20px;
  // background-color: rgba(255, 255, 255, 0.2);
  background: $backgroundColorS;
}
</style>
