const { Schema, model } = require("mongoose");

const WorkReportSchema = new Schema(
  {
    report_permission_id: {
      type: Schema.Types.ObjectId,
      ref: "ReportPermission",
      required: [true, `User id is mandatory!`],
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
  },
  { timestamps: true, versionKey: false }
);
const WorkReport = model("WorkReport", WorkReportSchema);

module.exports = WorkReport;
