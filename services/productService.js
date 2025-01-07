const { default: mongoose } = require("mongoose");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

const Product = require("../model/productModel");
const Category = require("../model/categoryModel");

exports.uploadProductImage = uploadMixOfImages(["imageCover", "images"]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${req.params.id}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`public/img/products/${imageCoverFileName}`);

    req.body.imageCover = imageCoverFileName;
  }

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageFileName = `product-${req.params.id}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`public/img/products/${imageFileName}`);

        req.body.images.push(imageFileName);
      })
    );
  }

  next();
});

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
