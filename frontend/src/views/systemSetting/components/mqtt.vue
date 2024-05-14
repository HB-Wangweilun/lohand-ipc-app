<template>
  <div class="mqtt_wrap">
    <div class="one_box">
      <span class="label">地址&端口</span>
      <el-input
        v-model="reportedDataStore.mqttData.serverAddress"
        style="width: 300px; margin-right: 16px"
        placeholder="地址"
        @click="playClickSound"
      />
      <el-input
        v-model="reportedDataStore.mqttData.portNumber"
        style="width: 120px"
        placeholder="端口"
        @click="playClickSound"
      />
    </div>
    <div class="two_box">
      <!-- <span class="label">账号&密码</span> -->
      <div class="item">
        <span class="label">账号</span>
        <el-input
          v-model="reportedDataStore.mqttData.account"
          style="width: 200px; margin-right: 16px"
          placeholder="请输入账号"
          @click="playClickSound"
        />
      </div>
      <div class="item">
        <span class="label">密码</span>
        <el-input
          v-model="reportedDataStore.mqttData.password"
          type="password"
          show-password
          style="width: 206px; margin-right: 16px"
          placeholder="请输入密码"
          @click="playClickSound"
        />
      </div>
    </div>
    <div class="three_box"></div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "Mqtt"
})
</script>
<script setup>
import { useReportedDataStore } from "../../../store"
import { playClickSound } from "../../../utils/other.js"

const reportedDataStore = useReportedDataStore()

// init
onMounted(() => {})
</script>

<style lang="scss" scoped>
@import url(../../../assets/css/input/input-1.scss);

.mqtt_wrap {
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
  .two_box {
    width: 100%;
    height: 56px;
    line-height: 46px;
    // border: 1px solid red;
    display: flex;
    flex-direction: row;
    margin-top: 6px;

    .item {
      margin-right: 16px;
      .label {
        font-size: 18px;
        letter-spacing: 4px;
        position: relative;
        top: 4px;
        margin-right: 10px;
      }
    }
  }
  .three_box {
  }
}
</style>
