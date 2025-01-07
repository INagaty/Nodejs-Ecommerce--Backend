const express = require("express");

const authService = require("../services/authService");

const {
  getProductValidator,
  updateProductValidator,
  createProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  resizeProductImages,
} = require("../services/productService");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    createProductValidator,
    uploadProductImage,
    resizeProductImages,
    createProduct
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    updateProductValidator,
    uploadProductImage,
    resizeProductImages,
    updateProduct
  )
  .delete(deleteProductValidator, deleteProduct);
module.exports = router;
