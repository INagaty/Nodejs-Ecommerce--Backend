const Coupon = require("../model/couponModel");

const factory = require("./handlersFactory");

// @desc    Get list of coupons
// @route   GET api/v1/coupons
// @access  Public
exports.getCoupons = factory.getAll(Coupon);

// @desc     Get Specific Coupon by id
// @route    GET /api/v1/coupons/:id
// @access   Public
exports.getCoupon = factory.getOne(Coupon);
// @desc    Create Coupon
// @route   POST /api/v1/coupons
// @access  Private
exports.createCoupon = factory.createOne(Coupon);

// @desc    Update Specific Coupon
// @route   PUT /api/v1/coupons/:id
// @access  Private
exports.updateCoupon = factory.updateOne(Coupon);

// @desc    Delete Specific Coupon
// @route   DELETE /api/v1/coupoins/:id
// @access  Private
exports.deleteCoupon = factory.deleteOne(Coupon); // @desc    Get list of brands
