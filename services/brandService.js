const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../utils/apiError");

const Brand = require("../model/brandModel");

const factory = require("./handlersFactory");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

// Upload Single Image
exports.uploadBrandImage = uploadSingleImage("image");

//Image Processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  //Save image into db
  req.body.image = filename;

  next();
});

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
