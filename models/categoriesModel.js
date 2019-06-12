// 引入需要的模块
const conn = require('./baseDB')

module.exports = {
  getCategoriesPageData(callback){
    let sql = "select * from categories where isDel = 0"
    conn.query(sql, (err,results)=>{
      if(err) return callback(err)
      callback(null, results)
    })
  },

  addCategoriesData(categoriesData, callback){
    let sql = "insert into categories set ?"
    conn.query(sql,[categoriesData],(err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },

  delCategoriesData(id,callback){
    let sql = "update categories set isDel = 1 where id = ?"
    conn.query(sql,id,(err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },

  editCategories(id,callback){
    let sql = "select * from categories where id = ?"
    conn.query(sql, id, (err,results)=>{
      if(err) return callback(err)
      callback(null, results)
    })
  },
  updateCategoriesData(data,callback){
    console.log(data);
    let id = data.id
    delete data.id
    let sql = "update categories set ? where id = ?"
    conn.query(sql,[data,id],(err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },
  delCategoriesByIds(id,callback){
    // 使用参数化的方式来批量删除
    console.log(id);
    let sql = "update categories set isDel = 1 where id in (?)"
    conn.query(sql,[id],(err,results)=>{
      if(err) return callback(err)

      callback(null)
    })
  }
}