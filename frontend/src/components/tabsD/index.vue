<template>
  <div class="flow_tabs_box">
    <div
      :class="{
        flow_tab_item: true,
        is_show_right_border: true,
        is_active: tabsData[0].isActive,
        is_activec: !tabsData[0].isActive,
      }"
      @click="tabItemClick('single')"
    >
      <img class="tab_item_img" src="../image/singleProcessControl.png" />
      <span class="title">流程单控</span>
    </div>
    <div
      :class="{
        flow_tab_item: true,
        is_active: tabsData[1].isActive,
        is_activec: !tabsData[1].isActive,
      }"
      @click="tabItemClick('definition')"
    >
      <img class="tab_item_img" src="../image/processDefinition.png" />
      <span class="title">流程定义</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TabsD",
});
</script>
<script setup></script>

<style lang="scss" scoped>
.flow_tabs_box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
  // border: 1px solid red;

  .flow_tab_item {
    position: relative;
    display: flex;
    width: 200px;
    // border: 1px solid red;
    padding: 10px 0px 16px 32px;
    line-height: 22px;
    transition: 2s;
    // border-right: 1px solid rgba(255, 255, 255, 0.5);

    .tab_item_img {
      width: 28px;
      height: 28px;
      margin-right: 12px;
    }

    .title {
      font-size: 22px;
      font-family: SYHT-Bold;
    }
  }

  .is_active::after {
    position: absolute;
    content: "";
    height: 3px;
    width: 70%;
    background-color: rgba(255, 255, 255, 0.8);
    bottom: 0;
    left: 13%;
    transition: 2s;

    // border-bottom: 3px solid rgba(255, 255, 255, 0.8);
  }

  .is_show_right_border::before {
    position: absolute;
    top: 14%;
    right: 0;
    content: "";
    height: 60%;
    width: 2px;
    background-color: rgba(255, 255, 255, 0.85);
  }
}
</style>
