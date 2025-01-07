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

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};

brandSchema.post("init", (doc) => {
  setImageURL(doc);
});

brandSchema.post("save", (doc) => {
  setImageURL(doc);
});

//2-Create Model
const brandModel = mongoose.model("Brand", brandSchema);

module.exports = brandModel;
