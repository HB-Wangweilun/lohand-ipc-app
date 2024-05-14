<template>
  <div class="run_log_wrap">
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
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="queryFormData.startTime"
            type="date"
            placeholder="选择开始时间"
            clearable
            :editable="false"
            value-format="YYYY-MM-DD"
            @change="playClickSound"
            @focus="playClickSound"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="queryFormData.endTime"
            type="date"
            placeholder="选择结束时间"
            clearable
            :editable="false"
            value-format="YYYY-MM-DD"
            @change="playClickSound"
            @focus="playClickSound"
          />
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
          prop="devLogType"
          align="center"
          label="日志类型"
          width="350"
        />
        <el-table-column
          prop="devLogContent"
          align="center"
          label="日志内容"
          width="920"
        />
        <el-table-column
          prop="devLogCreateTime"
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
  name: "RunLog"
})
</script>
<script setup>
import { playClickSound, generateTableRowNumber } from "../../../utils/other.js"
import { selectDevLogByPageApi } from "../../../api/devLog.js"

// 查询点击事件
const queryClick = () => {
  playClickSound()
  selectLogDataFunc()
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
  selectLogDataFunc()
}

/* 数据 ----------------------------------------- */
// 当前页码
const page = ref(1)

// 每页条数
const size = ref(10)

// 总共多少条
const total = ref(500)

// 日志类型
const logType = ref("运行日志")

// 表格数据
const tableData = ref([])

// 表格加载标识
const isTableLoading = ref(false)

// 查询表单数据
const queryFormData = ref({
  startTime: "",
  endTime: ""
})

// 查询日志数据的函数
const selectLogDataFunc = async () => {
  isTableLoading.value = true
  let data = {
    page: page.value,
    size: size.value,
    devLogType: logType.value,
    startTime:
      queryFormData.value.startTime == "" ||
      queryFormData.value.startTime == null
        ? ""
        : queryFormData.value.startTime + " 00:00:00",
    endTime:
      queryFormData.value.endTime == "" || queryFormData.value.endTime == null
        ? ""
        : queryFormData.value.endTime + " 23:59:59"
  }
  await selectDevLogByPageApi(data).then((res) => {
    console.log(res.data, "日志数据")
    total.value = res.data.total
    res.data.list.forEach((item, index) => {
      item.number = generateTableRowNumber(page.value, size.value, index)
    })
    tableData.value = res.data.list
    isTableLoading.value = false
  })
}

// Init
onMounted(() => {
  selectLogDataFunc()
  tableData.value.forEach((item, index) => {
    item.number = generateTableRowNumber(page.value, size.value, index)
  })
})
</script>

<style lang="scss" scoped>
@import url(../../../assets/css/table/table-1.scss);
@import url(../../../assets/css/pagination/pagination-1.scss);
@import url(../../../assets/css/form/form-1.scss);
@import url(../../../assets/css/select/select-1.scss);
@import url(../../../assets/css/button/button-1.scss);

.run_log_wrap {
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
