const { Schema, model } = require("mongoose");
const formFiledConfig = require("../config/form");

const formSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Form name is mandatory"],
      trim: true,
      
    },
    fields: [
      {
        label: { type: String, required: [true, `Label is mandatory!`] },
      },
      {
        name: {
          type: String,
          required: [true, `Field name is mandatory!`],
          trim: true,
          lowerCase: true,
        },
      },
      {
        type: {
          type: String,
          enum: formFiledConfig.filedTypes,
          default: "text",
        },
      },
      { validation: Array },
    ],
  },
  { timestamps: true }
);
const Form = model("Form", formSchema);

module.exports = Form;
