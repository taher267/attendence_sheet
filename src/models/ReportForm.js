const { Schema, model } = require("mongoose");
const reportFormFiledConfig = require("../config/reportForm");

const ReportFormSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Report form name is mandatory"],
      trim: true,
      index: 1,
    },
    fields: [
      {
        _id: false,
        label: { type: String, required: [true, `Label is mandatory!`] },
        name: {
          type: String,
          required: [true, `Field name is mandatory!`],
          trim: true,
          lowerCase: true,
        },
        type: {
          type: String,
          enum: reportFormFiledConfig.filedTypes,
          default: "text",
        },
        validation: Array,
      },
    ],
    status: { type: String, eum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);
const ReportForm = model("ReportForm", ReportFormSchema);

module.exports = ReportForm;
