const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-------------------------------------------------------------------------

const PostcodeSchema = Schema(
  {
    province: String,
    district: String,
    subdistrict: String,
    zipcode: String,
  },
  {
    collection: "Postcodes",
  }
);

try {
  module.exports = mongoose.model("Postcodes");
} catch (error) {
  module.exports = mongoose.model("Postcodes", PostcodeSchema);
}
