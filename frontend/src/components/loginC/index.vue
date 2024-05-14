<template>
  <el-dialog
    v-model="props.show"
    :title="props.title"
    width="500"
    @close="closeUserLoginDialog"
    class="dialogc"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="dialogc_header_box">
        <span class="title">{{ props.title }}</span>
      </div>
    </template>
    <slot></slot>
    <!-- <span>This is a message</span> -->

    <template #footer v-if="props.isFooter">
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="okClick"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "LoginC"
})
</script>

<script setup>
const props = defineProps(["show", "title", "isFooter"])

const emits = defineEmits(["showDialog", "closeDialog", "okClick"])

const closeDialog = () => {
  emits("closeDialog")
}

const okClick = () => {
  emits("okClick")
  // emits("closeDialog")
}

const closeUserLoginDialog = () => {
  emits("closeDialog")
}
</script>

<style lang="scss" scoped></style>
