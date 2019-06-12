const express = require('express')
const commentCtrl = require('../controllers/commentCtrl')
const router = express.Router()

router.get('/comments', commentCtrl.showCommentsPage)
.get('/getCommentsData', commentCtrl.getCommentsDataByPage)
.get('/getCommentsDataByPage', commentCtrl.getCommentsDataByPage)
.get('/delCommentsById', commentCtrl.delCommentsById)
.get('/approvedComments', commentCtrl.approvedCommentsById)
.get('/rejectedComments', commentCtrl.rejectedCommentsById)
// 暴露对象
module.exports = router