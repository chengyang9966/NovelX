const express =require('express');
const router =express.Router();

router.get("/",(req,res,next)=>{

        res.status(200).redirect('/dashboard')
    
})

module.exports=router;