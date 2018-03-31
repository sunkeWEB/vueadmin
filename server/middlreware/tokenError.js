const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret = '__@#$%^?.397633183@__LOVE__';

/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    try {
      // 获取jwt
      const token = ctx.header.authorization;
      if (token) {
        try {
          // 解密payload，获取用户名和ID
          payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
          ctx.body = {
            code: 1,
            msg: '请求地址不存在'
          };
        } catch (err) {
          console.log('token verify fail111: ', err)
        }
      }
      await next();
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          code: 0,
          mag: 'token失效 认证失败'
        };
      } else {
        err.status = 404;
        ctx.body = {
          code: 0,
          msg: '404',
          data: err
        };
      }
    }
  }
}
