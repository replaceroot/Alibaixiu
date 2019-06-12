// 调用自定义模块
const indexModel = require('../models/indexModel')

// 暴露模块
module.exports = {
  // 显示主页面
  showIndexPage(req,res){
    
    indexModel.getIndexPageData((err,result)=>{
      console.log(req.session.user);
      
      res.render('index', {
        isLogin: req.session.isLogin,
        user: req.session.user,
        postsCount: result[0][0].postsCount,
        draftedCount: result[1][0].draftedCount,
        categoriesCount: result[2][0].categoriesCount,
        commentCount: result[3][0].commentCount,
        heldCount: result[4][0].heldCount
      })
    })
    
  },
  
}