<template>
  <div class="metrical_data_wrap">
    <div class="header_box"></div>
    <div class="table_box metrical_data_table">
      <el-table
        :data="tableData"
        :border="false"
        style="width: 100%; height: 100%"
        :highlight-current-row="true"
        @row-click="tableRowClick"
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
//
const tableData = ref(mData.tableData)

// Init
onMounted(() => {
  tableData.value.forEach((item, index) => {
    item.number = generateTableRowNumber(page.value, size.value, index)
  })
})
</script>

<style lang="scss" scoped>
.metrical_data_wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .header_box {
    width: 100%;
    height: 12%;
    background-color: rgba(255, 255, 255, 0.15);
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow:
      1px 1px 4px rgba(255, 255, 255, 0.3),
      -1px -1px 4px rgba(255, 255, 255, 0.3);
  }

  .table_box {
    width: 100%;
    height: 76%;
  }

  .pagination {
    position: absolute;
    bottom: 0;
    right: 0px;
    // transform: scale(1.4);
  }
}

/* table */
:deep(.el-table) {
  border-radius: 8px;
  background: transparent !important;
  .el-table__inner-wrapper {
    .el-table__header-wrapper {
      height: 70px;
      // border-radius: 20px;

      .el-table__header {
        height: 70px;
        // border-radius: 20px;

        thead {
          height: 70px;

          tr {
            height: 70px;
            background: rgba(255, 255, 255, 0.92) !important;

            th {
              background: transparent !important;
              border-right: 0px;
              color: rgb(90, 89, 89);

              border-color: rgb(212, 210, 210);

              .cell {
                font-family: SYHT-Bold !important;
                font-weight: 500;
                letter-spacing: 4px;
                font-size: 18px;
              }
            }
          }
        }
      }
    }

    .el-table__body-wrapper {
      .el-scrollbar {
        .el-scrollbar__wrap {
          .el-scrollbar__view {
            height: 100%;
            .el-table__body {
              tbody {
                tr {
                  background: rgba(255, 255, 255, 0.82) !important;
                  height: 55px;

                  td {
                    letter-spacing: 2px;
                    border-color: rgb(212, 210, 210);
                    font-size: 16px;
                  }
                }

                tr:hover {
                  // background: red !important;
                }
                tr:focus {
                  background: red !important;
                }
              }
            }

            /* 空状态 */
            .el-table__empty-block {
              height: 100%;
              background: rgba(255, 255, 255, 0.82) !important;
              // border: 1px solid red;

              .el-table__empty-text {
                font-size: 34px;
                letter-spacing: 5px;
                font-family: SYHT-Bold;
              }
            }
          }
        }
      }
    }
  }
}

/* pagination */
:deep(.el-pagination) {
  .btn-prev,
  .btn-next {
    width: 44px;
    height: 44px;

    .el-icon {
      font-size: 22px;
    }
  }
  .el-pagination__total {
    color: white !important;
    letter-spacing: 1px;
    font-size: 16px;
  }

  .el-pager {
    li {
      width: 44px;
      height: 44px;
      font-size: 18px;
    }
  }
}
</style>
