const { Schema, model } = require("mongoose");

const establishmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is mandatory"],
      unique: [true, `Establishment name should be unique`],
      trim: true,
    },
  },
  { versionKey: false }
);
const Establishment = model("Establishment", establishmentSchema);

module.exports = Establishment;
