import http      from "../utils/http"


// 查询首页显示参数数据的Api
export const selectHomeParamDataApi = () => {
  return http.get('/device/selectData')

  
}