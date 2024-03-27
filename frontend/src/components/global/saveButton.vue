<template>
  <div class="save_button">
    <el-button type="primary" @click="save">
      <img class="save_img" src="../../assets/icon/save.png" />
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "SaveButton",
});
</script>
<script setup>
import { playClickSound } from "../../utils/other.js";

// emits
const emits = defineEmits(["saveClick"]);

const save = () => {
  playClickSound();
  emits("saveClick");
};
</script>

<style lang="scss" scoped>
.save_img {
  width: 24px;
  height: 24px;
  margin-right: 14px;
  position: relative;
  top: 2px;
}

/* save button */
::v-deep .el-button--primary {
  background: linear-gradient(
    180deg,
    rgb(23, 170, 238) 0%,
    rgba(15, 104, 251, 1) 100%
  );
  border: none;
  box-shadow:
    1px 1px 2px #7056e2,
    -1px -1px 2px #7056e2;
  font-family: "SYHT-Bold";
  font-size: 22px;
  padding: 26px 40px 26px 58px;
  letter-spacing: 14px;
  border-radius: 10px;
  span {
    color: white !important;
  }
}
::v-deep .el-button--primary:active {
  transform: scale(0.9);
}
</style>
