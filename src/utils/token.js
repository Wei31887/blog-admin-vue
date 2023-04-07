import Cookie from 'js-cookie'

const GetAccess = 'access_token'
const GetRefresh = 'refresh_token'

export function getAccessToken() {
    return Cookie.get(GetAccess)
}

export function getRefreshToken() {
    return Cookie.get(GetRefresh)
}

export function setAccessToken(token) {
    return Cookie.set(GetAccess, token)
}

export function setRefreshToken(token) {
    return Cookie.set(GetRefresh, token)
}

export function removeAccessToken() {
    return Cookie.remove(GetAccess)
}

export function removeRefreshToken() {
    return Cookie.remove(GetRefresh)
}
