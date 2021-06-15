var expressFunction = require("express");
const router = expressFunction.Router();

const Postcode = require("../model/postcode.model");

//--------------------------------------------------------------------------

const getPostcodes = async () => {
  return new Promise((resolve, reject) => {
    Postcode.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot get Postcodes"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot get Postcodes"));
        }
      }
    });
  });
};

const findPostcodeByID = async (id) => {
  return new Promise((resolve, reject) => {
    Postcode.findOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Postcode By ID"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find Postcode By ID"));
        }
      }
    })
  });
};

//--------------------------------------------------------------------------

router.route("/get").get((req, res) => {
  getPostcodes()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/get/id/:ID").get((req, res) => {
  findPostcodeByID(req.params.ID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

module.exports = router;
