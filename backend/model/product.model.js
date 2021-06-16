const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//-------------------------------------------------------------------------
const Genders = require("./gender.model");
const TypeProducts = require("./typeproduct.model");
//-------------------------------------------------------------------------

const productSchema = Schema(
  {
    name: String,
    detail: String,
    price: Number,
    file: String,
    img: String,
    gender_id: {
      type: Schema.Types.ObjectId,
      ref: "Genders",
    },
    typeproduct_id: {
      type: Schema.Types.ObjectId,
      ref: "TypeProducts",
    },
    quantity: Number,
    status_favorite: false,
  },
  {
    collection: "Products",
  }
);

try {
  module.exports = mongoose.model("Products");
} catch (error) {
  module.exports = mongoose.model("Products", productSchema);
}
