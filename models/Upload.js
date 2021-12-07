 
  const sql=require('sql');
  sql.setDialect('postgres');
  let UploadModel=sql.define({
    name:'uploads',
    columns:[
      {name:'id',notNull:true,unique:true,primaryKey:true},
      'type',
      'data',
    ]
  })


  module.exports=UploadModel