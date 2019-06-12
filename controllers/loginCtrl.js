// 引入加密内置模块
const crypto = require('crypto')

// 引入模块
const loginModel = require('../models/loginModel')

// 暴露对象
module.exports = {
  showLoginPage(req, res) {
    res.render('login', {})
  },
  login(req, res) {
    // 接收前端发送过来的数据
    let user = req.body
    // 对密码进行sha256加密
    let userPwd = crypto.createHash("sha256").update(user.password).digest("hex")
    // 将加密过后的密码重新赋值给user信息对象
    user.password = userPwd
    console.log(user.password)
    loginModel.login(user, (err, result) => {
      if (err) return res.json({
        "code": 1,
        "msg": "登录失败"
      })
      if (!result.length) {
        res.json({
          "code": 2,
          "msg": "账号或密码错误"
        })
      }
      if (result.length) {
        // 进行sessionID的设置
        req.session.isLogin = true;
        console.log("result[0]的数据为:",result[0]);
        
        req.session.user = result[0]
        res.json({
          "code": 0,
          "msg": "登录成功",
          "userinfo":result[0]
        })
      }
    })
  },
  loginout(req, res) {
    // 使用destroy方法来销毁之前session存储区中创建的session数据
    req.session.destroy(err => {
      if (err) return console.log(err.message)
      res.redirect('/login')
    })
  },  
}