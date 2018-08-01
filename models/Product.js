const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'sellers',
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Product = mongoose.model('product', ProductSchema);
