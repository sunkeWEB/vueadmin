const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const utility = require('utility');
const util = require('util');
const verify = util.promisify(jwt.verify); // 解密
const secret = '__@#$%^?.397633183@__LOVE__';
const router = require('koa-router')()
const mongoose = require('./../db');
const Users = require('./../models/users');

router.prefix('/users')

router.post('/login', async (ctx) => {
  let {name, pwd} = {...ctx.request.body};
  if (name === undefined || pwd === undefined) {
    const str = name === undefined ? "用户名不能为空" : "密码不能为空";
    ctx.body = {
      msg: '登录参数错误' + str,
      code: -1,
      data: []
    };
    return false;
  }
  let ips = ctx.request.ip.slice(7);
  let time = new Date().getTime();
  let userDoc = await Users.findOneAndUpdate({name, pwd: md5(pwd)}, {$set: {ip: ips, time: time}});
  if (userDoc) { // 用户信息存在 不存在null
    if (userDoc.status) {
      if (userDoc._id) {
        let userToken = {
          name: userDoc._id
        }
        const token = jwt.sign(userToken, secret, {expiresIn: '12h'})  //token签名 有效期为1小时
        ctx.body = {
          msg: '登录成功',
          code: 0,
          token,
          data: userDoc
        }
      } else {
        ctx.body = {
          msg: '参数错误',
          code: -1,
          data: []
        }
      }
    } else {
      ctx.body = {
        code: 1008,
        msg: "状态异常请联系管理员",
        data: []
      }
    }
  } else {
    ctx.body = {
      code: 1001,
      msg: "密码或账号错误",
      data: []
    };
  }
});

router.get('/info', async (ctx) => {
  const token = ctx.header.authorization  // 获取jwt
  let payload
  if (token) {
    payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
    let userDoc = await Users.findOne({_id: payload.name}, {pwd: 0, __v: 0, _id: 0});
    if (userDoc) {
      ctx.body = {
        code: 0,
        msg: '获取用户数据成功',
        result: userDoc
      };
    } else {
      ctx.body = {
        code: 10002,
        msg: '未找到相关的信息',
        result: []
      };
    }
  } else {
    ctx.body = {
      message: 'token 错误',
      code: 50004
    }
  }
});

router.post('/updatepwd', async (ctx) => {
  const token = ctx.header.authorization  // 获取jwt
  let {pwd} = {...ctx.request.body};
  let payload
  if (token || pwd) {
    payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
    let userDoc = await Users.update({_id: payload.name}, {$set: {pwd: md5(pwd)}});
    ctx.body = {
      code: 1,
      msg: '密码修改成功 请重新登录',
      result: userDoc
    };
  } else {
    ctx.body = {
      message: '参数错误',
      code: 10001
    }
  }
});

router.post('/updateavatar', async (ctx) => {
  const token = ctx.header.authorization  // 获取jwt
  let {avatar} = {...ctx.request.body};
  let payload
  if (token || avatar) {
    payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
    let userDoc = await Users.update({_id: payload.name}, {$set: {avatar: avatar.startsWith('/uploads/') ? avatar : (/uploads/ + avatar)}});
    ctx.body = {
      code: 2,
      msg: '头像修改成功',
      result: userDoc
    };
  } else {
    ctx.body = {
      message: '参数错误',
      code: 10001
    }
  }
});

router.get('/getUserLists', async (ctx) => {
  let {page, limit} = {...ctx.request.query}
  let pages = parseInt(page) - 1;
  let limits = parseInt(limit);
  let skip = pages * limits;
  let userDoc = await Users.find({name: {$ne: 'admin'}}, {pwd: 0, __v: 0}).skip(skip).limit(limits).exec(); // 这里过滤掉最高管理员自己的账号
  let total = await Users.count({});
  if (userDoc) {
    ctx.body = {
      code: 0,
      msg: '获取管理员数据成功',
      result: userDoc,
      total: total
    };
  } else {
    ctx.body = {
      code: 100001,
      msg: '获取管理员数据失败',
      result: []
    };
  }
});

router.post('/delUser', async (ctx) => {
  let {id} = {...ctx.request.body};
  if (id) {
    let delDoc = await Users.remove({_id: id});
    if (delDoc) {
      ctx.body = {
        code: 3,
        msg: '删除成功',
        result: delDoc
      };
    } else {
      ctx.body = {
        code: 10002,
        msg: '删除失败'
      };
    }
  } else {
    ctx.body = {
      code: 10001,
      msg: '参数错误'
    };
  }
});

router.get('/getUser', async (ctx) => {
  let {id} = {...ctx.request.query}
  if (id) {
    let userDoc = await Users.findOne({_id: id}, {pwd: 0, __v: 0});
    let total = await Users.count();
    if (userDoc) {
      ctx.body = {
        code: 0,
        msg: "信息获取成功",
        result: userDoc,
        total: total
      };
    } else {
      ctx.body = {
        code: 10001,
        msg: "信息获取失败",
        result: []
      };
    }
  } else {
    ctx.body = {
      code: 1,
      msg: "参数错误",
      result: []
    };
  }
});

router.post('/changeStatus', async (ctx) => {
  let {status, id} = {...ctx.request.body};
  if (id || status) {
    let state = status ? true : false;
    let userDoc = await Users.update({_id: id}, {$set: {status: state}});
    if (userDoc) {
      ctx.body = {
        code: 1,
        msg: '修改成功',
        result: userDoc
      };
    } else {
      ctx.body = {
        code: 10001,
        msg: '设置失败',
        result: []
      };
    }
  } else {
    ctx.body = {
      code: 10001,
      msg: '参数错误',
      result: []
    };
  }
});

router.post('/addUsers', async (ctx) => {
  let en = /^[A-Za-z]+$/;
  let {name, pwd, phone, auth} = {...ctx.request.body};
  let auths = JSON.parse(auth);
  if (en.test(name)) {
    let count = await Users.count({name});
    if (count > 0) {
      ctx.body = {
        code: 10002,
        msg: '用户名已经存在',
        result: []
      };
    } else {
      let userDoc = await Users.create({
        name,
        phone,
        pwd: md5(pwd),
        auth: auths,
        status: true,
        avatar: '/uploads/avatar.jpeg' // 默认头像  必须存在的头像
      });
      if (userDoc) {
        ctx.body = {
          code: 2,
          msg: '添加管理员成功',
          result: userDoc
        };
      } else {
        ctx.body = {
          code: 10001,
          msg: '添加管理员失败',
          result: []
        };
      }
    }
  } else {
    ctx.body = {
      code: 10003,
      msg: '添加管理员失败 登录名必须是字母',
      result: []
    };
  }
});

router.post('/updateauth', async (ctx) => {
  let {auth, id} = {...ctx.request.body};
  let auths = JSON.parse(auth);
  if (auth && id) {
    let userDoc = await Users.findOneAndUpdate({_id: id}, {$set: {auth: auths}});
    ctx.body = {
      code: 1,
      msg: '修改成功',
      result: userDoc
    };
  } else {
    ctx.body = {
      code: 10001,
      msg: '参数错误',
      result: []
    };
  }
});

function md5(value) {
  const k = "397633183_@LoveLsL..*()j+s+--mmm";
  value = value + k;
  return utility.md5(utility.md5(value));
}

module.exports = router
