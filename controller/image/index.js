const superagent = require('superagent')
const { getBingImage } = require('./getImage')
const helper = require('./helper')

module.exports.index = async (ctx, next) => {
  // 1. 检查传入的 query 是否符合标准
  helper.customJudgeQuery(ctx)
  // 2. 调用接口
  const query = ctx.query
  const imgPromiseArr = []
  if (query.category === 'bing') {
    for (let i = 0; i < query.count; i++) {
      imgPromiseArr.push(getBingImage(ctx, i))
    }
  } else {
    for (let i = 0; i < query.count; i++) {
      imgPromiseArr.push(helper.getImage(ctx))
    }
  }
  const res = await Promise.allSettled(imgPromiseArr)
  let body = {}
  if (res.length === 1) {
    body = res[0].value
  } else if (res.length > 1) {
    body = []
    res.forEach((item) => {
      if (item.status === 'fulfilled' && item.value && item.value.width && item.value.height) {
        body.push(item.value)
      }
    })
  }
  ctx.body = body
}

// const dealwithBasic = async (ctx) => {
//   const query = {
//     fl: ctx.query.fl || 'suiji', // 类别: meizi | dongman | fengjing | suiji
//     zd: ctx.query.zd || 'pc', // 终端: mobile|pc|zsy
//     gs: ctx.query.gs || 'json', // 格式: json | images
//   }
//   const res = await superagent.get(imagesPath.basic).query(query)
//   let data = null
//   if (query.gs === 'images') {
//     data = res.body
//     ctx.set('Content-type', 'image/jpeg')
//   } else {
//     data = JSON.parse(res.text)
//   }
//   return data
// }

// const dealwithCos = async (ctx) => {
//   const query = {
//     return: ctx.query.return || 'json', // 格式: json | jsonpro | img
//   }
//   const res = await superagent.get(imagesPath.cos).query(query)
//   let data = null
//   if (query.return === 'img') {
//     data = res.body
//     ctx.set('Content-type', 'image/jpeg')
//   } else {
//     data = JSON.parse(res.text)
//   }
//   return data
// }

// module.exports.index = async (ctx, next) => {
//   // 1. 根据 type 字段选择使用基础 URL, 默认 basic
//   const type = ctx.query.type || 'basic'
//   if (!imagesPath[type]) ctx.throw(400, 'type 值无效')
//   // 2. 根据 num 字段控制图片的张数, 默认为 8, 最大值为 20
//   let num = Number(ctx.query.num || imagesNumber.default)
//   if (!num || num > imagesNumber.max) ctx.throw(400, 'num 值无效')

//   // 根据 type 值进行不同处理, 这里就不耦合了, 每个不一样
//   switch (type) {
//     case 'basic': {
//       // 如果 gs 为 images 则不支持多张图片
//       if (ctx.query.gs === 'images' && ctx.query.num > 1) ctx.throw(400, 'num 值与 gs 值冲突')
//       if (num <= 1) {
//         return (ctx.body = await dealwithBasic(ctx))
//       }
//       const fetchPromiseArr = []
//       for (let i = 0; i < num; i++) {
//         fetchPromiseArr.push(dealwithBasic(ctx))
//       }
//       const imgInfoArr = await Promise.allSettled(fetchPromiseArr)
//       const res = []
//       imgInfoArr.forEach((item) => {
//         if (item.value && item.value.width && item.value.height) res.push(item.value)
//       })
//       ctx.body = res
//       break
//     }
//     case 'cos': {
//       // 如果 return 为 img 则不支持多张图片
//       if (ctx.query.return === 'img' && ctx.query.num > 1) ctx.throw(400, 'num 值与 return 值冲突')
//       if (num <= 1) {
//         return (ctx.body = await dealwithCos(ctx))
//       }
//       const fetchPromiseArr = []
//       for (let i = 0; i < num; i++) {
//         fetchPromiseArr.push(dealwithCos(ctx))
//       }
//       const imgInfoArr = await Promise.allSettled(fetchPromiseArr)
//       const res = []
//       imgInfoArr.forEach((item) => {
//         if (item.value && item.value.width && item.value.height) res.push(item.value)
//       })
//       console.log(res.length)
//       ctx.body = res
//       break
//     }
//     case 'bing':
//       break

//     default:
//       break
//   }

//   // ctx.body = 'jel'

//   // console.log(ctx.query)
//   // const res = await superagent.get('https://imgapi.cn/cos.php').query({ return: 'json' })
//   // const data = JSON.parse(res.text)
//   // console.log(data)
//   // const imgUrl = encodeURI(data.imgurl || data.imgUrl)
//   // console.log(imgUrl)
//   // const imgSource = await superagent.get(imgUrl)
//   // const imgBase64 = 'data:image/png;base64,' + bufferToBase64(imgSource.body)
//   // ctx.body = imgBase64
// }
