const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Cart = require("../model/cartModel");
const Product = require("../model/productModel");
const Coupon = require("../model/couponModel");

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalCartPrice = totalPrice;
  return totalPrice;
};

// @desc    Add product to cart
// @route   POST /api/v1/cart
// @access  Private
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);
  // Get Cart for logged User
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        { product: productId, color: color, quantity: 1, price: product.price },
      ],
    });
  } else {
    const productExist = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    if (productExist > -1) {
      const cartItem = cart.cartItems[productExist];
      cartItem.quantity += 1;
      cart.cartItems[productExist] = cartItem;
    } else {
      cart.cartItems.push({
        product: productId,
        color: color,
        quantity: 1,
        price: product.price,
      });
    }
  }
  const totalPrice = calcTotalCartPrice(cart);
  cart.totalCartPrice = totalPrice;
  await cart.save();

  res.status(200).json({
    success: "success",
    data: cart,
  });
});

// @desc    Get cart
// @route   GET /api/v1/cart
// @access  Private
exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  res.status(200).json({
    success: "success",
    data: cart,
  });
});

// @desc Remove product from cart
// @route DELETE /api/v1/cart/:productId
// @access Private
exports.removeProductFromCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findByIdAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.productId } } },
    { new: true }
  );
  calcTotalCartPrice(cart);
  await cart.save();
  res.status(200).json({
    success: "success",
    data: cart,
  });
});

// @desc Clear Cart
// @route DELETE /api/v1/cart
// @access Private
exports.clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ user: req.user._id });
  res.status(200).json({
    success: "success",
    data: cart,
  });
});

// @desc Update product quantity in cart
// @route PATCH /api/v1/cart/:productId
// @access Private
exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId
  );
  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(new ApiError("Item not found in cart", 404));
  }

  calcTotalCartPrice(cart);
  await cart.save();
  res.status(200).json({
    success: "success",
    data: cart,
  });
});

// @desc    Apply Coupon on Cart
// @route   POST /api/v1/cart/coupon
// @access  Private
exports.applyCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expire: { $gt: Date.now() },
  });
  if (!coupon) {
    return next(new ApiError("Coupon not found or expired", 404));
  }
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  const totalCartPrice = calcTotalCartPrice(cart);
  const discount = ((totalCartPrice * coupon.discount) / 100).toFixed(2);
  cart.totalPriceAfterDiscount = totalCartPrice - discount;
  await cart.save();
  res.status(200).json({
    success: "success",
    data: cart,
  });
});
