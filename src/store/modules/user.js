import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/token'
import { loginByUser } from '@/api/blogger'

export default {
    namespaced: true,
    state: {
        accessToken: getAccessToken(),
        refreshToken: getRefreshToken(),
    },
    actions: {
        login({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUser(userInfo).then( res => {
                    if (res.status == 200) {
                        commit('SET_ACCESS', res.data.access_token)
                        commit('SET_REFRESH', res.data.refresh_token)
                        resolve(res)
                    } else {
                        reject(res)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    mutations: {
        SET_ACCESS(state, token) {  
            state.accessToken = token
            setAccessToken(token)
        },
        SET_REFRESH(state, token) {  
            state.refreshToken = token
            setRefreshToken(token)
        }
    },
    getters: {
        getAccessToken(state) {
            return state.accessToken
        }, 
        getRefreshToken(state) {
            return state.refreshToken
        }
    }

}