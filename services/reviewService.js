const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const Review = require("../model/reviewModel");

const factory = require("./handlersFactory");

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.productId) filterObj = { product: req.params.productId };
  req.filterObj = filterObj;
};

// @desc    Get list of Reviews
// @route   GET api/v1/reviews
// @access  Public
exports.getReviews = factory.getAll(Review);

// @desc     Get Specific Review by id
// @route    GET /api/v1/reviews/:id
// @access   Public
exports.getReview = factory.getOne(Review);

exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

// @desc    Create Review
// @route   POST /api/v1/reviews
// @access  Private
exports.createReview = factory.createOne(Review);

// @desc    Update Specific Review
// @route   PUT /api/v1/reviews/:id
// @access  Private
exports.updateReview = factory.updateOne(Review);

// @desc    Delete Specific Review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
exports.deleteReview = factory.deleteOne(Review);
