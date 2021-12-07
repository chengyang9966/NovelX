const axios = require("axios");
const Query = require("../db").query;
const { insertRow, insertMultipleRow } = require("../db");

function Holiday(app) {
  axios
    .get(
      `https://www.googleapis.com/calendar/v3/calendars/en.${process.env.COUNTRY}%23holiday%40group.v.calendar.google.com/events?key=${process.env.GOOGLE_CALANDER_API}`
    )
    .then(function (res) {
      let temp = [];
      res.data.items.map((w) => {
        let startDateData = w.start.date.split("-");
        let endDateData = w.end.date.split("-");
        temp.push({
          startDay: startDateData.pop(),
          startMonth: startDateData[1],
          startYear: startDateData[0],
          name: w.summary,
          endDay: endDateData.pop(),
          endMonth: endDateData[1],
          endYear: endDateData[0],
        });
      });
      temp.sort((a, b) => {
        if (a.startYear - b.startYear) {
          if (a.startYear > b.startYear) return 1;
          if (a.startYear < b.startYear) return -1;
          return 0;
        }
      });
      let query2 = "delete from holiday";
      Query(query2).then((respone) => {
        insertMultipleRow("holiday", temp)
          .then((result) => {})
          .catch((fail) => {});
      });
    });
}
exports.Holiday = Holiday;
