const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);
const Publisher  = mongoose.model("Publisher ", userSchema);
module.exports = Publisher ;