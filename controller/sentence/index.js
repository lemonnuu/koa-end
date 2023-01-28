const superagent = require('superagent')
const sentenceConfig = require('../../config/sentenceConfig')

/** 毒鸡汤
 */
module.exports.index = async (ctx, next) => {
  const count = Number(ctx.query.count) || 1
  const promiseArr = []
  for (let i = 0; i < count; i++) {
    promiseArr.push(superagent.get(sentenceConfig.dujitang))
  }
  const res = (await Promise.allSettled(promiseArr)).map((item) => {
    let sentence = item.value.text
    if (item.status !== 'fulfilled') {
      sentence = '无'
    }
    return sentence
  })
  ctx.body = res
}
