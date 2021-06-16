const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//-------------------------------------------------------------------------
const Users = require("./user.model");
const Products = require("./product.model");
//-------------------------------------------------------------------------

const orderHistorySchema = Schema(
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
    collection: "OrderHistory",
  }
);

try {
  module.exports = mongoose.model("OrderHistory");
} catch (error) {
  module.exports = mongoose.model("OrderHistory", orderHistorySchema);
}
