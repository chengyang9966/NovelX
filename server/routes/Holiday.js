const Query = require("../db").query;

const Holiday = function (app) {
  app.get("/api/holiday", (req, res, next) => {
    Query(
      `SELECT endday,endmonth,endyear,name,startday,startmonth,startyear from Holiday `
    )
      .then((respone) => {
        if (respone.length > 0) {
          res.status(200).json(respone);
        } else {
          res.status(400).json({ message: "no Holiday is added" });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};

exports.Holiday = Holiday;
