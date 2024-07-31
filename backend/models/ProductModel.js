const mongoose = require("mongoose");


var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    tags: String,
    ratings: [
      {
        star: Number,
      },
    ],
    sellerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" , 
        required: true
    },

  },
  { timestamps: true }
);


module.exports = mongoose.model("Product", productSchema);