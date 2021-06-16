const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//-------------------------------------------------------------------------
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
