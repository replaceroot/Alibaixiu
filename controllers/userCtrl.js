// 引入加密数据的内置模块
const crypto = require('crypto')

// 引入数据库交互模块
const userModel = require('../models/userModel')
module.exports = {
  showUsersPage(req, res) {
    res.render('users', {
      isLogin: req.session.isLogin
    })
  },
  getUserData(req, res) {
    userModel.getUserData((err, result) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询失败"
      })
      res.json({
        "code": 0,
        "msg": "查询成功",
        "data": result
      })
    })
  },
  addUseInfo(req, res) {
    // 接收浏览器发送过来的post请求并转换成对象
    let user = req.body;
    // 获取用户注册时的密码并进行sha256的加密
    let userPwd = crypto.createHash("sha256").update(user.password).digest("hex");
    // 将加密后的密码重新赋值给user对象
    user.password = userPwd
    console.log("加密后的密码: " + userPwd)
    // 添加账户状态为激活
    user.status = "激活"

    //添加默认图片
    user.avatar = '/static/uploads/avatar.jpg'

    // 调用Model方法添加数据
    userModel.addUserInfo(user, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "添加数据错误"
      })
      res.json({
        "code": 0,
        "msg": "添加数据成功"
      })
    })
  },
  deleteUserById(req, res) {
    // 获取浏览器发送过来的ID
    var id = req.query.id
    userModel.deleteUserById(id, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "删除数据失败"
      })
      res.json({
        "code": 0,
        "msg": "删除数据成功"
      })
    })
  },
  editUserById(req, res) {
    // 获取id
    let {
      id
    } = req.query

    userModel.editUserById(id, (err, result) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询数据失败"
      })
      res.json({
        "code": 0,
        "msg": "查询数据成功",
        "data": result
      })
    })
  },
  updateUserInfo(req, res) {
    console.log(req.body)
    let user = req.body
    userModel.updateUserInfo(user, result => {
      if (result) return res.json({
        "code": 1,
        "meg": "更新失败"
      })
      res.json({
        "code": 0,
        "msg": "更新成功"
      })
    })
  },
  // 批量删除功能
  delMoreUsers(req, res) {
    let ids = req.query.id
    userModel.delMoreUsers(ids, results => {
      if (results) return res.json({
        "code": 1,
        "msg": "删除失败"
      })
      res.json({
        "code": 0,
        "msg": "删除成功",
      })
    })
  },
  // 显示个人中心页面
  showProfilePage(req, res) {
    let {
      isLogin
    } = req.session
    let {
      id
    } = req.session.user
    userModel.editUserById(id, (err, result) => {
      if (err) return res.send('404')
      res.render('profile', {
        isLogin,
        ...result[0]
      })
    })
  },
  // 用户信息更新接口，更新用户的信息到数据库
  updateProfileInfoById(req, res) {

    // 注意：能简写成一行的绝对不要写成多行，太low了
    userModel.updateProfileInfoById(req.body, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "更新失败!"
      })
      res.json({
        "code": 0,
        "msg": "更新成功!"
      })
    })
  },

  // 渲染更新密码页面
  showPasswordResetPage(req, res) {
    res.render('password-reset', {isLogin: req.session.isLogin})
  },
  // 验证旧密码
  validateOldPasswordById(req, res) {
    let {
      id,
      password
    } = req.body

    userModel.editUserById(id, (err, result) => {
      if (err) return res.json({
        "code": 2,
        "msg": "服务器端错误"
      })

      if (result[0].password == password) {
        res.json({
          "code": 0,
          "msg": "旧密码是正确的"
        })
      } else {
        res.json({
          "code": 1,
          "msg": "旧密码不正确"
        })
      }
    })
  },
  // 根据id进行更新密码
  updateProfilePasswordById(req, res) {
    // 1. 接收传递过来的数据,并调用model中的方法
    // req.body 
    // let obj = req.body;
    // usersModel.updateProfilePasswordById(obj,)
    req.body.password = crypto.createHash('sha256').update(req.body.password).digest("hex");
    userModel.updateProfilePasswordById(req.body, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "密码更新失败"
      })

      res.json({
        "code": 0,
        "msg": "密码更新成功"
      })
    })
  }
}