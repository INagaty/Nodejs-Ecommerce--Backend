const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../model/userModel");

// @desc    Add address to user
// @route   POST /api/v1/wishlist
// @access  Private
exports.addAddress = asyncHandler(async (req, res, next) => {
  const user = User.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  res.status(200).json({ status: "success", data: user.addresses });
});

// @desc    Remove address
// @route   DELETE /api/v1/wishlist
// @access  Private
exports.removeAddress = asyncHandler(async (req, res, next) => {
  const user = User.findByIdAndDelete(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );
  res.status(200).json({ status: "success", data: user.addresses });
});

// @desc    Get user wishlist
// @route   GET /api/v1/wishlist
// @access  Private
exports.getUserAdresses = asyncHandler(async (req, res, next) => {
  const user = User.findById(req.user._id).populate("addresses");
  res.status(200).json({ status: "success", data: user.addresses });
});
