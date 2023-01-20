const mongoose = require('mongoose')
const { mongoPath } = require('../config/default')
const mian = async () => {
  await mongoose.connect(mongoPath)
}

mian()
  .then((res) => {
    console.log('mongoDB 连接成功')
  })
  .catch((err) => {
    console.log(err)
  })

module.exports = {
  User: mongoose.model('User', require('./userModel')),
}
