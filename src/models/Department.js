const { Schema, model } = require("mongoose");

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is mandatory"],
      trim: true,
    },
    establishment_id: {
      type: Schema.Types.ObjectId,
      required: [false, "Establishment Id is mandatory"],
      ref: "Establishment",
    },
  },
  { versionKey: false }
);
const Department = model("Department", departmentSchema);

module.exports = Department;
