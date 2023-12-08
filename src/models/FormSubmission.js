const { Schema, model } = require("mongoose");

const FormSubmissionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "FormSubmission name is mandatory"],
      trim: true,
    },
    observer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fields: [
      {
        name: { type: String, required: [true, `Field name is mandatory!`] },
      },
    ],
    submission_date: {
      type: Date,
      required: [true, `Submission date is mandatory`],
    },
  },
  { timestamps: true }
);
const FormSubmission = model("FormSubmission", FormSubmissionSchema);

module.exports = FormSubmission;
