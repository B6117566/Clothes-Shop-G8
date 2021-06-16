var expressFunction = require("express");
const router = expressFunction.Router();

const authorization = require("../config/authorize");
const Cart = require("../model/cart.model");

//--------------------------------------------------------------------------

const findCartByID = async (id) => {
  return new Promise((resolve, reject) => {
    Cart.find({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Carts"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find Carts"));
        }
      }
    }).populate("product_id");
  });
};

const insertCart = async (data) => {
  return new Promise((resolve, reject) => {
    const new_Cart = new Cart(data);
    new_Cart.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Cart to DB"));
      } else {
        resolve({ message: "Cart added successfully." });
      }
    });
  });
};

const deleteCart = async (id) => {
  return new Promise((resolve, reject) => {
    Cart.deleteOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot Delete Cart"));
      } else {
        resolve({ message: "Cart delete successfully." });
      }
    });
  });
};

const updateCart = async (id, data) => {
  return new Promise((resolve, reject) => {
    if (id == undefined) {
      reject(new Error("Cannot update Cart"));
    }
    Cart.updateOne({ _id: id }, { $set: data }, (err, data) => {
      if (err) {
        reject(new Error("Cannot update Cart"));
      } else {
        resolve({ message: "Cart update successfully." });
      }
    });
  });
};

//--------------------------------------------------------------------------

router.route("/get/id/:ID").get(authorization, (req, res) => {
  findCartByID(req.params.ID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/add").post(authorization, (req, res) => {
  insertCart(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(String(err));
    });
});

router.route("/del/:id").delete(authorization, (req, res) => {
  deleteCart(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/put").put(authorization, (req, res) => {
  //----req[0] ID, req[1] ช้อมูล
  updateCart(req.body[0].id, req.body[1])
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(String(err));
    });
});

module.exports = router;
