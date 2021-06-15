const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//-------------------------------------------------------------------------
const Users = require("./user.model");
const Products = require("./product.model");
//-------------------------------------------------------------------------

const favoriteSchema = Schema(
  {
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
    collection: "Favorites",
  }
);

try {
  module.exports = mongoose.model("Favorites");
} catch (error) {
  module.exports = mongoose.model("Favorites", favoriteSchema);
}
