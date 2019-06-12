// 引入模块
const conn = require('./baseDB')

// 暴露对象
module.exports = {
  // 获取导航项默认数据
  getNavMenusData(callback){
    let sql =  "select `value` from options where `key` = 'nav_menus'";
    conn.query(sql,(err,results)=>{
      if(err) return callback(err)
      callback(null, results)
    })
  },
  
  // 增加导航项数据
  addNewNavMenus(nav,callback){
    // 先把导航项的数据全部查出来
    this.getNavMenusData((err,results)=>{
      if(err) return callback(err)
      // 查询出来的数据是一个数组,数组里面是对象,对象有一个属性是value,value的值是一个字符串数组对象
      // 将字符串数组对象进行转换成数组对象
      let arr= JSON.parse(results[0].value)
      arr.push(nav);    // 追加客户端发送过来的数据到数组里面
      let str = JSON.stringify(arr)   // 将数组对象转换成字符串数组对象
      let sql = "update options set `value` = ? where `key` = 'nav_menus';"
      conn.query(sql,[str],(err,results)=>{
        if(err) return callback(err)
        callback(null, results)
      })
      return
    })
  },

  // 根据索引删除导航项
  delNavMenusByIndex(index, callback){
    this.getNavMenusData((err,results)=>{
      if(err) return callback(err)

      let arr = JSON.parse(results[0].value)
      arr.some((item, ind)=>{
        if (ind == index){
          arr.splice(ind,1)   // 删除索引所对应的数据
          return true;  // 阻止向下循环
        }
      })
      let str = JSON.stringify(arr)
      let sql = "update options set `value` = ? where `key` = 'nav_menus';"
      conn.query(sql,[str],(err,results)=>{
        if(err) return callback(err)
        callback(null)
      })
    })
  },

  // 获取轮播图页面中的数据
  getSlidesData(callback){
    let sql = "select `value` from options where `key` = 'home_slides';"
    conn.query(sql,(err,results)=>{
      if(err) return callback(err)
      callback(null, results)
    })
  },

  // 添加新的轮播图项
  addNewSlides(slides,callback){
    this.getSlidesData((err,data)=>{
      if(err) return callback(err)
      let arr = JSON.parse(data[0].value)
      arr.push(slides)
      this.updateValueInfoByParams(arr,'home_slides',callback)
    })
  },

  // 根据索引删除轮播图项
  delSlidesByIndex(index,callback){
    this.getSlidesData((err,results)=>{
      if(err) return callback(err)
      
      // 将查询到的数据转换成数组
      let arr = JSON.parse(results[0].value)
      // 根据索引进行删除
      arr.splice(index,1)

      // 调用方法更新回数据库
      this.updateValueInfoByParams(arr,'home_slides',callback)
    })
  },

  // 封装一个更新value中的数据的函数
  updateValueInfoByParams(arr,key,callback){
    // 转换成string
    let str = JSON.stringify(arr)
    let sql = "update options set `value` = ? where `key` = ?;"
    conn.query(sql,[str,key],(err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  },

  // 获取网站设置页面中的数据
  getSettingsData(callback){
    let sql = "select * from options where id < 9"

    conn.query(sql,(err,results)=>{
      if(err) return  callback(err)
      callback(null, results)
    })
  },

  // 更新网站设置
  updateSettings(obj,callback){
    let sql = ''
    //　使用循环的方式来生成要执行的多条sql语句
    for(let key in obj){
      // 最终效果: "update options set `value` = '"+ obj[key] +"'  where `key` = '"+ key +"';"
      if(key=='site_logo'){
        // 使用正则表达式全局匹配单个\(第一个\用来转义)并替换成/,这样数据库就不会过滤掉图片的路径了
        obj[key] = obj[key].replace(/\\/g, '/')
      }
      sql += 'update options set `value` = "'+obj[key]+'" where `key` = "'+key+'";'
    }
    console.log(sql);
    conn.query(sql,(err,results)=>{
      if(err) return callback(err)
      callback(null)
    })
  }
}