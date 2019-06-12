// 引入需要的模块
const categoriesModel = require('../models/categoriesModel')

// 向外暴露对象
module.exports = {
  // 返回主页面源代码
  showCategoriesPage(req, res) {
    // 渲染页面
    res.render('categories', {isLogin: req.session.isLogin})
  },
  // 返回主页面动态数据
  getCategoriesPageData(req, res) {
    categoriesModel.getCategoriesPageData((err, results) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询数据失败"
      })
      res.json({
        "code": 0,
        "msg": "查询数据成功",
        "data": results
      })
    })
  },
  // 返回增加分类目录后的数据
  addCategoriesData(req, res) {
    let categoriesData = req.body
    categoriesModel.addCategoriesData(categoriesData, results => {
      if (results) return res.json({
        "code": 1,
        "msg": "增加数据失败"
      })
      res.json({
        "code": 0,
        "msg": "增加数据成功"
      })
    })
  },
  // 返回删除分类目录后的数据
  delCategoriesData(req, res) {
    let {
      id
    } = req.query
    console.log(id);
    categoriesModel.delCategoriesData(id, results => {
      if (results) return res.json({
        "code": 1,
        "msg": "删除数据失败"
      })
      res.json({
        "code": 0,
        "msg": "删除数据成功"
      })
    })
  },
  // 返回通过ID查询的要编辑的数据
  editCategories(req, res) {
    let {
      id
    } = req.query
    categoriesModel.editCategories(id, (err, results) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询数据失败"
      })
      res.json({
        "code": 0,
        "msg": "查询数据成功",
        "data": results
      })
    })
  },
  // 返回更新后的数据
  updateCategoriesData(req, res) {
    let data = req.body
    categoriesModel.updateCategoriesData(data, results => {
      if (results) return res.json({
        "code": 1,
        "msg": "更新数据失败"
      })
      res.json({
        "code": 0,
        "msg": "更新数据成功"
      })
    })
  },
  delCategoriesByIds(req, res) {
    // 1. 接收传递过来的数据,调用model中的方法进行数据的操作
    var {id} = req.query;
    console.log("**********" + id);
    categoriesModel.delCategoriesByIds(id, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "批量删除失败"
      })

      res.json({
        "code": 0,
        "msg": "批量删除成功"
      })
    })
  }
}