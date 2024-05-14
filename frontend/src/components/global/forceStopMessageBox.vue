<template>
  <div
    class="hint_pop_up_wrap"
    style="z-index: 999999999999999999999999999999999"
  >
    <el-dialog
      style="z-index: 999999999999999999999999999999999"
      v-model="props.show"
      :title="props.title"
      width="800"
      @close="closeDialog"
      class="dialogc"
      :destroy-on-close="true"
      :close-on-click-modal="true"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="dialogc_header_box">
          <img class="hint_icon" src="../../assets/icon/hint.png" />
          <span class="title">{{ props.title }}</span>
        </div>
      </template>
      <div class="message_content_box">
        <div class="center_box">
          <img
            v-if="props.isShowIcon !== false"
            class="status_img"
            src="../../assets/icon/saveSuccess.png"
          />
          <span class="message">{{ props.messageContent }}</span>
        </div>
      </div>
      <!-- <span>This is a message</span> -->

      <template #footer>
        <div class="dialog-footer">
          <el-button class="cancel" click="closeDialog">
            <span class="btn_text">取消</span>
          </el-button>
          <el-button class="confirm" type="primary" @click="okClick">
            <span class="btn_text">确定</span>
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue"
export default defineComponent({
  name: "ForceStopMessageBox"
})
</script>
<script setup>
const props = defineProps([
  "show",
  "title",
  "messageContent",
  "fontSize",
  "letterSpacing",
  "isShowIcon"
])

const emits = defineEmits(["showDialog", "closeDialog", "okClick"])

const closeDialog = () => {
  emits("closeDialog")
}

const okClick = () => {
  emits("okClick")
}

// fontSize - Com
const fontSizeCom = computed(() => {
  return `${props.fontSize}px`
})

// letterSpacing - Com
const letterSpacingCom = computed(() => {
  return `${props.letterSpacing}px`
})
</script>

<style lang="scss" scoped>
$fontSizeCom: v-bind(fontSizeCom);
$letterSpacingCom: v-bind(letterSpacingCom);

.dialog-footer {
  // .el-button {
  //   height: 54px;
  //   span {
  //     font-size: 20px !important;
  //   }
  // }
  // padding: 0px 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .cancel {
    height: 56px !important;
    width: 40% !important;
    margin-left: 40px;

    .btn_text {
      font-size: 20px !important;
    }
  }

  .confirm {
    height: 56px !important;
    width: 40% !important;
    margin-right: 40px;
    .btn_text {
      font-size: 20px !important;
    }
  }
}

.hint_pop_up_wrap {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.message_content_box {
  color: white;
  z-index: 9999999999999999999999;
  height: 340px;
  font-size: 47px;
  position: relative;

  .center_box {
    // width: 620px;
    min-width: 500px;
    position: absolute;
    top: 50%;
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
      font-size: $fontSizeCom;
      letter-spacing: $letterSpacingCom;
    }
  }
}

:deep(.el-overlay) {
  // position: absolute !important;
  // z-index: 1 !important;
  // position: fixed !;
  // top: 0;
  // left: 0;
}

:deep(.dialogc) {
  // position: absolute !important;
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
    z-index: 999999999999999999999999999 !important;
    padding: 0 !important;
    .dialogc_header_box {
      padding: 16px 0px;
      background: rgba(94, 142, 230, 0.4) !important;
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
