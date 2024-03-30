import http from "../utils/http"
import { qsStringifyF } from "../utils/other.js"

const Api = {
  /* 初始化设置 */
  // 查询初始化设置
  selectInitSetData: "/initSet/select",
  // 保存初始化设置
  updateInitSetData: "/initSet/update",

  /* 运行模式设置 */
  // 查询运行模式设置
  selectRunModeSet: "/runModeSet/select",
  // 保存运行模式设置
  updateRunModeSet: "/runModeSet/update",

  /* 运行参数设置 */
  // 查询运行参数设置
  selectRunParamSet: "/runParamSet/select",
  // 保存运行参数设置
  updateRunParamSet: "/runParamSet/update",

  /* 运行流程设置 */
  // 查询运行流程设置
  selectRunFlowSet: "/process/select",
  // 选择流程
  chooseFlow: "/process/choose",
  // 查询所有步骤
  selectAllStep: "/step/select",

  /* 报警设置 */
  // 查询报警设置
  selectAlarmSet: "/devReport/select",
  // 修改报警设置
  updateAlarmSet: "/devReport/update",
  // 开启/关闭
  editAlarmStatus: "/devReport/editStatus",
  // 测试开启/关闭
  alarmTest: "/devReport/test"
}

/* 初始化设置 ----------------------------------------------------------------------- */
// 查询初始化设置的Api
export const selectInitSetDataApi = () => {
  return http.get(Api.selectInitSetData)
}

// 保存初始化设置的Api

export const updateInitSetDataApi = (data) => {
  return http.post(Api.updateInitSetData, data)
}
