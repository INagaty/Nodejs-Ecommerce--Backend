const mongoose = require("mongoose");

//1-Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand Required"],
      unique: [true, "Brand must be unqiue"],
      minLength: [3, "Too short brand name"],
      maxLength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  //Adds: created at and updated at to the the database
  { timestamps: true }
);

//2-Create Model
const brandModel = mongoose.model("Brand", brandSchema);

module.exports = brandModel;
