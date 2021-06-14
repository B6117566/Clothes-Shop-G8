const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//-------------------------------------------------------------------------
const Postcodes = require("./postcode.model");
const UserTypes = require("./usertype.model");
//-------------------------------------------------------------------------

const userSchema = Schema(
  {
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    phone: String,
    address: String,
    postcode_id: {
      type: Schema.Types.ObjectId,
      ref: "Postcodes",
    },
    usertype_id: {
      type: Schema.Types.ObjectId,
      ref: "UserTypes",
    },
  },
  {
    collection: "Users",
  }
);

try {
  module.exports = mongoose.model("Users");
} catch (error) {
  module.exports = mongoose.model("Users", userSchema);
}
