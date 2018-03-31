const getters = {
  token: state => state.users.token,
  name: state => state.users.name,
  avatar: state => state.users.avatar,
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  roles: state => state.users.roles
}
export default getters
