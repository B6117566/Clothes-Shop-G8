const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-------------------------------------------------------------------------

const genderSchema = Schema(
  {
    name: String,
  },
  {
    collection: "Genders",
  }
);

try {
  module.exports = mongoose.model("Genders");
} catch (error) {
  module.exports = mongoose.model("Genders", genderSchema);
}
