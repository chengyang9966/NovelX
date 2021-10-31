const Query = require("../db").query;
const Auth = require("../utils/jwtToken").Auth;
const ACL = function (app) {
  app.get("/api/getacl/:roleid", Auth, (req, res, next) => {
    Query(
      `SELECT menuname,canviewtask,candeletetask,canaddtask from aclpermission a
        WHERE a.roleid=$1`,
      [req.params.roleid]
    )
      .then((respone) => {
        if (respone.length > 0) {
          res.status(200).json(respone);
        } else {
          res.status(400).json({ message: "ACL not found" });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};

exports.ACL = ACL;
