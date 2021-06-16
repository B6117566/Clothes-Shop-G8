const expressFunction = require("express");
var expressApp = expressFunction();
const database = require("../backend/config/database");
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
expressApp.use(expressFunction.json(), database);

//----------------------------------------------------------------------------
//Endpoint (API)
expressApp.use("/api/usertypes", require("./api/usertype"));
expressApp.use("/api/users", require("./api/user"));
expressApp.use("/api/typeproducts", require("./api/typeproduct"));
expressApp.use("/api/sizeproducts", require("./api/sizeproduct"));
expressApp.use("/api/products", require("./api/product"));
expressApp.use("/api/genders", require("./api/gender"));
expressApp.use("/api/favorites", require("./api/favorite"));


//เหลือ cart orderhistory
//----------------------------------------------------------------------------

//Running Server
expressApp.listen(3000, function () {
  console.log("Listening on port 3000");
});
