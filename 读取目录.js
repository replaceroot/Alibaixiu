const fs = require('fs');

fs.readdir(__dirname + "\\baixiu01\\routers", (err,files)=>{
  if(err){
    return console.log("err");
  }
  console.log(files);
  console.log(typeof files);
  console.log(__dirname + "\\routers")
/*   files.forEach( function(item,index){
    console.log(item,index);
  }) */
})