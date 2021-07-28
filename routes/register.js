const SignToken=require('../utils/jwtToken').SignToken
const HashPassword=require('../utils/password').HashPassword
const Query=require('../db').query;
const UserModel=require('../models/User')

const Register=function(app){
  app.post('/api/registerUser',(req,res,next)=>{ 
    let temp=[req.body];
    console.log('temp: ', temp);

    Query('SELECT * FROM users WHERE email=$1',[req.body.email]).then(respone=>{
        if(respone.length>0){
          res.status(406).json({message:'duplicate Email'})
        }else{
         HashPassword(req.body.password).then(result=>{
             temp[0].password=result
             console.log('result: ', temp);

             const values=UserModel.insert(temp).returning(UserModel.id).toQuery();
             Query(values).then(respones=>{
               console.log('respones: ', respones);
               res.status(201).json({
                email:req.body.email,
                UserId:respones[0],
                accessToken:SignToken(respones),
                message:'Created Account Successfully'})
             })

         })
          
          
        }
      })
 });


}

exports.Register = Register;











// module.exports={register:(req,res,next)=>{
//     res.status(200).redirect('/register')
// },
// registerPage:(req,res,next)=>{  res.render('pages/register')},

// registerUser:
// }