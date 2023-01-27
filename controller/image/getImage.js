const superagent = require('superagent')
const config = require('../../config/imagesConfig')

const getBasicImage = async (ctx) => {
  let fl = 'suiji' // 类别: meizi | dongman | fengjing | suiji
  switch (ctx.query.category) {
    case 'random':
      fl = 'suiji'
      break
    case 'landscape':
      fl = 'fengjing'
      break
    case 'beauty':
      fl = 'meizi'
      break
    case 'cartoon':
      fl = 'dongman'
      break
  }
  const zd = ctx.query.terminal // 终端: mobile|pc|zsy
  let gs = 'json' // 格式: json | images
  if (ctx.query.format === 'image') {
    gs = 'images'
  }
  const query = { fl, zd, gs }
  const res = await superagent.get(config.imagesPath.basic).query(query)
  let data = null
  if (gs === 'images') {
    data = res.body
    ctx.set('Content-type', 'image/jpeg')
  } else {
    data = JSON.parse(res.text)
  }
  return data
}

const getCosImage = async (ctx) => {
  let r = 'json' // 格式: json | jsonpro | img
  if (ctx.query.format === 'image') {
    r = 'img'
  }
  const res = await superagent.get(config.imagesPath.cos).query({ return: r })
  let data = null
  if (r === 'img') {
    data = res.body
    ctx.set('Content-type', 'image/jpeg')
  } else {
    data = JSON.parse(res.text)
    try {
      data.detail = data.imgurl.split('/imgapi.cn/')[1].split('/')[0]
    } catch (error) {
      data.detail = ''
    }
  }
  return data
}

const getBingImage = async (ctx, day) => {
  let info = true
  if (ctx.query.format === 'image') {
    info = false
  }
  const query = { info }
  if (day && typeof day === 'number') {
    query.day = day
  }
  const res = await superagent.get(config.imagesPath.bing).query(query)
  let data = null
  if (!info) {
    data = res.body
    ctx.set('Content-type', 'image/jpeg')
  } else {
    const arr = res.text.split(',')
    const detail = arr[0].split('title:')[1]
    const imgurl = arr[1].split('url:')[1]
    const temp = imgurl.split('_')
    const widthAndHeight = temp[temp.length - 1].split('.')[0].split('x')
    data = {
      detail,
      imgurl,
      width: widthAndHeight[0],
      height: widthAndHeight[1],
    }
  }
  return data
}

module.exports = {
  getBasicImage,
  getCosImage,
  getBingImage,
}
