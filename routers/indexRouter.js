/* 路由只负责判断路径，调用方法，不负责业务逻辑 */

// 引入核心模块
const express = require('express')
// 引入第三方模块

// 引入自定义模块
const indexCtrl = require('../controllers/indexCtrl')

// 实例化路由对象
const router = express.Router()

// 判断路径并路由到正确的路径
router.get('/', (req,res)=>{
  // 调用控制器中的方法渲染页面
  indexCtrl.showIndexPage(req,res)
})

// 暴露对象
module.exports = router
