const Query = require('../db').query;

module.exports = {
  GetRoles: (app) => {
    app.get('/api/getRoles', (req, res, next) => {
      Query(`SELECT * FROM roles`).then((respone) => {
        if (respone.length > 0) {
          res.status(200).json(respone);
        } else {
          res.status(400).json({ message: 'data not found' });
        }
      });
    });
  }
};
