const express = require("express");

const authService = require("../services/authService");

const {
  addProductToCart,
  getCart,
  removeProductFromCart,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../services/cartService");

const router = express.Router();

router
  .route("/")
  .post(authService.protect, authService.allowedTo("user"), addProductToCart)
  .get(authService.protect, authService.allowedTo("user"), getCart)
  .delete(authService.protect, authService.allowedTo("user"), clearCart);

router
  .route("/applyCoupon")
  .put(authService.protect, authService.allowedTo("user"), applyCoupon);

router
  .route("/:id")
  .delete(
    authService.protect,
    authService.allowedTo("user"),
    removeProductFromCart
  )
  .put(
    authService.protect,
    authService.allowedTo("user"),
    updateCartItemQuantity
  );

module.exports = router;
