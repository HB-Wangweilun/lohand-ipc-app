<template>
  <div class="meter_management_wrap">
    <!-- tabs组件 -->
    <TabsC
      @setActiveItem="setCurrentTabsActiveItem"
      :options="tabsOptions"
      class="meter_m_tabsc"
    ></TabsC>

    <!-- content View -->
    <div class="content_view_box">
      <ContentCardC>
        <CommonParam
          v-if="currentTabsActiveItem.title != '传感器'"
          :paramName="currentTabsActiveItem.title"
        ></CommonParam>
        <Sensor v-if="currentTabsActiveItem.title == '传感器'"></Sensor>
      </ContentCardC>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "MeterManagement"
})
</script>
<script setup>
// import Andan from "./components/andan.vue"
// import Zongdan from "./components/zongdan.vue"
// import Zonglin from "./components/zonglin.vue"
// import CODcr from "./components/CODcr.vue"
// import CODmn from "./components/CODmn.vue"
import Sensor from "./components/sensor.vue"
import CommonParam from "./components/commonParam.vue"
import ContentCardC from "../../components/global/contentCardC.vue"
import { playClickSound } from "../../utils/other.js"
import TabsC from "../../components/tabsC/index.vue"

// 当前tabs的activeItem
const currentTabsActiveItem = ref({
  title: "氨氮",
  icon: "andan"
})

// 修改当前tabs的activeItem
const setCurrentTabsActiveItem = (item) => {
  currentTabsActiveItem.value = item
}

const tabsOptions = ref([
  {
    title: "氨氮",
    icon: "andan"
  },
  {
    title: "总磷",
    icon: "zonglin"
  },
  {
    title: "总氮",
    icon: "zongdan"
  },
  {
    title: "CODcr",
    icon: "CODcr"
  },
  {
    title: "CODmn",
    icon: "CODmn"
  },
  {
    title: "传感器",
    icon: "sensor"
  }
])
</script>

<style lang="scss" scoped>
.meter_management_wrap {
  .meter_m_tabsc {
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
</style>
