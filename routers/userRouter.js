const express = require('express')
const userCtrl = require('../controllers/userCtrl')
const router = express.Router()

// 路由的简写方法
router
  .get('/users', userCtrl.showUsersPage)

  .get('/getUserData', userCtrl.getUserData)

  .post('/addUseInfo', userCtrl.addUseInfo)

  .get('/btnDel', userCtrl.deleteUserById)

  .get('/editUserById', userCtrl.editUserById)

  .post('/updateUserInfo', userCtrl.updateUserInfo)

  .get('/delMoreUsers', userCtrl.delMoreUsers)

  .get('/profile', userCtrl.showProfilePage)

  .post('/uploadfileInfo', userCtrl.updateProfileInfoById)

  .get('/passwordReset', userCtrl.showPasswordResetPage)
  
  .post('/validateOldPassword', userCtrl.validateOldPasswordById)

  .post('/updateProfilePassword', userCtrl.updateProfilePasswordById)
module.exports = router