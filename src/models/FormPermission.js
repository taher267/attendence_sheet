const moment = require("moment");

const { Schema, model } = require("mongoose");
const FormPermissionSchema = new Schema({
  holiday: {
    weekly: {
      type: String,
      enum: [0, 1, 2, 3, 4, 5, 6],
    },
    monthly: { type: Number, min: [1, `First day of month`], max:[moment().daysInMonth(), `End the day of Month`] },
    occasional: [Date],
  },
  submissionPermission: {
    type: Date,
    required: [true, `Submission Permission in mandatory!`],
  },
});
const FormPermission = model("FormPermission", FormPermissionSchema);

module.exports = FormPermission;
