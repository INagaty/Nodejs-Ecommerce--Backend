const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

const Category = require("../model/categoryModel");

//1- Disk Storage
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     const extention = file.mimetype.split("/")[1];
//     const filename = `category-${uuidv4()}-${Date.now()}.${extention}`;
//     cb(null, filename);
//   },
// });

//2- Memory Storage
// const multerStorage = multer.memoryStorage();

// const multerFilter = function (req, file, cb) {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new ApiError("Not an image! Please upload only images.", 400), false);
//   }
// };

// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// Upload Single Image
exports.uploadCategoryImage = uploadSingleImage("image");

//Image Processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  //Save image into db
  req.body.image = filename;

  next();
});

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
