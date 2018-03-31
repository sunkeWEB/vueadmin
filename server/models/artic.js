let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ariticSchema = new Schema({
  fenmian: String,
  tabs: Array,
  body: String,
  title: String,
  ip: String, // 最近操作登录ip
  time: Number, // 最近操作登录时间
  name: String,// 最近操作姓名
  status: Boolean,
});

module.exports = mongoose.model('aritics', ariticSchema);
