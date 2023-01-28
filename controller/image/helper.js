const config = require('../../config/imagesConfig')
const { getBasicImage, getCosImage } = require('./getImage')

const customJudgeQuery = (ctx) => {
  const query = ctx.query
  // 1. 设置默认值
  query.category = query.category || config.defaultCategory
  query.format = query.format || config.defaultFormat
  query.count = Number(query.count || config.defaultCount)
  if (!config.usableCategory.includes(query.category)) {
    ctx.throw(400, `category 值无效, 请重新设置! (${JSON.stringify(config.usableCategory)})`)
  }
  if (!config.usableFormat.includes(query.format)) {
    ctx.throw(400, `format 值无效, 请重新设置! (${JSON.stringify(config.usableFormat)})`)
  }
  const maxCount = query.category === 'bing' ? 8 : config.maxCount
  if (!query.count || query.count < 0 || query.count > maxCount) {
    ctx.throw(400, `count 值无效, 请重新设置! (1-${maxCount})`)
  }
  // count 与 format 冲突判断
  if (query.format === 'image' && query.count > 1) {
    ctx.throw(400, `format 为 image 时只能返回一张图片!`)
  }

  if (
    query.category === 'random' ||
    query.category === 'landscape' ||
    query.category === 'cartoon' ||
    query.category === 'beauty'
  ) {
    if (query.terminal && !config.usableTerminal.includes(query.terminal)) {
      ctx.throw(400, `terminal 值无效, 请重新设置! (${JSON.stringify(config.usableTerminal)})`)
    }
  }
}

const getImage = async (ctx) => {
  const random = Math.random()
  ctx.query.terminal = random < 0.5 ? 'pc' : 'mobile'
  if (config.basicAPi.includes(ctx.query.category)) {
    return await getBasicImage(ctx)
  }
  if (config.cosAPi.includes(ctx.query.category)) {
    return await getCosImage(ctx)
  }
  if (ctx.query.category === 'random') {
    if (random < 0.25) {
      return await getCosImage(ctx)
    }
    return await getBasicImage(ctx)
  }
}

module.exports = {
  customJudgeQuery,
  getImage,
}
