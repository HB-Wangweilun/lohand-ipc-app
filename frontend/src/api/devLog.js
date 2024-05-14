import http from "../utils/http"

// 查询日志的Api
export const selectDevLogByPageApi = (data) => {
  return http.post("/devLog/selectPage", data)
}
