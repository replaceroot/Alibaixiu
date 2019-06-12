// 引入需要的模块
const formidable = require('formidable')

module.exports = {
  // 文件上传接口，接收用户上传的图片
  uploadFile(req,res){
    // 1. 先创建一个formidable对象
    let form = new formidable.IncomingForm()

    // 2. 设置上传过来的字符串内容编码方式
    // formidable不但可以接收上传过来的文件，还可以接收上传过来的字符串数据
    form.encoding = 'utf-8';

    // 3.设置图片上传过来的存储路径
    form.uploadDir = './static/uploads';

    // 4.保留上传过来的图片和后缀名
    form.keepExtensions = true;

    // 5.设置上传字段的大小，其实就是设置键值对的大小
    form.maxFieldsSize = 20 * 1024 * 1024;

    // 6.设置上传文件的大小
    form.maxFileSize = 200 * 1024 * 1024;
    
    // 7.设置上传字段的对数
    form.maxFields = 1000;    // 例如：name=zhangbo&age=20&...

    // 8.调用parse方法来接收上传过来的数据
    form.parse(req,function(err, fields, files){
      if(err) return res.json({
        "code": 1,
        "msg": "上传失败"
      })
      // formidable这个模块为了避免上传过来的文件重名，会将上传过来的文件进行随机重命名
      res.json({
        "code": 0,
        "msg": "上传成功",
        "src": files.avatar.path
      })
    })
  }
}