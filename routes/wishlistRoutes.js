const express = require("express");
const {
  addProductToWishlist,
  RemoveProductfromWishlist,
  getUserWishlist,
} = require("../services/wishlistService");

const authService = require("../services/authService");

const router = express.Router();

router.post(
  "/",
  authService.protect,
  authService.allowedTo("user"),
  addProductToWishlist
);

router
  .route("/:productId")
  .delete(
    authService.protect,
    authService.allowedTo("user"),
    RemoveProductfromWishlist
  );

router.get(
  "/",
  authService.protect,
  authService.allowedTo("user"),
  getUserWishlist
);
module.exports = router;
