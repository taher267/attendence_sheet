const { Schema, model } = require("mongoose");
const holidayConfig = require("../config/holiday");


const HolidaySchema = new Schema(
  {
    weekly: {
      type: [String],
      enum: holidayConfig.daysOfWeek,
    },
    monthly: {
      type: [Number],
      min: [1, `First day of month`],
      max: [holidayConfig.maxOfMonth, `End the day of Month`],
    },
    occasional: [Date],
  },
  { versionKey: false }
);
const Holiday = model("Holiday", HolidaySchema);

module.exports = Holiday;
