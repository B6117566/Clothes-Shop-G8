const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-------------------------------------------------------------------------

const typeProductSchema = Schema(
  {
    name: String,
  },
  {
    collection: "TypeProducts",
  }
);

try {
  module.exports = mongoose.model("TypeProducts");
} catch (error) {
  module.exports = mongoose.model("TypeProducts", typeProductSchema);
}
