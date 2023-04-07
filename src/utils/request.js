import axios from "axios";
import store from "@/store";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
} from "@/utils/token";
import { ElNotification } from "element-plus";
import { BASE_API } from "@/config/config";

const service = axios.create({
  baseURL: BASE_API,
  timeout: 30000,
});

// axios 攔截器： 攔截request前狀態（access_token 狀態）
service.interceptors.request.use(
  (config) => {
    if (store.getters["user/getAccessToken"]) {
      config.headers["access_token"] = getAccessToken();
    }
    var expireTime = new Date(store.getters["user/getAccessTokenExpires"]);
    var diffMs = Math.round((expireTime.getTime() - Date.now()) / 60000);
    console.log(expireTime, diffMs);
    if (diffMs <= 10) {
      store
        .dispatch("user/refresh", { "refresh_token": getRefreshToken()})
        .catch((err) => {
          console.log(err);
        });
    }
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

// axios 攔截器： response前狀態
service.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return response;
    } else {
      ElNotification({
        title: "Error",
        message: response.data.msg,
        type: "error",
        duration: 2000,
      });
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response) {
      if (error.response.status == 514 || error.response.status == 512) {
        removeAccessToken();
      } else {
        ElNotification({
          title: "Error",
          type: "error",
          message: error.response.status + ", " + error.response.data.msg,
          duration: 3000,
        });
      }
    }
    ElNotification({
      title: "Error",
      type: "error",
      message: error,
      duration: 3000,
    });
    return Promise.reject(error);
  }
);

export default service;
