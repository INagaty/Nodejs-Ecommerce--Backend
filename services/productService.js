const { default: mongoose } = require("mongoose");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

const Product = require("../model/productModel");
const Category = require("../model/categoryModel");

// @desc    Get list of products
// @route   GET api/v1/products
// @access  Public
exports.getProducts = factory.getAll(Product);

// @desc     Get Specific Product by id
// @route    GET /api/v1/products/:id
// @access   Public
exports.getProduct = factory.getOne(Product);

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product);

// @desc    Update Specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete Specific Product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.deleteOne(Product);
