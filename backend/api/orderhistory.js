var expressFunction = require("express");
const router = expressFunction.Router();

const authorization = require("../config/authorize");
const OrderHistory = require("../model/orderhistory.model");

//--------------------------------------------------------------------------

const getOrderHistorys = async () => {
  return new Promise((resolve, reject) => {
    OrderHistory.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot get OrderHistorys"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot get OrderHistorys"));
        }
      }
    }).populate("product_id");
  });
};

const findOrderHistoryByID = async (id) => {
  return new Promise((resolve, reject) => {
    OrderHistory.find({ user_id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find OrderHistory By ID"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find OrderHistory By ID"));
        }
      }
    }).populate("product_id");
  });
};

const insertOrderHistory = async (data) => {
  return new Promise((resolve, reject) => {
    const new_OrderHistory = new OrderHistory(data);
    new_OrderHistory.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert OrderHistory to DB"));
      } else {
        resolve({ message: "OrderHistory added successfully." });
      }
    });
  });
};

//--------------------------------------------------------------------------

router.route("/get").get(authorization, (req, res) => {
  getOrderHistorys()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/get/id/:ID").get(authorization, (req, res) => {
  findOrderHistoryByID(req.params.ID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/add").post(authorization, (req, res) => {
  insertOrderHistory(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(String(err));
    });
});

module.exports = router;
