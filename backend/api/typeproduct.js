var expressFunction = require("express");
const router = expressFunction.Router();

const TypeProduct = require("../model/typeproduct.model");

//--------------------------------------------------------------------------

const getTypeProducts = async () => {
  return new Promise((resolve, reject) => {
    TypeProduct.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot get TypeProducts"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot get TypeProducts"));
        }
      }
    });
  });
};

//--------------------------------------------------------------------------

router.route("/get").get((req, res) => {
  getTypeProducts()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

module.exports = router;
