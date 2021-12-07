 
  const sql=require('sql');
  sql.setDialect('postgres');
  let UserModel=sql.define({
    name:'users',
    columns:[
      {name:'id',notNull:true,unique:true,primaryKey:true},
      'fname',
      'lname',
      'email',
      'password',
      'isLogIn',
      {name:'roleid',notNull:true}
    ]
  })


  module.exports=UserModel