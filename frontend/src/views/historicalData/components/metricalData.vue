<template>
  <div class="metrical_data_wrap">
    <div class="header_box">
      <!-- 查询表单 -->
      <el-form :inline="true" :model="queryFormData" class="demo-form-inline">
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="queryFormData.startTime"
            type="date"
            placeholder="选择开始时间"
            clearable
            :editable="false"
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
          width="100"
        />
        <el-table-column
          prop="date"
          align="center"
          label="检测时间"
          width="226"
        />
        <el-table-column prop="温度" align="center" label="温度" width="170" />
        <el-table-column prop="pH" align="center" label="氨氮" width="170" />
        <el-table-column prop="氨氮" align="center" label="氨氮" width="170" />
        <el-table-column prop="余氯" align="center" label="余氯" width="170" />
        <el-table-column prop="COD" align="center" label="COD" width="170" />
        <el-table-column prop="浊度" align="center" label="浊度" width="170" />
        <el-table-column
          prop="电导率"
          align="center"
          label="电导率"
          width="170"
        />
        <el-table-column prop="ORP" align="center" label="ORP" width="170" />
        <el-table-column
          prop="溶解氧"
          align="center"
          label="溶解氧"
          width="170"
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
  name: "MetricalData"
})
</script>
<script setup>
import mData from "../data/metricalData.json"
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
const tableData = ref(mData.tableData)

// 表格加载标识
const isTableLoading = ref(false)

// 查询表单数据
const queryFormData = ref({
  startTime: "",
  endTime: ""
})

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

.metrical_data_wrap {
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
