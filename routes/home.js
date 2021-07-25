var checkInput =require('../utils/checkInputLogin').checkInput

module.exports=(req,res,next)=>{
    res.render('pages/home',{
        login:false,
        helper:checkInput
    });
};