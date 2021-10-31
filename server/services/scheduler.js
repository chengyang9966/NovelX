// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )
const cron = require("node-cron");

function Yearly(callBack) {
  cron.schedule(" * * * */12 *", function () {
    callBack();
    console.log("running a task every year");
  });
}
function FirstDayOftheMonth(callBack) {
  cron.schedule(" * * */1 * *", function () {
    callBack();
    console.log("running a task every year");
  });
}
function EveryMinute(callBack) {
  cron.schedule("  */1 * * * *", function () {
    callBack();
    console.log(new Date().toLocaleString());
    console.log("running a task every minutes");
  });
}

module.exports = {
  Yearly,
  FirstDayOftheMonth,
  EveryMinute,
};
