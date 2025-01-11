const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../model/userModel");

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist
// @access  Private
exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
  const user = User.findByIdAndUpdate(
    req.user.id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    { new: true }
  );
  res.status(200).json({ status: "success", data: user.wishlist });
});

// @desc    Remove product from user wishlist
// @route   DELETE /api/v1/wishlist
// @access  Private
exports.RemoveProductfromWishlist = asyncHandler(async (req, res, next) => {
  const user = User.findByIdAndDelete(
    req.user._id,
    {
      $pull: { wishlist: req.body.productId },
    },
    { new: true }
  );
  res.status(200).json({ status: "success", data: user.wishlist });
});

// @desc    Get user wishlist
// @route   GET /api/v1/wishlist
// @access  Private
exports.getUserWishlist = asyncHandler(async (req, res, next) => {
  const user = User.findById(req.user._id).populate("wishlist");
  res.status(200).json({ status: "success", data: user.wishlist });
});
