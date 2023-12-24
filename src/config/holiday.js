const moment = require("moment");

const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
// const daysOfWeek = moment.weekdays();
const maxOfMonth = moment().daysInMonth();
module.exports = { daysOfWeek, maxOfMonth };
