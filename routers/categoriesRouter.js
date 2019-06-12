// 引入需要的模块
const express = require('express')

const categoriesCtrl = require('../controllers/categoriesCtrl')
const router = express.Router()


// 添加路由路径
// 渲染分类目录页面
router.get('/categories', categoriesCtrl.showCategoriesPage)


// 获取分类目录页面数据并渲染
.get('/getCategoriesPageData', categoriesCtrl.getCategoriesPageData)

// 添加新的分类目录数据
.post('/addCategoriesData', categoriesCtrl.addCategoriesData)

.get('/delCategoriesData', categoriesCtrl.delCategoriesData)

.get('/editCategories', categoriesCtrl.editCategories)

.post('/updateCategoriesData', categoriesCtrl.updateCategoriesData)

.get('/delCategoriesByIds', categoriesCtrl.delCategoriesByIds)
// 向外暴露对象
module.exports = router