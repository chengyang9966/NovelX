const SignToken=require('../utils/jwtToken').SignToken
const Auth=require('../utils/jwtToken').Auth
const HashPassword=require('../utils/password').HashPassword
const Query=require('../db').query;
const SendEmail=require('../services/Email').SendEmail
const UserModel=require('../models/User')

const ForgetPassword=function(app){
    app.post('/api/forgetpassword',(req,res)=>{
        Query('SELECT email,id FROM users WHERE email=$1',[req.body.email]).then(respone=>{
            if(respone.length>0){
               let result= SignToken(respone[0].id)
               console.log('result: ', respone);

                        const link = `${process.env.CLIENT_URL}/passwordReset?token=${result}&id=${respone[0].id}`;
                        SendEmail({
                            from:' yang826066@gmail.com',
                            to:req.body.email,
                            subject:'Reset Password Request',
                            text:`Please click on the link to reset password ${link}`
                        },
                        Query('Update users SET resetpassword=true WHERE email=$1',[req.body.email]).then(responeQuery=>{
                            console.log('responeQuery: ', responeQuery);
                            res.status(200).json({
                                message:'Reset Email Suceess'
                            })
                        })
                        )

              }else{
                res.status(406).json({message:'User Not Found'})
              }

        })

    })

    app.post('/api/resetpassword',Auth,(req,res)=>{
        let {email,password}=req.body
        Query('SELECT resetpassword FROM users WHERE  email=$1',[email]).then(respone=>{
            if(respone[0].resetpassword==true){
                HashPassword(password).then(responses=>{
        
                    Query('UPDATE users SET password=$1,resetpassword=$2 where email=$3',[responses,false,email]).then(respone=>{
                        res.status(200).json({
                            message:'Password Change Successfully'
                        })
                    }).catch(err=>
                        res.status(400).json({message:'Change Password Failed'})
                    )
                })

            }else{
                res.status(400).json({message:'Linked Expire'})
            }
        })
    })
};




exports.ForgetPassword=ForgetPassword;