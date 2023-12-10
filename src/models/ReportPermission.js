const { Schema, model } = require("mongoose");
const reportPermissionStatus = require("../config/reportPermission");

const ReportPermissionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, `User id is mandatory!`],
    },
    observer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, `User id is mandatory!`],
    },
    establishment_id: {
      type: Schema.Types.ObjectId,
      ref: "Establishment",
      required: [false, `Establishment id is mandatory!`],
    },
    department_id: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [false, `Department id is mandatory!`],
    },
    holiday_id: {
      type: Schema.Types.ObjectId,
      ref: "Holiday",
      required: [false, `Holiday id is mandatory!`],
    },
    report_form_id: {
      type: Schema.Types.ObjectId,
      ref: "ReportForm",
    },

    status: {
      type: String,
      enum: reportPermissionStatus.statuses,
      required: [true, `Status is mandatory!`],
    },
  },
  { timestamps: true, versionKey: false }
);
const ReportPermission = model("ReportPermission", ReportPermissionSchema);

module.exports = ReportPermission;
