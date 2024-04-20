const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        nameUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        borrowedDate: {type: Date},
        returnedDate: {type: Date},
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;