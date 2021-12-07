const ComparePassword = require('../utils/password').ComparePassword;
const SignToken = require('../utils/jwtToken').SignToken;
const Query = require('../db').query;
const UserModel = require('../models/User');
const Login = async (app) => {
  app.post('/api/login', (req, res, next) => {
    const { email, password } = req.body;
    let QueryText = `SELECT email,password,id,isLogIn,roleid FROM users WHERE email=$1`;
    Query(QueryText, [email]).then((respone) => {
      if (respone && respone.length > 0) {
        respone[0].islogin
          ? res.status(400).json({
              message: 'User Being Login, Please Logout'
            })
          : ComparePassword(password, respone[0].password)
              .then((dataRespone) => {
                if (dataRespone) {
                  // Update IsLogIn Field to True
                  const values = `update users SET isLogIn=$1 where email=$2 RETURNING *`;
                  Query(values, [!respone[0].islogin, email])
                    .then((result) => {
                      res.status(200).json({
                        email: respone[0].email,
                        UserId: respone[0].id,
                        roleId: respone[0].roleid,
                        accessToken: SignToken(respone[0].id),
                        message: 'Login In Successfully'
                      });
                    })
                    .catch((err) => {
                      res.status(400).json({
                        message: 'Login In failed'
                      });
                    });
                } else {
                  res.status(400).json({
                    message: 'Wrong password or email address'
                  });
                }
              })
              .catch((error) => {
                if (error) {
                  res.status(400).json({
                    message: 'Login In failed'
                  });
                }
              });
      } else {
        res.status(400).json({
          message: 'User Not Found'
        });
      }
    });
  });

  app.post('/api/logout/:id', (req, res, next) => {
    const values = `update users SET islogin=$1 where id=$2 RETURNING *`;
    const userId = req.params.id;
    Query(values, [false, userId])
      .then((result) => {
        res.status(200).json({
          message: 'LogOut Successfully'
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: 'LogOut Failed'
        });
      });
  });
};

exports.Login = Login;
