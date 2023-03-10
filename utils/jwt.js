const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const tojwt = promisify(jwt.sign)
const verify = promisify(jwt.verify)

// 验证token
module.exports.verifyToken = function (required = true) {
  return async (ctx, next) => {
    let token = ctx.headers.authorization
    token = token ? token.split('Bearer ')[1] : null
    if (token) {
      try {
        const userInfo = await verify(token, 'mochi-koa')
        ctx.user = userInfo
        await next()
      } catch (error) {
        ctx.throw(402, error)
      }
    } else if (required) {
      ctx.throw(402, '无效的token')
    } else {
      await next()
    }
  }
}

// 生成token
module.exports.createToken = async (userInfo) => {
  const token = await tojwt({ userInfo }, 'mochi-koa', {
    expiresIn: 60 * 60 * 24,
  })
  return token
}
