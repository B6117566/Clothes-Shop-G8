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

//มาใส่ที่จะติดต่อเอาข้อมูลตรงนี้
//Endpoint
//Api
expressApp.use("/api/users", require("./api/user"));
expressApp.use("/api/products", require("./api/product"));
expressApp.use("/api/favorites", require("./api/favorite"));
//----------------------------------------------------------------------------

//Running Server
expressApp.listen(3000, function () {
  console.log("Listening on port 3000");
});
