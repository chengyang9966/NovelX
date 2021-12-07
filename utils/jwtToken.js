const e = require("express");
var jwt = require("jsonwebtoken");
const typeis = require("type-is");
function SignToken(params) {
  var token = jwt.sign({ id: params }, process.env.secret, { expiresIn: "2d" });
  return token;
}
function VerifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, process.env.secret);
    console.log(
      "🚀 ~ file: jwtToken.js ~ line 11 ~ VerifyToken ~ decodedToken",
      decodedToken
    );
    const userid = decodedToken.id;
    if (typeis(req, "multipart/form-data")) {
      if (!req.params.userid && req.params.userid !== userid) {
        return res.status(405).json({
          message: "UnAuthorize User",
        });
      } else {
        req.userid = userid;
        req.token = SignToken(userid);
        next();
      }
    } else {
      if (req.method === "GET") {
        req.userid = userid;
        req.token = SignToken(userid);
        next();
      } else if (!req.body.userid && req.body.userid !== userid) {
        return res.status(405).json({
          message: "UnAuthorize User",
        });
      } else {
        req.userid = userid;
        req.token = SignToken(userid);
        next();
      }
    }
  } catch {
    res.status(401).json({
      message: "UnAuthorize User",
    });
  }
}
module.exports = {
  SignToken,
  Auth: VerifyToken,
};
