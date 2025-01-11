const express = require("express");
const authService = require("../services/authService");
const {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../services/couponService");

const router = express.Router();

router
  .route("/")
  .get(authService.allowedTo("admin", "manager"), getCoupons)
  .post(authService.protect, createCoupon);

router
  .route("/:id")
  .get(getCoupon)
  .put(authService.protect, updateCoupon)
  .delete(authService.protect, authService.allowedTo("admin"), deleteCoupon);
