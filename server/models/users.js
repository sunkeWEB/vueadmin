let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  pwd: String,
  avatar: String,
  auth: [{  // 权限数组
    path: String, // 路径
    authname: String,
    authsigin: { // 单节点权限 true是授权 false是未授权
      add: Boolean,
      del: Boolean,
      update: Boolean,
      isauth: Boolean // 这里是对系统设置授权
    },
    name: String,
    publics: Boolean // 是不是公共的路由
  }],
  ip: String, // 最近登录ip
  time: Number, // 最近登录时间
  status: Boolean
});

module.exports = mongoose.model('users', userSchema);
