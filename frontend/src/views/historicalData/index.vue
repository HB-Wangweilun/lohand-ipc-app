<template>
  <div class="historical_data_wrap">
    <!-- <el-tabs
      :tab-position="'bottom'"
      style="height: 200px"
      class="param_setting_tabs"
      @tab-click="tabClick"
      id="param_setting_tabs"
    >
      <el-tab-pane label="初始化设置">
        <template #label>
          <span class="custom-tabs-label">
            <img class="tab_item_img" src="./image/init.png" />
            <span>初始化设置</span>
          </span>
        </template>
        <InitSetting></InitSetting>
      </el-tab-pane>

      <el-tab-pane label="运行模式设置">
        <template #label>
          <span class="custom-tabs-label">
            <img class="tab_item_img" src="./image/runningMode.png" />
            <span>运行模式设置</span>
          </span>
        </template>
        运行模式设置
      </el-tab-pane>

      <el-tab-pane label="运行参数设置">
        <template #label>
          <span class="custom-tabs-label">
            <img class="tab_item_img" src="./image/runningParam.png" />
            <span>运行参数设置</span>
          </span>
        </template>
        运行参数设置
      </el-tab-pane>

      <el-tab-pane label="运行流程设置">
        <template #label>
          <span class="custom-tabs-label">
            <img class="tab_item_img" src="./image/runningFlow.png" />
            <span>运行流程设置</span>
          </span>
        </template>
        运行流程设置
      </el-tab-pane>

      <el-tab-pane label="模块单控">
        <template #label>
          <span class="custom-tabs-label">
            <img class="tab_item_img" src="./image/singleControl.png" />
            <span>模块单控</span>
          </span>
        </template>
        模块单控
      </el-tab-pane>

      <el-tab-pane label="外设管理">
        <template #label>
          <span class="custom-tabs-label">
            <img class="tab_item_img" src="./image/peripheral.png" />
            <span>外设管理</span>
          </span>
        </template>
        外设管理
      </el-tab-pane>

      <el-tab-pane label="通信设置">
        <template #label>
          <span class="custom-tabs-label">
            <img class="tab_item_img" src="./image/communication.png" />
            <span>通信设置</span>
          </span>
        </template>
        通信设置
      </el-tab-pane>

      <el-tab-pane label="报警设置">
        <template #label>
          <span class="custom-tabs-label">
            <img class="tab_item_img" src="./image/alarm.png" />
            <span>报警设置</span>
          </span>
        </template>
        报警设置
      </el-tab-pane>
    </el-tabs> -->

    <!-- tabs组件 -->
    <TabsC
      @setActiveItem="setCurrentTabsActiveItem"
      :options="tabsOptions"
      class="historical_data_tabsc"
    ></TabsC>

    <!-- content View -->
    <div class="content_view_box">
      <ContentCardC>
        <RealTimeData
          v-if="currentTabsActiveItem.title == '实时数据'"
        ></RealTimeData>
        <MetricalData
          v-if="currentTabsActiveItem.title == '测量数据'"
        ></MetricalData>
        <DataGraph v-if="currentTabsActiveItem.title == '数据图表'"></DataGraph>
      </ContentCardC>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "selectData"
})
</script>
<script setup>
import RealTimeData from "./components/realTimeData.vue"
import MetricalData from "./components/metricalData.vue"
import DataGraph from "./components/dataGraph.vue"
import ContentCardC from "../../components/global/contentCardC.vue"
import { playClickSound } from "../../utils/other.js"
import TabsC from "../../components/tabsC/index.vue"

// 当前tabs的activeItem
const currentTabsActiveItem = ref({
  title: "实时数据",
  icon: "realTimeData"
})

// 修改当前tabs的activeItem
const setCurrentTabsActiveItem = (item) => {
  currentTabsActiveItem.value = item
}

const tabsOptions = ref([
  {
    title: "实时数据",
    icon: "realTimeData"
  },
  {
    title: "测量数据",
    icon: "metricalData"
  },
  {
    title: "数据图表",
    icon: "curveGraph"
  }
])
</script>

<style lang="scss" scoped>
.historical_data_wrap {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
  position: relative;

  // .param_setting_tabs {
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100% !important;
  // }

  .historical_data_tabsc {
    position: fixed;
    bottom: 0;
  }

  .content_view_box {
    padding: 12px;
    width: 100%;
    // border: 1px solid red;
    background: rgba(255, 255, 255, 0);
    height: 880px;
  }
}

.tab_item_img {
  width: 30px;
  height: 30px;
  position: relative;
  top: 4px;
  margin-right: 10px;
}

:deep(.param_setting_tabs .el-tabs__header) {
  position: fixed;
  bottom: 0px;
  left: 0;

  .el-tabs__nav-wrap {
    // background: white;

    .el-tabs__nav-scroll {
      .el-tabs__nav {
        height: 100px;
        line-height: 60px;

        .el-tabs__item {
          transition: 0.4s;
          color: white;
          // font-family: SYHT-Bold;
          font-family: SYHT-Regular;
          font-size: 28px;
          padding: 10px 27px 10px 27px;
          letter-spacing: 2px;
          // background-color: rgba(0, 0, 0, 0.4);
          height: 100%;
          // border-right: 2px solid rgba(125, 164, 236, 0.8);
          box-shadow:
            2px 2px 4px #252d74,
            -2px -2px 4px #252d74;
          border-radius: 2px;
          background: linear-gradient(to bottom, #778ee9, #1848cc);

          // border-radius: 0px;
          // width:;
        }

        .is-active {
          background-color: rgba(67, 80, 168, 0.5);
          color: #4348e6 !important;
          // border: 1px solid rgba(39, 112, 249, 1);
          box-shadow:
            inset 3px 3px 6px #252d74,
            inset -3px -3px 6px #252d74;
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
