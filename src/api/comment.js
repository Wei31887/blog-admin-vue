import request from "@/utils/request";

export function commentList(data) {
  return request({
    url: '/admin/comment/list',
    method: 'post',
    data: data
  })
}

export function commentDelete(data) {
  return request({
    url: '/admin/comment/delete',
    method: 'post',
    data: data
  })
}

export function CommentStatus(data) {
  return request({
    url: '/admin/comment/updateStatus',
    method: 'post',
    data: data
  })
}
// export function updatePassword(data) {
//   return request({
//     url: '/admin/blogger/updatePassword',
//     method: 'post',
//     data: data
//   })
// }


// export function logout() {
//   return request({
//     url: '/logout',
//     method: 'post'
//   })
// }
