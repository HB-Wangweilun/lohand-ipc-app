<template>
  <div class="tcp_wrap">
    <div class="one_box">
      <span class="label">地址&端口</span>
      <el-input
        v-model="reportedDataStore.tcpData.serverAddress"
        style="width: 300px; margin-right: 16px"
        placeholder="地址"
        @click="playClickSound"
      />
      <el-input
        v-model="reportedDataStore.tcpData.portNumber"
        style="width: 120px"
        placeholder="端口"
        @click="playClickSound"
      />
    </div>
    <!-- <div class="two_box"></div>
    <div class="three_box"></div> -->
    <el-collapse class="packages_collapse_box" v-model="showCollapse">
      <el-collapse-item name="1" style="margin-top: 40px">
        <template #title>
          <el-checkbox
            v-model="reportedDataStore.tcpData.isUsingHeartbeatPackage"
            label=""
            size="large"
            @click.stop="playClickSound"
            class="collapse_checkbox"
            @change="
              (e) => {
                packageChange(e, 1)
              }
            "
          />
          <span class="title">心跳包</span>

        
        </template>
      </el-collapse-item>
      <el-collapse-item title="注册包" name="2" style="margin-top: 40px">
        <template #title>
          <el-checkbox
            v-model="reportedDataStore.tcpData.isUsingRegistrationPackage"
            label=""
            size="large"
            @click.stop="playClickSound"
            class="collapse_checkbox"
            @change="
              (e) => {
                packageChange(e, 2)
              }
            "
          />
          <span class="title">注册包</span>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "Tcp"
})
</script>
<script setup>
import { useReportedDataStore } from "../../../store"
import { playClickSound } from "../../../utils/other.js"

const showCollapse = ref([])

const reportedDataStore = useReportedDataStore()

// 心跳 / 注册 包change事件
const packageChange = (e, n) => {
  updatePackagesCollapseStatusFunc()
  // switch (n) {
  //   case 1:
  //     break;
  //   case 2:
  //     break;
  //   default:
  //     break;
  // }
}

// init
onMounted(() => {
  console.log(reportedDataStore.tcpData)
  updatePackagesCollapseStatusFunc()
})

// 更改心跳包和注册包折叠组件展开状态的函数
const updatePackagesCollapseStatusFunc = () => {
  // 清空状态
  showCollapse.value = []
  // 更改心跳包和注册包折叠组件展开状态
  if (reportedDataStore.tcpData.isUsingHeartbeatPackage)
    showCollapse.value.push("1")
  if (reportedDataStore.tcpData.isUsingRegistrationPackage)
    showCollapse.value.push("2")
}
</script>

<style lang="scss" scoped>
@import url(../../../assets/css/input/input-1.scss);
@import url(../../../assets/css/collapse/collapse-1.scss);
@import url(../../../assets/css/checkbox/checkbox-1.scss);

.tcp_wrap {
  width: 100%;
  height: 92%;
  padding: 10px 0px 0px 16px;

  .one_box {
    width: 100%;
    height: 56px;
    // border: 1px solid red;
    line-height: 46px;

    .label {
      font-size: 18px;
      // font-family: SYHT-Bold;
      letter-spacing: 2px;
      position: relative;
      top: 4px;
      margin-right: 16px;
    }
  }

  .packages_collapse_box {
    .collapse_checkbox {
      margin-top: 4px;
    }
  }
  // .two_box {
  // }
  // .three_box {
  // }
}
</style>
