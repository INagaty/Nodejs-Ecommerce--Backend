const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      unique: true,
    },
    expire: {
      type: Date,
      required: [true, "Expire is required"],
    },
    discount: {
      type: Number,
      required: [true, "Discount is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("coupon", couponSchema);
