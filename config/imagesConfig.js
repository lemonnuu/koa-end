const imagesPath = {
  // 接口文档 : https://imgapi.cn/wiki.html
  basic: 'https://imgapi.cn/api.php', // 真人、动漫、风景
  cos: 'https://imgapi.cn/cos.php', // cos
  bing: 'https://imgapi.cn/bing.php', // 每日 bing 图
  qqInfo: 'https://api.usuuu.com/qq/',
  qq: 'https://imgapi.cn/qq.php', // qq 头像
}

module.exports = {
  maxCount: 20,
  defaultCount: 1,
  usableCategory: ['random', 'landscape', 'cartoon', 'beauty', 'cos', 'bing'],
  defaultCategory: 'random',
  usableFormat: ['json', 'image'],
  defaultFormat: 'image',
  usableTerminal: ['pc', 'mobile', 'zsy'],
  defaultTerminal: () => (Math.random() < 0.5 ? 'pc' : 'mobile'),
  basicAPi: ['landscape', 'cartoon', 'beauty'],
  cosAPi: ['cos'],
  bingAPi: ['bing'],
  imagesPath,
}
