// 引入模块
const express = require('express')
const loginCtrl = require('../controllers/loginCtrl')
const router = express.Router()

router.get('/login', loginCtrl.showLoginPage)
  .post('/login', loginCtrl.login)
  .get('/loginout', loginCtrl.loginout)

// 暴露对象
module.exports = router