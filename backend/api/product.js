var expressFunction = require("express");
const router = expressFunction.Router();
const authorization = require("../config/authorize");

const Product = require("../model/product.model");

//--------------------------------------------------------------------------

const getProducts = async () => {
  return new Promise((resolve, reject) => {
    Product.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot get Products"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot get Products"));
        }
      }
    })
      .populate("gender_id")
      .populate("typeproduct_id")
      .populate("quantity.size_id");
  });
};

const findProducts = async (data) => {
  return new Promise((resolve, reject) => {
    Product.find({ name: { $regex: data } }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Products"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find Products"));
        }
      }
    })
      .populate("gender_id")
      .populate("typeproduct_id")
      .populate("quantity.size_id");
  });
};

const findProductByID = async (id) => {
  return new Promise((resolve, reject) => {
    Product.find({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Product By ID"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find Product By ID"));
        }
      }
    })
      .populate("gender_id")
      .populate("typeproduct_id")
      .populate("quantity.size_id");
  });
};

const insertProduct = async (data) => {
  return new Promise((resolve, reject) => {
    const new_product = new Product(data);
    new_product.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Product to DB"));
      } else {
        resolve({ message: "Product added successfully." });
      }
    });
  });
};

const deleteProduct = async (id) => {
  return new Promise((resolve, reject) => {
    Product.deleteOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot Delete Product"));
      } else {
        resolve({ message: "Product delete successfully." });
      }
    });
  });
};

const updateProduct = async (id, data) => {
  return new Promise((resolve, reject) => {
    Product.updateOne({ _id: id }, { $set: data }, (err, data) => {
      if (err) {
        reject(new Error("Cannot update Product"));
      } else {
        resolve({ message: "Product update successfully." });
      }
    });
  });
};

const pushStatus = (data) => {
  var result = [];
  const status = { status_favorite: false };
};

//--------------------------------------------------------------------------

router.route("/products/get").get((req, res) => {
  getProducts()
    .then((result) => {
      const result_mod = pushStatus(result);

      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/products/get/:search").get((req, res) => {
  findProducts(new RegExp(req.params.search))
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/products/get/id/:ID").get((req, res) => {
  findProductByID(req.params.ID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

//router.route("/products/add").post(authorization, (req, res) => {
router.route("/products/add").post((req, res) => {
  insertProduct(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

//router.route("/products/del").delete(authorization, (req, res) => {
router.route("/products/del/:id").delete((req, res) => {
  deleteProduct(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

//router.route("/products/edit").put(authorization, (req, res) => {
router.route("/products/put").put((req, res) => {
  updateProduct(req.body[0].id, mongoose.Types.ObjectId(req.body[1]))
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

module.exports = router;
