const slugify = require("slugify");
const { check, body } = require("express-validator");
const Review = require("../../model/reviewModel");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id format"),
  validatorMiddleware,
];

exports.createReviewValidator = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("Ratings required")
    .isFloat()
    .withMessage({ min: 1.0, max: 5.0 })
    .withMessage("Ratings must be between 1.0 and 5.0"),
  check("user").isMongoId().withMessage("Invalid Brand id format"),
  check("product")
    .isMongoId()
    .withMessage("Invalid Brand id format")
    .custom((val, { req }) => {
      //Check if logged user create review before
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          if (review) {
            return Promise.reject(
              new Error("You already reviewed this product")
            );
          }
        }
      );
    }),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) => {
      //Check Review Ownership
      Review.findbyId(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error("There is no Review with this ID"));
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error("You are not allowed to delete this Review")
          );
        }
      });
    }),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) => {
      if (req.user.role === "user") {
        Review.findbyId(val).then((review) => {
          if (!review) {
            return Promise.reject(new Error("There is no Review with this ID"));
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error("You are not allowed to delete this Review")
            );
          }
        });
      }
    }),
  validatorMiddleware,
];
