<template>
  <div class="reported_data_wrap">
    <JsonEditors></JsonEditors>
  </div>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "ReportedData"
})
</script>
<script setup>
import JsonEditors from "./jsonEditors.vue"
</script>

<style lang="scss" scoped>
.reported_data_wrap {
  height: 100%;
}
</style>
