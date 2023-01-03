import Cookie from 'js-cookie'

const GetKey = 'token'

export function getToken() {
    return Cookie.get(GetKey)
}

export function setToken(token) {
    return Cookie.set(GetKey, token)
}

export function removeToken() {
    return Cookie.remove(GetKey)
}
