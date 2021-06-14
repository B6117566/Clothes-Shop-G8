const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-------------------------------------------------------------------------

const sizeProductSchema = Schema(
  {
    name: String,
  },
  {
    collection: "SizeProducts",
  }
);

try {
  module.exports = mongoose.model("SizeProducts");
} catch (error) {
  module.exports = mongoose.model("SizeProducts", sizeProductSchema);
}
