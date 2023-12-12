const { Schema, model } = require("mongoose");
const workReportConfig = require("../config/workReport");

const WorkReportSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, `User id is mandatory!`],
    },
    report_permission_id: {
      type: Schema.Types.ObjectId,
      ref: "ReportPermission",
      required: [true, `Report Permission id is mandatory!`],
    },

    fields: [
      {
        name: { type: String, required: [true, `Field name is mandatory!`] },
        report: { type: String, required: [true, `Field name is mandatory!`] },
      },
    ],
    for_submission_date: {
      type: Date,
      required: [true, `For submission date is mandatory`],
    },
    status: {
      type: String,
      enum: workReportConfig.statuses,
      required: [true, `Work Report Status is mandatory`],
    },
  },
  { timestamps: true, versionKey: false }
);
const WorkReport = model("WorkReport", WorkReportSchema);

module.exports = WorkReport;
