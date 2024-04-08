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
  selectAlarmSet: "/paramReport/select",
  // 修改报警设置
  updateAlarmSet: "/paramReport/update",
  // 开启/关闭
  editAlarmStatus: "/paramReport/editStatus",

  /* 模块单控 */
  // 查询模块单控设置
  selectModuleSet: "/module/select",
  // 单项模块运行
  runModule: "/module/run",
  // 复位
  resetSet: "/module/reset"
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

/* 运行模式设置 -------------------------------------------------------------------- */
// 查询运行模式设置的Api
export const selectRunModeSetApi = () => {
  return http.get(Api.selectRunModeSet)
}

// 保存运行模式设置的Api
export const updateRunModeSetApi = (data) => {
  let dataQ = JSON.stringify(data)
  // return http.post(Api.updateRunModeSet, dataQ, {
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  return http({
    url: Api.updateRunModeSet,
    method: "POST",
    data: dataQ,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  })
}

/* 运行参数设置 ------------------------------------------------------=====--------- */
// 查询运行参数设置的Api
export const selectRunParamSetApi = () => {
  return http.get(Api.selectRunParamSet)
}

// 保存运行参数设置的Api
export const updateRunParamSetApi = (data) => {
  return http.post(Api.updateRunParamSet, data)
}

/* 运行流程设置 -------------------------------------------------------------------- */
// 查询运行流程设置的Api
export const selectRunFlowSetApi = () => {
  return http.get(Api.selectRunFlowSet)
}

// 选择流程的Api
export const chooseFlowApi = (data) => {
  return http.post(Api.chooseFlow, data)
}

// 查询所有步骤的Api
export const selectAllStepApi = () => {
  return http.get(Api.selectAllStep)
}

/* 报警设置 ------------------------------------------------------------------------ */
// 查询报警设置的Api
export const selectAlarmSetApi = () => {
  return http.get(Api.selectAlarmSet)
}

// 修改报警设置的Api
export const updateAlarmSetApi = (data) => {
  return http.post(Api.updateAlarmSet, data)
}

// 开启/关闭的Api
export const editAlarmStatusApi = (data) => {
  return http.post(Api.editAlarmStatus, data)
}

/* 模块单控 ------------------------------------------------------------------------- */
// 查询模块单控设置的Api
export const selectModuleSetApi = () => {
  return http.get(Api.selectModuleSet)
}

// 单项模块运行的Api
export const runModuleApi = (data) => {
  return http.post(Api.runModule, data)
}

// 模块单控复位的Api
export const resetSetApi = () => {
  return http.get(Api.resetSet)
}
