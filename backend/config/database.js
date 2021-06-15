const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/Clothes";
const config = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//middleware 3
const database = (req, res, next) => {
  mongoose
    .connect(url, config)
    .then(() => {
      console.log("Connected to MongoDB....");
      next();
    })
    .catch(() => {
      console.log("Cannot connect to MongoDB !!!");
      res.status(501).send("Cannot connect to MongoDB !!!");
    });
};

module.exports = database;
