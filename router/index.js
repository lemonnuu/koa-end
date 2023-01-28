const Router = require('@koa/router')
const router = new Router({ prefix: '/api/v1' })
const imageController = require('../controller/image')
const sentenceController = require('../controller/sentence')
const userController = require('../controller/user')
const { registerValidate, loginValidate } = require('../middleware/userValdate')
const { verifyToken } = require('../utils/jwt')

// 图片模块
router.get('/images/list', verifyToken(false), imageController.list)
router.get('/images', verifyToken(false), imageController.index)
router.get('/images/qq/:qq', verifyToken(false), imageController.qq)

// 句子模块
router.get('/sentence', verifyToken(false), sentenceController.index)

// 用户模块
router.get('/users/:userId', userController.index)
router.post('/users/register', registerValidate, userController.register)
router.post('/users/login', loginValidate, userController.login)

module.exports = router
