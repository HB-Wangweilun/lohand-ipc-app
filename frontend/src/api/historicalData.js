import http from "../utils/http.js"

const Api = {
  // 查询测量数据
  selectMeasurementData: "/historyData/selectByPage",
  // 导出测量数据文件
  // 查询单参数曲线图数据
  selectParamCurveData: "/historyData/selectByParam"
}

// 查询测量数据的Api
export const selectMeasurementDataApi = (data) => {
  return http.post(Api.selectMeasurementData, data)
}

// 查询单参数曲线图数据
export const selectParamCurveDataApi = (data) => {
  return http.post(Api.selectParamCurveData, data)
}
