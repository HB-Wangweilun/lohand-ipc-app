<template>
  <div class="param_setting_wrap">
    <el-tabs
      :tab-position="'bottom'"
      style="height: 200px"
      class="param_setting_tabs"
      @tab-click="tabClick"
      id="param_setting_tabs"
    >
      <el-tab-pane label="初始化设置">初始化设置</el-tab-pane>
      <el-tab-pane label="运行模式设置">运行模式设置</el-tab-pane>
      <el-tab-pane label="运行参数设置">运行参数设置</el-tab-pane>
      <el-tab-pane label="运行流程设置">运行流程设置</el-tab-pane>
      <el-tab-pane label="单控设置">单控设置</el-tab-pane>
      <el-tab-pane label="空调设置">空调设置</el-tab-pane>
      <el-tab-pane label="通信设置">通信设置</el-tab-pane>
      <el-tab-pane label="报警设置">报警设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ParamSetting",
});
</script>
<script setup>
import { playClickSound } from "../../utils/other.js";

const tabClick = (e) => {
  playClickSound();
  // let indexE = Number(e.index);
};
</script>

<style lang="scss" scoped>
.param_setting_wrap {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
  position: relative;

  .param_setting_tabs {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100% !important;
  }
}

::v-deep .param_setting_tabs .el-tabs__header {
  position: fixed;
  bottom: 0px;
  left: 0;

  .el-tabs__nav-wrap {
    background: white;
    .el-tabs__nav-scroll {
      .el-tabs__nav {
        height: 100px;
        line-height: 60px;

        .el-tabs__item {
          transition: 0.4s;
          color: white;
          // font-family: SYHT-Bold;
          font-family: SYHT-Regular;
          font-size: 30px;
          padding: 10px 42px 10px 42px;
          letter-spacing: 2px;
          background-color: rgba(0, 0, 0, 0.9);
          height: 100%;
          // width:;
        }

        .is-active {
          background-color: rgb(43, 46, 226);
        }

        .el-tabs__active-bar {
          display: none;
        }
      }
    }
  }

  .el-tabs__nav-wrap::after {
    display: none;
  }
}
</style>
