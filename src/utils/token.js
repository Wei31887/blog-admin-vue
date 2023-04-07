import Cookie from 'js-cookie'

const GetAccess = 'access_token'
const GetAccessExpire = 'access_token_expired_at'
const GetRefresh = 'refresh_token'
const GetRefreshExpire = 'refresh_token_expired_at'

export function getAccessToken() {
    return Cookie.get(GetAccess)
}

export function getRefreshToken() {
    return Cookie.get(GetRefresh)
}

export function getAccessExpires() {
    return Cookie.get(GetAccessExpire)
}

export function getRefreshExpires() {
    return Cookie.get(GetRefreshExpire)
}

export function setAccessToken(token) {
    return Cookie.set(GetAccess, token)
}

export function setRefreshToken(token) {
    return Cookie.set(GetRefresh, token)
}

export function setAccessExpires(time) {
    return Cookie.set(GetAccessExpire, time)
}

export function setRefreshExpires(time) {
    return Cookie.set(GetRefreshExpire, time)
}

export function removeAccessToken() {
    return Cookie.remove(GetAccess)
}

export function removeRefreshToken() {
    return Cookie.remove(GetRefresh)
}

export function removeAccessExpires() {
    return Cookie.remove(GetAccessExpire)
}

export function removeRefreshExpires() {
    return Cookie.remove(GetRefreshExpire)
}


