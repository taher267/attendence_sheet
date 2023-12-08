const moment = require("moment");

const { Schema, model } = require("mongoose");
const FormPermissionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, `User id is mandatory!`],
  },
  observer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  department_id: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  form_id: {
    type: Schema.Types.ObjectId,
    ref: "Form",
  },
  holiday: {
    _id: false,
    weekly: {
      type: String,
      enum: [0, 1, 2, 3, 4, 5, 6],
    },
    monthly: {
      type: Number,
      min: [1, `First day of month`],
      max: [moment().daysInMonth(), `End the day of Month`],
    },
    occasional: [Date],
  },
  submission_permission: {
    type: Date,
    required: [true, `Submission Permission in mandatory!`],
  },
  status: {
    type: String,
    enum: ["open", "close"],
    required: [true, `Status is mandatory!`],
  },
});
const FormPermission = model("FormPermission", FormPermissionSchema);

module.exports = FormPermission;
