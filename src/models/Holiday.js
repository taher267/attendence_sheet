const { Schema, model } = require("mongoose");
const moment = require("moment");

const HolidaySchema = new Schema({
  weekly: {
    type: String,
    enum: moment.weekdays(),
  },
  monthly: {
    type: Number,
    min: [1, `First day of month`],
    max: [moment().daysInMonth(), `End the day of Month`],
  },
  occasional: [Date],
});
const Holiday = model("Holiday", HolidaySchema);

module.exports = Holiday;
