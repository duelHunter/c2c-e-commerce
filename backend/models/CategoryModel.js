const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // for URLs
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to self for hierarchical structure
      default: null,   // null means it's a top-level category
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
