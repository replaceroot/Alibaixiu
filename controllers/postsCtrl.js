// 引入需要的模块
postsModel = require('../models/postsModel')

// 向外暴露对象
module.exports = {
  // 显示所有文章页面
  showPostsPager(req, res) {
    res.render('posts', {
      isLogin: req.session.isLogin,
      user: req.session.user,

    })
  },
  // 显示写文章页面数据
  showPostsaddPage(req, res) {
    postsModel.getCategoriesPageData((err, results) => {
      if (err) return res.send('404');
      res.render('post-add', {
        data: results,
        isLogin: req.session.isLogin
      })
    })

  },

  // 增加新文章
  addNewPost(req, res) {
    let post = req.body
    post.category_id = post.category // 添加category_id
    post.user_id = req.session.user.id // 添加用户id
    delete(post.category) //　删除不需要的属性
    // 调用Model中的方法添加文章
    postsModel.addNewPost(post, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "添加失败"
      })
      res.json({
        "code": 0,
        "msg": "添加文章成功"
      })
    })
  },

  // 获取所有文章页面数据
  getAllPostsData(req, res) {
    let currentPage  = req.query.currentPage
    currentPage = currentPage? currentPage : 1;
    // 调用Model方法获取所有数据
    postsModel.getAllPostsData(currentPage,(err, results) => {
      if (err) return res.json({
        "code": 1,
        "msg": "获取文章数据失败"
      })
      res.json({
        "code": 0,
        "msg": "获取文章数据成功",
        "data": results[0],
        "count": results[1][0].totalCount // 返回的总数量
      })
    })
  },

  // 根据ID删除某项数据
  delPostById(req,res){
    // 获取ID
    let {id} = req.query
    // 调用Model中的方法删除文章
    postsModel.delPostById(id,result=>{
      if(result) return res.json({
        "code": 1,
        "msg": "删除文章失败"
      })
      res.json({
        "code": 0,
        "msg": "删除文章成功"
      })
    })
  },

  // 根据ID渲染页面
  showEditPostsPage(req,res){
    let {id} =  req.query

    // 调用Model中的方法查询数据，使用后端渲染的方式来渲染页面
    postsModel.getPostsById(id,(err,result)=>{
      if(err) return res.render('404 Not Found');
      // 如果成功获取到了数据，就把结果渲染到页面
      console.log(result)
      res.render('editPosts',{isLogin: req.session.isLogin,  ...result[0][0], categories: result[1]})
    })
  },

  // 根据ID更新对应的文章
  updatePostsById(req,res){
    // 获取传递过来的数据
    let post = req.body
    console.log("浏览器客户端发送过来的post是: ",post)    
    // 修改提交过来的数据
    post.category_id = post.category
    post.user_id = req.session.user.id
    delete post.category

    // 调用Model中的方法来更新数据
    postsModel.updatePostsById(post, result=>{
      if(result) return res.json({
        "code": 1,
        "msg" : "文章更新失败"
      })
      res.json({
        "code": 0,
        "msg": "文章更新成功"
      })
    })
  }
}