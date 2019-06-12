const commentsModel = require('../models/commentsModel')

// 暴露对象
module.exports = {
  // 显示评论页面
  showCommentsPage(req, res) {
    res.render('comments', {
      isLogin: req.session.isLogin
    })
  },

  // 渲染评论页面数据
  getCommentsDataByPage(req,res){ 
    let {currentPage} = req.query
    currentPage = currentPage?currentPage: 1;
    
    commentsModel.getCommentsDataByPage(currentPage, (err,results)=>{
      if(err) return res.json({
        "code": 1,
        "msg": "查询数据失败"
      })
      res.json({
        "code": 0,
        "msg": "查询数据成功",
        "data": results[0],
        "totalPages": Math.ceil(results[1][0].totalCount/10)
      })
    })
  },

  // 通过ID删除文章数据
  delCommentsById(req,res){
    // 获取ID
    let {id} = req.query
    // 调用Model中的方法删除数据
    commentsModel.delCommentsById(id,result=>{
      if(result) return res.json({
        "code": 1,
        "msg": "删除评论失败"
      })
      res.json({
        "code": 0,
        "msg": "删除评论成功"
      })
    })
  },

  // 根据id更新评论状态为批准
  approvedCommentsById(req,res){
    // 获取id
    let {id} = req.query
    commentsModel.updateCommentsStatusById(id, 'approved', result=>{
      if(result) return res.json({
        "code": 1,
        "msg": "批准状态更新失败"
      })
      res.json({
        "code": 0,
        "msg": "批准状态更新成功"
      })
    })
  },

  // 根据id更新评论状态为拒绝
  rejectedCommentsById(req,res){
    // 获取id
    let {id} = req.query
      // 调用Model中的方法更新数据
    commentsModel.rejectedCommentsById(id,"rejected",result=>{
      if(result) return res.json({
        "code": 1,
        "msg": "拒绝状态更新失败"
      })
      res.json({
        "code": 0,
        "msg":"拒绝状态更新成功"
      })
    })
  }
}