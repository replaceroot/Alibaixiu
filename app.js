/* Author: Zhangbo */

// 引入内置模块
const express = require('express')
const fs = require('fs')
const path = require('path')
// 引入第三方模块
const bodyParser = require('body-parser')
const session = require('express-session')

// 创建实例对象
const app = express()
// 注册中间件 session  这里相当于给req增加了一个session方法
app.use(session({
  secret: 'this is a session secret', // 指定一个加密串
  resave: false, //是否强制写入存储区
  saveUninitialized: false, // 是否将未初始化的sessionsID响应给客户端
  cookie: {
    maxAge: 1000 * 60 * 50 //设置session过期时间为50分钟
  }
}))

// 注册body-parser中间件
app.use(bodyParser.urlencoded({
  extended: false
}))


// 设置模版引擎以及默认文件夹
app.set('view engine', 'ejs')
app.set('views', './views')

// 托管静态资源
app.use('/assets', express.static('assets'))
app.use('/static', express.static('static'))



// 开启服务器并监听8080端口
app.listen(8080, () => {
  console.log("Node.js server is running at:http://127.0.0.1:8080")
})


fs.readdir(path.join(__dirname, "./routers"), (err, files) => {
  if (err) {
    return console.log(err.message)
  }
  files.forEach(item => {
    app.use(require(`./routers/${item}`));
  })
})