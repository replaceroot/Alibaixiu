// 引入核心模块
const mysql = require('mysql')
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'replaceroot.1234',
  database: 'baixiu32',
  dateStrings:true,     // 将数据库中的时间以字符串的类型来读取并返回,不要改成javascript Date类型
  multipleStatements:true  //  允许query方法一次性使用多条SQL语句 
})

// 链接数据库
conn.connect()

module.exports = conn