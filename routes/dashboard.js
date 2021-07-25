

module.exports=(req,res,next)=>{
    res.render('pages/home',{
        login:true
    });
};