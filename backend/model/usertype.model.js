const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-------------------------------------------------------------------------

const usertypeSchema = Schema(
  {
    name: String,
  },
  {
    collection: "UserTypes",
  }
);

try {
  module.exports = mongoose.model("UserTypes");
} catch (error) {
  module.exports = mongoose.model("UserTypes", usertypeSchema);
}
