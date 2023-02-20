import request from "@/utils/request"

export function tagAll() {
    return request({
      url: '/admin/blog/tag/all',
      method: 'post'
    })
  }

export function tagList(data) {
  return request({
    url: '/admin/blog/tag/list',
    method: 'post',
    data: data
  })
}
  
export function saveTag(data) {
  return request({
    url: '/admin/blog/tag/save',
    method: 'post',
    data: data
  })
}

export function tagOne(data) {
  return request({
    url: '/admin/blog/tag/one',
    method: 'post',
    data: data
  })
}

export function tagDelete(data) {
  return request({
    url: '/admin/blog/tag/delete',
    method: 'post',
    data:data
  })
}
