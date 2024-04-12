<template>
  <div class="json_editor_wrap">
    <json-editor-vue
      v-model="jsonEditorStore.defaultJsonViewData"
      class="editor"
      :language="language"
      :current-mode="'code'"
    />
    <!-- <div class="mark"></div> -->
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "JsonEditors"
})
</script>
<script setup>
// 导入模块
import JsonEditorVue from "json-editor-vue3"
import { useJsonEditorStore } from "../../../store/index.js"
import {
  stringToHex,
  hexToString,
  addCommas,
  delCommas
} from "../../../utils/other.js"

const jsonEditorStore = useJsonEditorStore()

const jsonData = ref({})

const language = ref("Chinese")

// json  编辑器样式调整 函数
const jsonEditorStyleAdjustFunc = () => {
  // 删除跳转外链的标签
  let linkTagEle = document.querySelector(".jsoneditor-poweredBy")
  linkTagEle.parentNode.removeChild(linkTagEle)

  // 调整编辑器最大化图标标签位置
  const fullScreenEle = document.querySelector(".full-screen")
  fullScreenEle.style.right = "6px"

  // 删除整个头部组件
  let menuEle = document.querySelector(".jsoneditor-menu")
  menuEle.parentNode.removeChild(menuEle)

  // 让编辑器撑满盒子
  const editMainEle = document.querySelector(
    ".jsoneditor-outer.has-main-menu-bar"
  )
  editMainEle.style.marginTop = "0px"
  editMainEle.style.paddingTop = "0px"

  // 消除蓝色外边框
  const jsonCodeWrapEle = document.querySelector(".jsoneditor")
  jsonCodeWrapEle.style.border = "thin solid transparent"
  jsonCodeWrapEle.style.borderRadius = "50px"

  // 边距‘
  const ace_gutterEle = document.querySelector(".ace_gutter")
  const ace_contentEle = document.querySelector(".ace_content")
  const ace_text_layerEle = document.querySelector(".ace_text-layer")
  const ace_scrollerEle = document.querySelector(".ace_scroller")
  ace_gutterEle.style.paddingTop = "4px"
  ace_contentEle.style.marginTop = "4px"
  // ace_text_layerEle.style.marginTop = "10px"
  // ace_scrollerEle.style.paddingTop = "10px"
}

onMounted(() => {
  jsonEditorStyleAdjustFunc()
  console.log(
    hexToString(
      "44,53,44,45,56,52,45,47,3a,4c,48,5f,44,5a,2d,39,39,39,30,31,3b"
    )
  )

  let strY = "abcdefghijklmnopqrstuvwxy1"
  let addCommasY = addCommas("abcdefghijklmnopqrstuvwxyz")
  let delCommasY = delCommas(addCommasY)
  console.log(addCommasY)
  console.log(delCommasY)
})
</script>

<style lang="scss" scoped>
.json_editor_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  // background: blue;
  // border: 1px solid red;

  .editor {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 30px;
  }

  .jsoneditor-outer {
    border-radius: 50% !important;
    padding-top: 10px;
  }
}
</style>
