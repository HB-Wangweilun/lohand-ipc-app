<template>
  <div class="hint_pop_up_wrap">
    <el-dialog
      v-model="props.show"
      :title="props.title"
      width="800"
      @close="closeDialog"
      class="dialogc"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="dialogc_header_box">
          <img class="hint_icon" src="../../assets/icon/hint.png" />
          <span class="title">{{ props.title }}</span>
        </div>
      </template>
      <div class="message_content_box">
        <div class="center_box">
          <img class="status_img" src="../../assets/icon/saveSuccess.png" />
          <span class="message">{{ props.messageContent }}</span>
        </div>
      </div>
      <!-- <span>This is a message</span> -->

      <!-- <template #footer v-if="props.isFooter">
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="okClick"> 确定 </el-button>
      </div>
    </template> -->
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "HintPopUp"
})
</script>
<script setup>
const props = defineProps(["show", "title", "messageContent"])

const emits = defineEmits(["showDialog", "closeDialog"])

const closeDialog = () => {
  emits("closeDialog")
}
</script>

<style lang="scss" scoped>
.message_content_box {
  color: white;
  height: 400px;
  font-size: 47px;
  position: relative;

  .center_box {
    width: 420px;
    position: absolute;
    top: 48%;
    left: 55%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row;

    .status_img {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      position: relative;
      top: 6px;
    }

    .message {
      font-family: SYHT-Bold;
      letter-spacing: 20px;
    }
  }
}
::v-deep .dialogc {
  background: linear-gradient(
    to bottom,
    rgba(16, 119, 184, 0.8),
    rgba(79, 98, 201, 0.8)
  ) !important;
  padding-top: 0px !important;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  margin-top: 20vh;

  .el-dialog__header {
    padding: 0 !important;
    .dialogc_header_box {
      padding: 16px 0px;
      background: rgba(94, 142, 230, 0.6) !important;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      .hint_icon {
        width: 36px;
        height: 36px;
        margin-left: 12px;
      }

      .title {
        margin-left: 20px;
        font-family: SYHT-Bold;
        font-size: 30px;
        letter-spacing: 30px;
        color: white !important;
        position: relative;
        top: -6px;
      }

      .close_icon {
      }
    }
  }
}
</style>
