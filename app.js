const Koa = require('koa')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const imagesRouter = require('./router')

const app = new Koa()

app.on('error', (err, ctx) => {
  console.log(err)
  ctx.body = 'Server Error' + err
})

app.use(cors()).use(koaBody()).use(imagesRouter.routes())

app.listen(3000, () => {
  console.log('服务启动在 http://127.0.0.1:3000')
})
