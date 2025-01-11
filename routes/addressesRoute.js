const express = require("express");
const {
  addAddress,
  removeAddress,
  getUserAdresses,
} = require("../services/addressesService");

const authService = require("../services/authService");

const router = express.Router();

router.post(
  "/",
  authService.protect,
  authService.allowedTo("user"),
  addAddress
);

router
  .route("/:addressId")
  .delete(authService.protect, authService.allowedTo("user"), removeAddress);

router.get(
  "/",
  authService.protect,
  authService.allowedTo("user"),
  getUserAdresses
);
module.exports = router;
