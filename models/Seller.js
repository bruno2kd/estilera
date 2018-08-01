const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SellerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    // handle eh tipo um slug
    handle: {
      type: String,
      required: true,
      max: 40,
    },
    company: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Seller = mongoose.model('seller', SellerSchema);
