const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'sellers',
      // required: true,
    },
    name: {
      type: String,
      required: true,
    },
    productImage: {
      type: [
        {
          type: String,
        },
      ],
      validate: [arrayLimit, 'Exceeds the limit of 6'],
    },
  },
  {
    timestamps: true,
  },
);

function arrayLimit(val) {
  return val.length <= 6;
}

module.exports = Product = mongoose.model('product', ProductSchema);
