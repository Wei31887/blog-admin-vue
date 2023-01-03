import axios from "axios"
import store from "@/store";
import { getToken } from '@/utils/token'
import { ElNotification } from 'element-plus'
import { BASE_API } from "@/config/config";

const service = axios.create({
    baseURL: BASE_API,
    timeout: 30000
})

// axios 攔截器： 攔截request前狀態（token設置）
service.interceptors.request.use(
    config => {
        if (store.getters['user/getToken']) {
            config.headers['token'] = getToken()
        }
        return config
    },
    err => {
        console.log(err)
        return Promise.reject(err)
    }
)

// axios 攔截器： response前狀態
service.interceptors.response.use(
    response => {
        let res = response.data
        if (res.code == 0) {
            return response
        } else {
            ElNotification({
                title: 'Error',
                message: res.msg,
                type: 'error',
                duration: 2000
            });
            return Promise.reject(response)
        }
    },
    error => {
        console.log('err: ' + error);
        ElNotification({
            title: 'Error',
            type: 'error',
            message: error.response.status + ', ' + error.response.data.msg,
            duration: 3000
        })
        return Promise.reject(error)
    }
)

export default service