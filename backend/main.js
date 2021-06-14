const expressFunction = require("express");
const mongoose = require("mongoose");
var expressApp = expressFunction();

const url = "mongodb://localhost:27017/Clothes";
const config = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//--------------------------------------------------------------------------

//middleware 1
expressApp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST,GET,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, Authorization"
  );
  return next();
});

//middleware 2
expressApp.use(expressFunction.json());

//middleware 3
expressApp.use((req, res, next) => {
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
});

//----------------------------------------------------------------------------

//มาใส่ที่จะติดต่อเอาข้อมูลตรงนี้ 
//Endpoint
//Api
expressApp.use("/api/products", require("./api/product"));
expressApp.use("/api/favorites", require("./api/favorite"));
expressApp.use("/api/users", require("./api/user"));

//----------------------------------------------------------------------------

//Running Server
expressApp.listen(3000, function () {
  console.log("Listening on port 3000");
});
