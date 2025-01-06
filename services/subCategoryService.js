const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");

const SubCategory = require("../model/subCategoryModel");

exports.setCategoryIdToBody = (req, res, next) => {
  //Nested Route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// @desc    Create Subcategory
// @route   POST /api/v1/subcategories
// @access  Private
exports.createSubGategory = factory.createOne(SubCategory);

//Nested Route
//GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @desc    Get list of Subcategories
// @route   GET api/v1/subcategories
// @access  Public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc     Get Specific Sub Category by id
// @route    GET /api/v1/subcategories/:id
// @access   Public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc    Update Specific SubCategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc    Delete Specific SubCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
