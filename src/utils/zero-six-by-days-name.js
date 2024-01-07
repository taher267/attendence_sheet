const moment = require("moment");

module.exports = (dayOfWeekNumber) => {
  if (dayOfWeekNumber < 0 || dayOfWeekNumber > 6)
    throw new Error(`parameters should be 0-6`);
  return moment()
    .day(dayOfWeekNumber)
    .locale("en", { week: { dow: 6 } })
    .format("dddd");
};
