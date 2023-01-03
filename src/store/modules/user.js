import { getToken, setToken } from '@/utils/token'
import { loginByUser } from '@/api/blogger'

export default {
    namespaced: true,
    state: {
        token: getToken(),
    },
    actions: {
        login({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUser(userInfo).then( res => {
                    if (res.data.code == 0) {
                        commit('SET_TOKEN', res.data.data)
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
        SET_TOKEN(state, token) {  
            state.token = token
            setToken(token)
            console.log('token: ' + token)
        }
    },
    getters: {
        getToken(state) {
            return state.token
        }
    }

}