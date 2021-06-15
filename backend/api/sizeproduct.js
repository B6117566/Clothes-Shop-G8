var expressFunction = require("express");
const router = expressFunction.Router();

const SizeProduct = require("../model/sizeproduct.model");

//--------------------------------------------------------------------------

const getSizeProducts = async () => {
  return new Promise((resolve, reject) => {
    SizeProduct.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot get SizeProducts"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot get SizeProducts"));
        }
      }
    });
  });
};

//--------------------------------------------------------------------------

router.route("/get").get((req, res) => {
  getSizeProducts()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

module.exports = router;
