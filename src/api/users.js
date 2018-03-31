import request from '@/utils/request'

export function login(name, pwd) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      name,
      pwd
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/users/info',
    method: 'get',
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 请求轮播图数据
export function getCarouserLists(page, limit) {
  return request({
    url: '/getcarousels',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}


export function getDateLists(obj) {
  let {params, urls} = {...obj};
  return request({
    url: urls,
    method: 'get',
    params:params
  })
}

// 修改轮播图数据
export function updateCarouser(obj) {
  let {urls,data} = {...obj};
  return request({
    url: urls,
    method: 'post',
    data:data
  })
}

// 公共删除操作
export function delOperate(obj) {
  let {id, urls} = {...obj};
  return request({
    url: urls,
    method: 'post',
    data: {
      id: id,
    }
  })
}

// 公共添加操作
export function addOperate(obj) {
  let {data, urls} = {...obj};
  return request({
    url: urls,
    method: 'post',
    data: data
  })
}

// 获取单个数据
export function getDataitem(obj) {
  let {params, urls} = {...obj};
  return request({
    url: urls,
    method: 'get',
    params:params
  })
}
