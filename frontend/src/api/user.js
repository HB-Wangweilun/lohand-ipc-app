import http from "../utils/http"
// import { qsStringifyF } from "../utils/other.js"

// 查询用户的Api
export const selectUsersApi = () => {
  return http.get("/user/select")
}

// 登录Api
export const loginApi = (data) => {
  return http.post("/user/login", data)
}
