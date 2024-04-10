<template>
  <div class="json_editor_wrap">
    <json-editor-vue
      v-model="jsonData"
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
}

onMounted(() => {
  jsonEditorStyleAdjustFunc()
})
</script>

<style lang="scss" scoped>
.json_editor_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background: blue;

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
  }
}
</style>
