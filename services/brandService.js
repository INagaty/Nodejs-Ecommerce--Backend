const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const Brand = require("../model/brandModel");

const factory = require("./handlersFactory");

// @desc    Get list of brands
// @route   GET api/v1/brands
// @access  Public
exports.getBrands = factory.getAll(Brand);

// @desc     Get Specific Brand by id
// @route    GET /api/v1/brands/:id
// @access   Public
exports.getBrand = factory.getOne(Brand);
// @desc    Create Brand
// @route   POST /api/v1/brands
// @access  Private
exports.createBrand = factory.createOne(Brand);

// @desc    Update Specific Brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = factory.updateOne(Brand);

// @desc    Delete Specific Brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = factory.deleteOne(Brand);
