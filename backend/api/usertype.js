var expressFunction = require("express");
const router = expressFunction.Router();

const UserType = require("../model/postcode.model");

//--------------------------------------------------------------------------

const findUserTypes = async (data) => {
  return new Promise((resolve, reject) => {
    UserType.find({ name: { $regex: data } }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find UserTypes"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find UserTypes"));
        }
      }
    });
  });
};

const findUserTypeByID = async (id) => {
  return new Promise((resolve, reject) => {
    UserType.findOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find UserType By ID"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find UserType By ID"));
        }
      }
    });
  });
};

//--------------------------------------------------------------------------

//router.route("/get/:search").get(authorization, (req, res) => {
router.route("/get/:search").get((req, res) => {
  findUserTypes(new RegExp(req.params.search))
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

//router.route("/get/id/:ID").get(authorization, (req, res) => {
router.route("/get/id/:ID").get((req, res) => {
  findUserTypeByID(req.params.ID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

module.exports = router;
