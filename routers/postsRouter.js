// 引入express模块
const express = require('express')
const postsCtrl = require('../controllers/postsCtrl')
const router = express.Router()

router.get('/posts', postsCtrl.showPostsPager)
  .get('/post-add', postsCtrl.showPostsaddPage)
  .post('/addNewPost', postsCtrl.addNewPost)
  .get('/getAllPostsData', postsCtrl.getAllPostsData)
  // .get('/getPaginationData', postsCtrl.getPaginationDataByCurrentPage)
  .get('/getPaginationData', postsCtrl.getAllPostsData)
  .get('/delPost', postsCtrl.delPostById)
  .get('/editPosts', postsCtrl.showEditPostsPage)
  .post('/updatePosts', postsCtrl.updatePostsById)
module.exports = router