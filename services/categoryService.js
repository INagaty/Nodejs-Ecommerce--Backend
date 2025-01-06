const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");

const Category = require("../model/categoryModel");

// @desc    Get list of categories
// @route   GET api/v1/categories
// @access  Public
exports.getCategories = factory.getAll(Category);

// @desc     Get Specific Category by id
// @route    GET /api/v1/categories/:id
// @access   Public
exports.getCategory = factory.getOne(Category);

// @desc    Create Category
// @route   POST /api/v1/categories
// @access  Private
exports.createGategory = factory.createOne(Category);

// @desc    Update Specific Category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(Category);

// @desc    Delete Specific Category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = factory.deleteOne(Category);
