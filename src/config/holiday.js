const moment = require("moment");

const daysOfWeek = moment.weekdays();
const maxOfMonth = moment().daysInMonth();

module.exports = { daysOfWeek, maxOfMonth };
