var expressFunction = require("express");
const router = expressFunction.Router();

const authorization = require("../config/authorize");
const UserType = require("../model/usertype.model");

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

//--------------------------------------------------------------------------

router.route("/get/:search").get(authorization, (req, res) => {
  findUserTypes(new RegExp(req.params.search))
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

module.exports = router;
