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
        <!-- <el-form-item label="选择参数">
          <el-select
            v-model="viewParams"
            multiple
            collapse-tags
            placeholder="Select"
            style="width: 160px; height: 46px"
          >
            <el-option
              v-for="pitem in params"
              :key="pitem"
              :label="pitem"
              :value="pitem"
            />
          </el-select>
        </el-form-item> -->
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

      <!-- 筛选参数 -->
      <el-popover
        :visible="isShowFillterCard"
        placement="bottom"
        trigger="click"
        :width="240"
      >
        <div class="select_box">
          <div
            class="item_box"
            style="padding-left: 24px"
            v-for="(ps, indexP) in params"
            :key="indexP"
          >
            <el-checkbox
              v-model="ps.isActive"
              :label="ps.paramName"
              size="large"
            />
          </div>
        </div>
        <!-- <div
          class="text_box"
          style="width: 240; height: 400px; border: 1px solid red"
        ></div> -->
        <template #reference>
          <img
            class="fillter_param_icon"
            @click="isShowFillterCard = !isShowFillterCard"
            src="../image/shaixuan.png"
          />
          <el-button>筛选</el-button>
        </template>
      </el-popover>
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
          prop="dataTime"
          align="center"
          label="检测时间"
          width="226"
        />
        <el-table-column
          v-if="formItemJudgeShow('温度')"
          prop="temValue"
          align="center"
          label="温度"
        />
        <el-table-column
          v-if="formItemJudgeShow('ph')"
          prop="phvalue"
          align="center"
          label="ph"
          width="170"
        />
        <el-table-column
          v-if="formItemJudgeShow('总磷')"
          prop="zonglinValue"
          align="center"
          label="总磷"
        />
        <el-table-column
          v-if="formItemJudgeShow('总氮')"
          prop="zongdanValue"
          align="center"
          label="总氮"
        />
        <el-table-column
          v-if="formItemJudgeShow('氨氮')"
          prop="andanValue"
          align="center"
          label="氨氮"
        />
        <el-table-column
          v-if="formItemJudgeShow('电导率')"
          prop="diandaolvValue"
          align="center"
          label="电导率"
        />

        <el-table-column
          v-if="formItemJudgeShow('溶解氧')"
          prop="rongjieyangValue"
          align="center"
          label="溶解氧"
        />

        <el-table-column
          v-if="formItemJudgeShow('COD')"
          prop="codValue"
          align="center"
          label="COD"
        />
        <el-table-column
          v-if="formItemJudgeShow('浊度')"
          prop="zhuoduValue"
          align="center"
          label="浊度"
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
import { defineComponent, ref, onMounted, watch } from "vue"
export default defineComponent({
  name: "MetricalData"
})
</script>
<script setup>
import mData from "../data/metricalData.json"
import { playClickSound, generateTableRowNumber } from "../../../utils/other.js"
import { selectMeasurementDataApi } from "../../../api/historicalData.js"

// 查询点击事件
const queryClick = () => {
  playClickSound()
  selectMeasurementDataFunc()
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
  selectMeasurementDataFunc()
}

/* 数据 ----------------------------------------- */
// 当前页码
const page = ref(1)

// 每页条数
const size = ref(10)

// 总共多少条
const total = ref(500)

// 表格数据
const tableData = ref([])

// 表格加载标识
const isTableLoading = ref(false)

// 查询表单数据
const queryFormData = ref({
  startTime: "",
  endTime: ""
})

// 筛选参数卡片展示标识
const isShowFillterCard = ref(false)

// 展示参数
const viewParams = ref([])

// 所有参数
const params = ref([
  {
    paramName: "温度",
    isActive: true
  },
  {
    paramName: "ph",
    isActive: true
  },
  {
    paramName: "总磷",
    isActive: true
  },
  {
    paramName: "总氮",
    isActive: true
  },
  {
    paramName: "氨氮",
    isActive: true
  },
  {
    paramName: "电导率",
    isActive: true
  },
  {
    paramName: "溶解氧",
    isActive: true
  },
  {
    paramName: "COD",
    isActive: true
  },
  {
    paramName: "浊度",
    isActive: true
  }
])

// 监听筛选数据
watch(
  () => params.value,
  (newData, oldData) => {
    fillterArrUpdate()
    console.log(viewParams.value, "新数据")
  },
  { deep: true }
)

// 筛选展示数组更新函数
const fillterArrUpdate = () => {
  let arr = []
  params.value.forEach((item) => {
    if (item.isActive) {
      arr.push(item.paramName)
    }
  })
  viewParams.value = arr
}

// 表单项判断显示函数
const formItemJudgeShow = (keyW) => {
  return viewParams.value.indexOf(keyW) !== -1 ? true : false
}

// 查询测量数据表格数据的函数
const selectMeasurementDataFunc = async () => {
  // 开启加载效果
  isTableLoading.value = true
  let startTime = ""
  let endTime = ""
  if (queryFormData.value.startTime)
    startTime = queryFormData.value.startTime + " 00:00:00"
  if (queryFormData.value.endTime)
    endTime = queryFormData.value.endTime + " 23:59:59"

  let data = {
    page: page.value,
    size: size.value,
    startTime: startTime,
    endTime: endTime
  }
  console.log(data, "分页查询参数")
  await selectMeasurementDataApi(data).then((res) => {
    res.data.list.forEach((item, indexD) => {
      item.number = generateTableRowNumber(page.value, size.value, indexD)
    })
    console.log(res.data.list, "测量数据-表格数据")
    tableData.value = res.data.list
    total.value = res.data.total

    // 关闭加载效果
    isTableLoading.value = false
    fillterArrUpdate()
  })
}

// Init
onMounted(() => {
  selectMeasurementDataFunc()
})
</script>

<style lang="scss" scoped>
@import url(../../../assets/css/table/table-1.scss);
@import url(../../../assets/css/pagination/pagination-1.scss);
@import url(../../../assets/css/form/form-1.scss);
@import url(../../../assets/css/select/select-1.scss);
@import url(../../../assets/css/button/button-1.scss);
@import url(../../../assets/css/checkbox/checkbox-2.scss);

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
    position: relative;

    .fillter_param_icon {
      position: absolute;
      right: 26px;
      top: 50%;
      transform: translateY(-50%);
      width: 38px;
      height: 38px;
      // border:1px solid;
      cursor: pointer;
    }

    .select_box {
      width: 240;
      height: 500px;
      background: red;
      border: 4px solid red;
      padding: 100px;
      display: block;

      .item_box {
        width: 100%;
        height: 50px;
        border: 1px solid red;
        background: red;
        font-size: 28px;
      }
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
