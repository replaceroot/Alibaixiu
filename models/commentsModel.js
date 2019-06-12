const conn = require('./baseDB')

module.exports = {
  // 根据页码返回数据，如果没有页码默认显示第一页的10条数据
  getCommentsDataByPage(currentPage, callback){
    console.log("[+]Database i am comming...")
    let pageSize = 10
    let offset = (currentPage - 1) * pageSize
    let sql = 'select c.id,c.author,c.content,c.created,c.status,p.title from comments as c left join posts as p on c.post_id=p.id order by id desc limit ? offset ?;select count(*) as totalCount from comments';
    conn.query(sql,[pageSize, offset], (err,results)=>{ 
      if(err) return callback(err)
      callback(null, results)
    })
  },

  // 根据ID删除数据文章
  delCommentsById(id,callback){
    let sql = "delete from comments where id = ?"
    conn.query(sql,[id],(err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },

  //根据ID更新评论的批准状态
  updateCommentsStatusById(id,status,callback){
    let sql = "update comments set status = ? where id = ?"
    conn.query(sql,[status,id], (err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },

  // 根据ID更新评论的拒绝状态
  rejectedCommentsById(id,status,callback){
    let sql = "update comments set status = ? where id = ?"
    conn.query(sql,[status,id], (err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  }
}