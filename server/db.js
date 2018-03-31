let mongoose = require('mongoose');

//mongodb 地址 默认端口是27017 vueadmin是我们本次的数据库名字
const DB_PORT = "mongodb://sunke:china123@127.0.0.1:3322/vueadmin?authSource=admin";

mongoose.connect(DB_PORT);

mongoose.connection.on('connected',()=>{
  console.log("MongoDB链接成功");
});

mongoose.connection.on('error',(err)=>{
  console.log("数据库连接失败"+err);
});

mongoose.connection.on('disconnected',()=>{
  console.log("断开连接");
});

module.exports = mongoose;



// const DB_PORT = "mongodb://sunke:china123@127.0.0.1:3322/vueadmin?authSource=admin";   //mongodb 地址
