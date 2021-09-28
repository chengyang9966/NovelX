const ComparePassword=require('../utils/password').ComparePassword
const SignToken=require('../utils/jwtToken').SignToken
const Query=require('../db').query;
const Login=async(app)=>{
  app.post('/api/login',(req,res,next)=>{
    const {email,password}=req.body
       let QueryText=`SELECT email,password,id FROM users WHERE email=$1`
    Query(QueryText,[email]).then(respone=>{
       if(respone&&respone.length>0){
           ComparePassword(password,respone[0].password).then((dataRespone)=>{
             if(dataRespone){  
               res.status(200).json({
                email:respone[0].email,
                UserId:respone[0].id,
                accessToken: SignToken(respone[0].id),
                message:'Login In Successfully'})
             }else{ res.status(400).json({
               message:'Login In failed'})
             }
           }).then(error=>{
             if(error){
               res.status(400).json({
                 message:'Login In failed'})
               }
             })
               
       }else{
         res.status(400).json({
           message:'User Not Found'
         })
       }
   
     })
   
   
   })
}

exports.Login=Login;