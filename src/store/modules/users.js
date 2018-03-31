import {getInfo, login} from '@/api/users'
import {getToken, setToken} from '@/utils/auth'

const users = {
  /**
   * 用户登录的信息
   * token 凭证
   * name 用户名
   * avatar 头像
   * roles 路由权限
   */
  state: {
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNWFiMzNiOThmNGU1NDc0NGU3Mzg3ZTJlIiwiaWF0IjoxNTIxNzAzNzExLCJleHAiOjE1MjE3NDY5MTF9.jnxbsWI4rC0HZILSM8cqpnFf2VNrQ6YFyZnDhv7ZwbY',
    name: '',
    avatar: '',
    roles: [],
    asyncroles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {  // 这里设置各个参数
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ASYNCROLES: (state, roles) => {
      state.asyncroles = roles
    },
    UPDATE_INFO:(state, roles) =>{
      state.avatar = roles;
    }
  },
  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.name.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.pwd).then(response => {
          setToken("Bearer " + response.token)
          commit('SET_TOKEN', "Bearer " + response.token)
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.result
          commit('SET_ASYNCROLES', data.auth)
          const datasall = [];
          data.auth.map(v => {
            datasall.push(v.authname);
          });
          commit('SET_ROLES', datasall)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAvatar ({commit},userInfo){
      commit('UPDATE_INFO', userInfo)
    }
  }
};
export default users;
