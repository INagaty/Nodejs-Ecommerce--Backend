const mongoose = require("mongoose");

//1-Create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Required"],
      unique: [true, "Category must be unqiue"],
      minLength: [3, "Too short category name"],
      maxLength: [32, "Too long category name"],
    },
    //A and B => shopping.com/a-and-b: Any name that has spaces, slug replaces space with slashes
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
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};

categorySchema.post("init", (doc) => {
  setImageURL(doc);
});

categorySchema.post("save", (doc) => {
  setImageURL(doc);
});

//2-Create Model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
