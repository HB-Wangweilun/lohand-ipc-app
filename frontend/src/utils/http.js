import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router/index";

// 创建axios实例

const baseUrl = import.meta.env.VITE_GO_URL;
const http = axios.create({
  baseURL: baseUrl,
  timeout: 200000, // 请求超时时间
});
let isRefreshing = true;

// request拦截器
http.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = localStorage.getItem("token");
    } else {
      config.headers["Authorization"] = "Basic cGM6cGM=";
    }
    config.headers["Content-type"] = "multipart/form-data";
    config.headers["clientType"] = "PC";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// respone拦截器
http.interceptors.response.use(
  (response) => {
    // const loadingInstance = ElLoading.service()
    // 接口请求失败;  与后端约定 10010 代表token失效 需要刷新token
    if (response.data.code == 10010) {
      if (isRefreshing) {
        return refreshToken()
          .then((res) => {
            if (res.data.code == 1) {
              localStorage.setItem("token", "Bearer " + res.data.access_token);
              // 已经刷新了token，将所有队列中的请求进行重试
              onAccessTokenFetched();
              // 再发请求
              return instance(response.config);
            } else {
              localStorage.removeItem("token");
              router.push({ path: "/login" });
              return false;
            }
          })
          .catch(() => {
            console.log("请求refreshToken接口异常", error);
            localStorage.removeItem("token");
            router.push({ path: "/login" });

            return false;
          })
          .finally(() => {
            isRefreshing = true;
          });
      } else {
        // 正在刷新token 将失败401的请求放入队列
        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber(() => {
            resolve(instance(response.config));
          });
        });
        return retryOriginalRequest;
      }
    } else if (response.data.result !== "success") {
      ElMessage.error(response.data.msg);
      return response.data;
    } else {
      return response.data;
    }
  },
  (error) => {
    // message.error(error.message);
    ElMessage.error(error.message);
    router.push({ path: "/login" });
    return Promise.reject(error);
  }
);

export default http;

// 刷新token请求
function refreshToken() {
  return axios.post(
    `${baseUrl}auth/oauth/token`,
    {
      grant_type: "refresh_token",
      refresh_token: sessionStorage.getItem("screen_token"),
    },
    {
      headers: {
        Authorization: "Basic cGM6cGM=",
        clientType: "SCREEN",
        "Content-type": "multipart/form-data",
      },
    }
  );
}

let subscribers = [];

// 执行队列
function onAccessTokenFetched() {
  subscribers.forEach((callback) => {
    callback();
  });
  subscribers = [];
}

// 添加队列
function addSubscriber(callback) {
  subscribers.push(callback);
}
