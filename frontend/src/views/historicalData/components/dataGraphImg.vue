<template>
  <div class="data_graph_img_box">
    <!-- 氨氮 -->
    <img
      class="icon"
      v-if="
        props.paramName == '氨氮' && props.currentParamName != props.paramName
      "
      src="../image/andan.png"
    />
    <img
      class="icon"
      v-if="
        props.paramName == '氨氮' && props.currentParamName == props.paramName
      "
      src="../image/andan_a.png"
    />

    <!-- 温度 -->
    <img
      class="icon"
      v-if="
        props.paramName == '温度' && props.currentParamName != props.paramName
      "
      src="../image/temp.png"
    />
    <img
      class="icon"
      v-if="
        props.paramName == '温度' && props.currentParamName == props.paramName
      "
      src="../image/temp_a.png"
    />

    <!-- 总磷 -->
    <img
      class="icon"
      v-if="
        props.paramName == '总磷' && props.currentParamName != props.paramName
      "
      src="../image/zonglin.png"
    />
    <img
      class="icon"
      v-if="
        props.paramName == '总磷' && props.currentParamName == props.paramName
      "
      src="../image/zonglin_a.png"
    />

    <!-- 浊度 -->
    <img
      class="icon"
      v-if="
        props.paramName == '浊度' && props.currentParamName != props.paramName
      "
      src="../image/zhuodu.png"
    />
    <img
      class="icon"
      v-if="
        props.paramName == '浊度' && props.currentParamName == props.paramName
      "
      src="../image/zhuodu_a.png"
    />

    <!-- 电导率 -->
    <img
      class="icon"
      v-if="
        props.paramName == '电导率' && props.currentParamName != props.paramName
      "
      src="../image/diandaolv.png"
    />
    <img
      class="icon"
      v-if="
        props.paramName == '电导率' && props.currentParamName == props.paramName
      "
      src="../image/diandaolv_a.png"
    />

    <!-- pH -->
    <img
      class="icon"
      v-if="
        props.paramName == 'pH' && props.currentParamName != props.paramName
      "
      src="../image/pH.png"
    />
    <img
      class="icon"
      v-if="
        props.paramName == 'pH' && props.currentParamName == props.paramName
      "
      src="../image/pH_a.png"
    />

    <!-- COD -->
    <img
      class="icon"
      v-if="
        props.paramName == 'COD' && props.currentParamName != props.paramName
      "
      src="../image/CODcr.png"
    />
    <img
      class="icon"
      v-if="
        props.paramName == 'COD' && props.currentParamName == props.paramName
      "
      src="../image/CODcr_a.png"
    />

    <!-- 溶解氧 -->
    <img
      class="icon"
      v-if="
        props.paramName == '溶解氧' && props.currentParamName != props.paramName
      "
      src="../image/rongjieyang.png"
    />
    <img
      class="icon"
      v-if="
        props.paramName == '溶解氧' && props.currentParamName == props.paramName
      "
      src="../image/rongjieyang_a.png"
    />

    <!-- 总氮 -->
    <img
      class="icon"
      v-if="
        props.paramName == '总氮' && props.currentParamName != props.paramName
      "
      src="../image/zongdan.png"
    />
    <img
      class="icon"
      v-if="
        props.paramName == '总氮' && props.currentParamName == props.paramName
      "
      src="../image/zongdan_a.png"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "DataGraphImg"
})
</script>
<script setup>
// props
const props = defineProps(["currentParamName", "paramName"])
</script>

<style lang="scss" scoped>
.data_graph_img_box {
  display: inline-block;

  .icon {
    width: 28px;
    height: 28px;
    margin-right: 8px;
    position: relative;
    top: 8px;
  }
}
</style>
