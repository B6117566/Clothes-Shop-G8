const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//-------------------------------------------------------------------------
const Users = require("./user.model");
const Products = require("./product.model");
//-------------------------------------------------------------------------

const cartSchema = Schema(
  {
    quantity: Number,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  },
  {
    collection: "Carts",
  }
);

try {
  module.exports = mongoose.model("Carts");
} catch (error) {
  module.exports = mongoose.model("Carts", cartSchema);
}
