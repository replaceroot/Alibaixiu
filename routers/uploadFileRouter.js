// 引入需要的模块
const express = require('express')
const uploadFileCtrl = require('../controllers/uploadFileCtrl.js')

const router = express.Router()

router.post('/uploadFile', uploadFileCtrl.uploadFile)



// 暴露对象
module.exports = router