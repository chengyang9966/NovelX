var jwt = require('jsonwebtoken');

function SignToken(params) {
   var token= jwt.sign({ id:params},process.env.secret,{ expiresIn: '2d' })
    return  token
}
function VerifyToken(req,res,next){
  
      try {
        const token = req.headers["x-access-token"];
        const decodedToken = jwt.verify(token, process.env.secret);
        const userid = decodedToken.id;
        console.log('userid: ', userid);
        if (req.body.userid && req.body.userid !== userid) {
          console.log('req.body.userid: ', req.body.userid===userid);
          
            res.status(405).json({
              message:'UnAuthorize User'
            })
        } else {
          next();
        }
      } catch {
        res.status(401).json({
          message:'UnAuthorize User'
        })

    }
}
module.exports={
    SignToken,
    Auth:VerifyToken
}