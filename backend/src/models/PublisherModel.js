const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);
const Publisher = mongoose.model("Publisher", userSchema);
module.exports = Publisher;
