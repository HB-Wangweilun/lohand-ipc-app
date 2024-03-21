import http from "../utils/http";

export const loginApi = () => {
  return http.get(
    "platFormSubUser/login?platFormSubUserName=yima&platFormSubUserPass=123456"
  );
};
