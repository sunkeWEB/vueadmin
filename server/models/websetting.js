let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let webSchema = new Schema({
  logo: String,
  title: String,
  phone: String,
  ip: String, // 最近操作登录ip
  time: Number, // 最近操作登录时间
  name: String,// 最近操作姓名
  beian: String,
  adders: String,
  qq:String
});

module.exports = mongoose.model('webs', webSchema);
