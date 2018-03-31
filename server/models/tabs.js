let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tabsSchema = new Schema({
  name:String,
  zh: String,
  en: String,
  color:String,// 后台显示的背景
  ip: String, // 最近操作登录ip
  time: Number, // 最近操作登录时间
  name: String,// 最近操作姓名
  status: Boolean
});

module.exports = mongoose.model('tabs', tabsSchema);
