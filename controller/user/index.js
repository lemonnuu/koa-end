const { User } = require('../../model')
const { createToken } = require('../../utils/jwt')

module.exports.index = async (ctx, next) => {
  const user = await User.findById(ctx.params.userId)
  ctx.body = user
}

// 用户注册
module.exports.register = async (ctx) => {
  const userModel = new User(ctx.request.body)
  const dbBack = await userModel.save()
  ctx.body = dbBack
}

// 用户登录
module.exports.login = async (ctx) => {
  var dbback = await User.findOne(ctx.request.body)
  if (!dbback) {
    return ctx.throw(402, '邮箱或者密码不正确')
  }
  var token = await createToken(dbback._doc)
  dbback._doc.token = token
  ctx.body = dbback._doc
}
