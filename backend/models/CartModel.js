const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensures the cart is associated with a user
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true, // Ensures each product is valid
        },
        count: {
          type: Number,
          required: true, // Ensures count is always provided
          min: 1, // Count must be at least 1
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Cart", cartSchema);
