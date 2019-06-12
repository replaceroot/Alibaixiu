// 引入需要的模块
const conn = require('./baseDB')
const categoriesModel = require('./categoriesModel')
// 暴露对象
module.exports = {
  getCategoriesPageData(callback) {
    categoriesModel.getCategoriesPageData((err, results) => {
      if (err) return callback(err)
      callback(null, results)
    })
  },
  addNewPost(post, callback) {
    let sql = "insert into posts set ?";
    conn.query(sql, [post], (err, results) => {
      if (err) return callback(err)
      callback(null)
    })
  },
  // 获取所有文章页面中的真正所有的数据
  getAllPostsData(currentPage, callback) {
    // 1. 准备sql语句
    //  let sql = "select * from posts"
    let pageCount = 10 // 表示每页显示的条数
    // let currentPage = 1
    let offset = (currentPage -1) * pageCount // 表示起始的索引

    //  let sql = `select p.id,p.slug,p.title,p.status,p.created,u.nickname,c.name from posts as p LEFT JOIN users as u on p.user_id = u.id LEFT JOIN categories as c on p.category_id = c.id ORDER BY id desc limit 10 offset 0;select count(*) as totalCount from posts;`

    let sql = `select p.id,p.slug,p.title,p.status,p.created,u.nickname,c.name from posts as p LEFT JOIN users as u on p.user_id = u.id LEFT JOIN categories as c on p.category_id = c.id ORDER BY id desc limit ${pageCount} offset ${offset};select count(*) as totalCount from posts;`

    // 2. 调用方法查询数据
    conn.query(sql, (err, results) => {
      if (err) return callback(err)

      //  console.log(results);// 如果一次性执行了多条SQL语句,则results仍然是一个数组,数组里面存储着查询到的数据值
      //  return;
      callback(null, results)
    })
  },
  // 根据ID删除文章数据
  delPostById(id, callback){
    // 编写sql语句
    let sql = "delete from posts where id = ?"
    conn.query(sql,id,(err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },

  // 根据ID获取文章数据
  getPostsById(id,callback){
    let sql = "select * from posts where id = ?; select * from categories"
    conn.query(sql,[id], (err,results)=>{
      if(err) return callback(err)
      callback(null, results)
    })
  },

  // 根据ID更新文章数据
  updatePostsById(post, callback){
    let {id} = post;
    delete post.id;
    let sql = "update posts set ? where id = ?"

    // 调用方法更新数据
    conn.query(sql,[post,id], (err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  }
}