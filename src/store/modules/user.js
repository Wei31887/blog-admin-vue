import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  getAccessExpires,
  getRefreshExpires,
  setAccessExpires,
  setRefreshExpires,
} from "@/utils/token";

import { loginByUser } from "@/api/blogger";
import { BASE_API } from "@/config/config";

export default {
  namespaced: true,
  state: {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    accessExpires: getAccessExpires(),
    refreshExpires: getRefreshExpires(),
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUser(userInfo)
          .then((res) => {
            if (res.status == 200) {
              commit("SET_ACCESS", res.data.access_token);
              commit("SET_REFRESH", res.data.refresh_token);
              commit("SET_ACCESS_EXPIRES", res.data.access_token_expired_at);
              commit("SET_REFRESH_EXPIRES", res.data.refresh_token_expired_at);
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    refresh({ commit }, body) {
      return new Promise((resolve, reject) => {
        fetch(BASE_API + "token/refresh", {
          method: "POST",
          //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((json) => {
            commit("SET_ACCESS", json.access_token);
            commit("SET_ACCESS_EXPIRES", json.access_token_expired_at);
            resolve(json);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  mutations: {
    SET_ACCESS(state, token) {
      state.accessToken = token;
      setAccessToken(token);
    },
    SET_REFRESH(state, token) {
      state.refreshToken = token;
      setRefreshToken(token);
    },
    SET_ACCESS_EXPIRES(state, time) {
      state.accessExpires = time;
      setAccessExpires(time);
    },
    SET_REFRESH_EXPIRES(state, time) {
      state.refreshExpires = time;
      setRefreshExpires(time);
    },
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getRefreshToken(state) {
      return state.refreshToken;
    },
    getAccessTokenExpires(state) {
      return state.accessExpires;
    },
    getRefreshTokenExpires(state) {
      return state.refreshExpires;
    },
  },
};
