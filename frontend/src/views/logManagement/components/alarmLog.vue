<template>
  <div class="alarm_log_wrap">
    <div class="header_box">
      <!-- queryFormLogTypeData -->
      <el-form
        :inline="true"
        :model="queryRunLogFormData"
        class="demo-form-inline"
      >
        <!-- <el-form-item label="日志类型">
          <el-select
            class="log_type"
            v-model="queryRunLogFormData.logType"
            placeholder="请选择类型"
            size="large"
          >
            <el-option
              v-for="(qflt, indexT) in queryFormLogTypeData"
              :key="indexT"
              :label="qflt.label"
              :value="qflt.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="日志事件">
          <el-select
            class="log_event"
            v-model="queryRunLogFormData.logEvent"
            placeholder="请选择日志事件"
            size="large"
          >
            <el-option
              v-for="(qfle, indexE) in queryFormLogEventData"
              :key="indexE"
              :label="qfle.label"
              :value="qfle.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="action_button_box">
            <el-button type="primary" @click="queryClick">
              <img class="icon" src="../../../assets/image/query.png" />
              <span>查询</span>
            </el-button>
            <el-button type="primary" @click="exportClick">
              <img class="icon" src="../../../assets/image/export.png" />
              <span>导出</span>
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_box metrical_data_table">
      <el-table
        :data="tableData"
        :border="false"
        style="width: 100%; height: 100%"
        :highlight-current-row="true"
        @row-click="tableRowClick"
        v-loading="isTableLoading"
      >
        <el-table-column
          prop="number"
          align="center"
          label="序号"
          width="150"
        />

        <!-- <el-table-column
          prop="devName"
          align="center"
          label="设备名称"
          width="300"
        /> -->
        <!-- <el-table-column
          prop="logType"
          align="center"
          label="日志类型"
          width="350"
        /> -->
        <el-table-column
          prop="logEvent"
          align="center"
          label="日志事件"
          width="350"
        />
        <el-table-column
          prop="logContent"
          align="center"
          label="日志内容"
          width="920"
        />
        <el-table-column
          prop="createTime"
          align="center"
          label="时间"
          width="436"
        />
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next, total"
      v-model:current-page="page"
      :total="total"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue"
export default defineComponent({
  name: "AlarmLog"
})
</script>
<script setup>
import runLogData from "../data/runLogData.json"
import { playClickSound, generateTableRowNumber } from "../../../utils/other.js"

// 查询点击事件
const queryClick = () => {
  playClickSound()
}

// 导出点击事件
const exportClick = () => {
  playClickSound()
}

// 表格行点击事件
const tableRowClick = () => {
  playClickSound()
}

// 分页器的 change 事件
const pageChange = () => {
  playClickSound()
  tableData.value.forEach((item, index) => {
    item.number = generateTableRowNumber(page.value, size.value, index)
  })
}

/* 数据 ----------------------------------------- */
// 当前页码
const page = ref(1)

// 每页条数
const size = ref(10)

// 总共多少条
const total = ref(500)

// 表格数据
const tableData = ref(runLogData.tableData)

// 表格加载标识
const isTableLoading = ref(false)

// 查询表单数据
const queryRunLogFormData = ref({
  logType: "",
  logEvent: "所有事件"
})

// 查询表单日志类型选择数据
const queryFormLogTypeData = ref([
  {
    label: "所有类型",
    value: "所有类型"
  },
  {
    label: "设备运行日志",
    value: "设备运行日志"
  },
  {
    label: "设备操作日志",
    value: "设备操作日志"
  },
  {
    label: "设备异常日志",
    value: "设备异常日志"
  },
  {
    label: "数据上传",
    value: "数据上传"
  }
])

// 查询表单日志事件选择数据
const queryFormLogEventData = ref([
  {
    label: "所有事件",
    value: "所有事件"
  },
  {
    label: "设备上线",
    value: "设备上线"
  },
  {
    label: "设备离线",
    value: "设备离线"
  },
  {
    label: "登录日志",
    value: "登录日志"
  },
  {
    label: "设备操作",
    value: "设备操作"
  },
  {
    label: "运行日志",
    value: "运行日志"
  },
  {
    label: "异常检测",
    value: "异常检测"
  },
  {
    label: "门禁日志",
    value: "门禁日志"
  },
  {
    label: "运维记录",
    value: "运维记录"
  }
])

// Init
onMounted(() => {
  tableData.value.forEach((item, index) => {
    item.number = generateTableRowNumber(page.value, size.value, index)
  })
  isTableLoading.value = true
  setTimeout(() => {
    isTableLoading.value = false
  }, 1000)
})
</script>

<style lang="scss" scoped>
@import url(../../../assets/css/table/table-1.scss);
@import url(../../../assets/css/pagination/pagination-1.scss);
@import url(../../../assets/css/form/form-1.scss);
@import url(../../../assets/css/select/select-1.scss);
@import url(../../../assets/css/button/button-1.scss);

.alarm_log_wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .header_box {
    width: 100%;
    height: 10%;
    background-color: rgba(255, 255, 255, 0.15);
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow:
      1px 1px 4px rgba(255, 255, 255, 0.3),
      -1px -1px 4px rgba(255, 255, 255, 0.3);
    padding: 15px 0px 0px 40px;

    .log_event {
      width: 130px;
      position: relative;
      top: 2px;
    }
  }

  .table_box {
    width: 100%;
    height: 76%;
  }

  .pagination {
    position: absolute;
    bottom: 6px;
    right: 0px;
    // transform: scale(1.4);
  }

  .action_button_box {
    position: relative;
    left: -16px;

    .icon {
      width: 26px;
      margin-right: 14px;
    }
  }
}
</style>
