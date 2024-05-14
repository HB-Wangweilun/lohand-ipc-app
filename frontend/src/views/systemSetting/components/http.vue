<template>
  <div class="http_wrap">
    <div class="one_box">
      <span class="label">url</span>
      <el-input
        v-model="reportedDataStore.httpData.url"
        style="max-width: 700px"
        placeholder="xxx.xxx.xxx"
        @click="playClickSound"
      >
        <template #prepend>http://</template>
      </el-input>
    </div>
    <div class="two_box">
      <span class="label">json</span>
      <json-editor-vue
        v-model="reportedDataStore.httpData.jsonData"
        class="editor"
        :language="language"
        :current-mode="'code'"
        @click="playClickSound"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "Http"
})
</script>
<script setup>
import JsonEditorVue from "json-editor-vue3"
import { useReportedDataStore } from "../../../store"
import {
  jsonEditorStyleAdjustFunc,
  playClickSound
} from "../../../utils/other.js"

const reportedDataStore = useReportedDataStore()

//
const language = ref("Chinese")

// init
onMounted(() => {
  jsonEditorStyleAdjustFunc()
})
</script>

<style lang="scss" scoped>
@import url(../../../assets/css/json-editor-vue/json-editor-vue-1.scss);

.http_wrap {
  width: 100%;
  height: 92%;
  padding: 16px 0px 0px 0px;
  // border: 1px solid red;

  .one_box {
    width: 100%;

    .label {
      font-size: 20px;
      letter-spacing: 2px;
      height: 36px;
      line-height: 36px;
      position: relative;
      top: 4px;
      width: 45px;
      margin-left: 18px;
      margin-right: 16px;
      text-align: right;
      display: inline-block;
    }
  }

  .two_box {
    width: 95.8%;
    height: 560px;
    margin-top: 30px;
    // border: 1px solid red;
    position: relative;

    .editor {
      // margin-left: 1%;
      // margin-top: 8px;
      position: absolute;
      top: 0px;
      left: 78px;
    }

    .label {
      font-size: 20px;
      letter-spacing: 2px;
      height: 36px;
      width: 60px;
      // text-align: center;
      display: inline-block;
      margin-left: 18px;
    }
  }
}

:deep(.el-input) {
  height: 44px;
  // border: 1px solid red;

  .el-input-group__prepend {
    letter-spacing: 1.5px;
    font-size: 16px;
    font-family: SYHT-Bold;
  }

  .el-input__wrapper {
    .el-input__inner {
      font-size: 16px;
      letter-spacing: 1px;
      font-family: SYHT-Regular;
    }
  }

  .is-focus {
    box-shadow: 0 0 0 1px #dcdfe6 inset;
  }
}
</style>
