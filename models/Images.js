 
  const sql=require('sql');
  sql.setDialect('postgres');
  let ImageModel=sql.define({
    name:'images',
    columns:[
      {name:'id',notNull:true,unique:true,primaryKey:true},
      'imageurl',
      'name',
      'type',
      {name:'userid',notNull:true}
    ]
  })


  module.exports=ImageModel