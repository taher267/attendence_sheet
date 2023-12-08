const { Schema, model } = require("mongoose");

const FormSubmissionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "FormSubmission name is mandatory"],
      trim: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, `User id is mandatory!`],
    },
    form_id: {
      type: Schema.Types.ObjectId,
      ref: "Form",
    },
    fields: [
      {
        name: { type: String, required: [true, `Field name is mandatory!`] },
      },
    ],
    for_submission_date: {
      type: Date,
      required: [true, `For submission date is mandatory`],
    },
  },
  { timestamps: true, versionKey: false }
);
const FormSubmission = model("FormSubmission", FormSubmissionSchema);

module.exports = FormSubmission;
