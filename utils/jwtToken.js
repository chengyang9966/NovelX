var jwt = require('jsonwebtoken');

function SignToken(params) {
   var token= jwt.sign({ id:params},process.env.secret,{ expiresIn: '2d' })
    return  token
}
function VerifyToken(req,res,next){
    console.log('req: ', req.headers);
    console.log('req: ', req.body);

      try {
        const token = req.headers.x-access-token;
        const decodedToken = jwt.verify(token, process.env.secret);
        const userid = decodedToken.id;
        if (req.body.userid && req.body.userid !== userid) {
            res.status(401).json({
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