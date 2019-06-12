// 引入数据库连接模块
const conn = require('./baseDB')

module.exports = {
  // 使用软删除方式实现，这样方便以后的数据恢复和维护
  // 查找所有用户数据   
  getUserData(callback){
    let sql = "select * from users where isDel = 0"
    conn.query(sql,(err,results)=>{
      if(err) return callback(err)
      callback(null, results)
    })
  },
  addUserInfo(user,callback){
    var sql = "insert into users set ?"
    conn.query(sql,[user],(err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },
  // 根据用户ID来删除数据
  deleteUserById(id,callback){
    let sql = "update users set isDel = 1 where id = ?"
    conn.query(sql,[id],(err,results)=>{
      if(err) return callback(err)
      callback(err)
    })
  },
  editUserById(id, callback){
    var sql = "select * from users where id = ?"
    conn.query(sql,id,(err,results)=>{
      if(err) return callback(err)
      callback(null, results)
    })
  },
  updateUserInfo(user,callback){
    let id = user.id
    delete user.id
    console.log(user);
    var sql = "update users set ? where id = ?"
    conn.query(sql,[user,id],(err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },
  // 批量删除用户传入的数据
  delMoreUsers(ids,callback){
    let sql = "update users set isDel=1 where id in (?)"
    conn.query(sql,[ids], (err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },

  // 根据ID更新个人信息
  updateProfileInfoById(userInfo ,callback){
    // 获取id
    let {id} = userInfo

    // 删除id
    delete userInfo.id

    let sql = "update users set ? where id = ?"
    conn.query(sql, [userInfo, id], (err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },

   // 根据id进行更新密码
   updateProfilePasswordById(obj,callback){
    // 1. 获取发送过来的数据
    let {id,password} = obj

    // 2. 准备sql语句进行更新
    let sql = "update users set password = ? where id = ?"
    conn.query(sql, [password,id],(err,results)=>{
      if(err) return callback(err)

      callback(null)
    })
  }
}

