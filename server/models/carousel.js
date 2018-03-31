let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let carouselSchema = new Schema({
  avatar: String,
  describe: String,// 轮播图描述
  url: String, // 轮播图跳转地址
  ip: String, // 最近操作登录ip
  time: Number, // 最近操作登录时间
  name: String,// 最近操作姓名
  status: Boolean
});

module.exports = mongoose.model('carousels', carouselSchema);
