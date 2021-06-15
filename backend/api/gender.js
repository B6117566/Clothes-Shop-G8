var expressFunction = require("express");
const router = expressFunction.Router();
const authorization = require("../config/authorize");

const Gender = require("../model/gender.model");
const Product = require("../model/product.model");

//--------------------------------------------------------------------------

const findGenders = async (data) => {
  return new Promise((resolve, reject) => {
    Gender.findOne({ name: { $regex: data } }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Genders"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot find Genders"));
        }
      }
    });
  });
};

const getProductAsGender = async (id) => {
  return new Promise((resolve, reject) => {
    Product.find({ gender_id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Products As Gender"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find Products As Gender"));
        }
      }
    })
      .populate("gender_id")
      .populate("typeproduct_id")
      .populate("quantity.size_id");
  });
};

const findProductAsGender = async (id, data) => {
  return new Promise((resolve, reject) => {
    Product.find({ gender_id: id, name: { $regex: data } }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Products As Gender"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find Products As Gender"));
        }
      }
    })
      .populate("gender_id")
      .populate("typeproduct_id")
      .populate("quantity.size_id");
  });
};

//--------------------------------------------------------------------------
//ส่งคำว่า Men หรือ Women เข้ามาหลัง all/
router.route("/get/all/:gender").get((req, res) => {
  findGenders(new RegExp(req.params.gender))
    .then((result) => {
      getProductAsGender(result.id)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(404).send(String(err));
        });
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

//ส่งคำว่า Men หรือ Women เข้ามาหลัง get/ แล้วต่อไปเป็นคำค้นหา
router.route("/get/:gender/:search").get((req, res) => {
  findGenders(new RegExp(req.params.gender))
    .then((result) => {
      findProductAsGender(result.id, new RegExp(req.params.search))
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(404).send(String(err));
        });
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

module.exports = router;
