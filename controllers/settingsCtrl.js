// 引入模块
const settingsModel = require('../models/settingsModel')

module.exports = {
  // 显示主页面(不带具体数据)
  showNavMenusPage(req,res){
    res.render('nav-menus', {isLogin: req.session.isLogin})
  },

  // 显示主页面数据
  getNavMenusData(req,res){
    settingsModel.getNavMenusData((err,result)=>{
      if(err) return res.json({
        "code": 1,
        "msg": "查询数据失败!"
      })
      res.json({
        "code" :0,
        "msg": "查询数据成功!",
        "data": JSON.parse(result[0].value)
      })
    })
  },
  
  // 增加导航项数据
  addNewNavMenus(req,res){
    // 接收客户端发送过来的数据
    let nav = req.body;
    settingsModel.addNewNavMenus(nav,result=>{
      if(result) return res.json({
        "code": 1,
        "msg": "增加数据失败!"
      })
      res.json({
        "code": 0,
        "msg": "增加数据成功!"
      })
    })
  },

  //根据索引删除导航项
  delNavMenusByIndex(req,res){
    // 接收客户端发送过来的索引
    let {index} = req.query
    settingsModel.delNavMenusByIndex(index, result=>{
      if(result) return res.json({
        "code": 1,
        "msg": "数据删除失败!"
      })
      res.json({
        "code": 0,
        "msg": "数据删除成功!"
      })
    })
  },

  //　显示轮播图
  showSlidesPage(req,res){
    res.render('slides', {isLogin: req.session.isLogin});
  },

  // 获取轮播图页面中的数据
  getSlidesData(req,res){
    settingsModel.getSlidesData((err,result)=>{
      if(err) return res.json({
        "code": 1,
        "msg": "查询数据失败!"
      })
      res.json({
        "code": 0,
        "msg": "查询数据成功!",
        "data": JSON.parse(result[0].value)
      })
    })
  },
  
  // 添加新的轮播项
  addNewSlides(req,res){
    // 接收浏览器客户端发送过来的数据
    let slides = req.body 
    settingsModel.addNewSlides(slides,result=>{
      if(result) return res.json({
        "code": 1,
        "msg": "添加失败!"
      })
      res.json({
        "code": 0,
        "msg": "添加成功!"
      })
    })
    
  },

  // 根据索引删除某项
  delSlidesByIndex(req,res){
    let {index} = req.query

    settingsModel.delSlidesByIndex(index,result=>{
      if(result) return res.json({
        "code": 1,
        "msg": "数据删除失败!"
      })
      res.json({
        "code": 0,
        "msg": "数据删除成功!"
      })
    })
  },

  // 显示设置页面
  showSettingsPage(req,res){
    console.log(req.session.user.avatar)
    settingsModel.getSettingsData((err,result)=>{
      if(err) return res.json({
        "code":1,
        "msg":"查询数据失败!"
      })
      res.render('settings',{
        isLogin: req.session.isLogin,
        user: req.session.user,
        site_logo: result[1].value, // 网站logo
        site_name: result[2].value,   // 网站名称
        site_description: result[3].value,   // 网站描述
        site_keywords: result[4].value,   // 网站关键字
        comment_status: result[6].value,   // 是否开启评论功能
        comment_reviewed: result[7].value,   // 是否经过人工批准
      })
    })
  },

  // 更新网站设置
  updateSettings(req,res){
    let obj = req.body
    obj.comment_status == 'on' ? obj.comment_status = 0 : obj.comment_status = 1   // 0开启，1不开启
    obj.comment_reviewed == 'on' ? obj.comment_reviewed = 0 : obj.comment_reviewed = 1    // 0经过人工，1不经过
    settingsModel.updateSettings(obj,result=>{
      if(result) return res.json({
        "code": 1,
        "msg": "更新数据失败!"
      })
      res.json({
        "code": 0,
        "msg": "更新数据成功!"
      })
    })
  }
}