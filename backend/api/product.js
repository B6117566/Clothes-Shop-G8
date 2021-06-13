var expressFunction = require("express");
const router = expressFunction.Router();
const mongoose = require("mongoose");
const authorization = require("../config/authorize");

//-------------------------------------------------------------------------
//Schema
var Schema = require("mongoose").Schema;

//-------------------------------------------------------------------------
//Products
const productSchema = Schema(
  {
    name: String,
    detail: String,
    quantity: Number,
    price: Number,
    file: String,
    img: String,
    datetime: Date,
    Genders: {
      id: String,
      name: String,
    },
    TypeProducts: {
      id: String,
      name: String,
    },
    SizeProducts: {
      id: String,
      name: String,
    },
  },
  {
    collection: "Products",
  }
);

let Product 
try {
  Product = mongoose.model("Products");
} catch (error) {
  Product = mongoose.model("Products", productSchema);
}

//-------------------------------------------------------------------------
//Genders
const genderSchema = Schema(
  {
    name: String,
  },
  {
    collection: "Genders",
  }
);

let Gender;
try {
  Gender = mongoose.model("Genders");
} catch (error) {
  Gender = mongoose.model("Genders", genderSchema);
}

//-------------------------------------------------------------------------
//SizeProducts
const sizeProductSchema = Schema(
  {
    name: String,
  },
  {
    collection: "SizeProducts",
  }
);

let SizeProduct;
try {
  SizeProduct = mongoose.model("SizeProducts");
} catch (error) {
  SizeProduct = mongoose.model("SizeProducts", sizeProductSchema);
}

//-------------------------------------------------------------------------
//TypeProducts
const typeProductSchema = Schema(
  {
    name: String,
  },
  {
    collection: "TypeProducts",
  }
);

let TypeProduct;
try {
  TypeProduct = mongoose.model("TypeProducts");
} catch (error) {
  TypeProduct = mongoose.model("TypeProducts", typeProductSchema);
}

//--------------------------------------------------------------------------

const getGenders = async () => {
  return new Promise((resolve, reject) => {
    Gender.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot get Genders"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot get Genders"));
        }
      }
    });
  });
};

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
    });
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


//--------------------------------------------------------------------------
//router.route("/products/get").get(authorization, (req, res) => {
router.route("/products/get").get(async (req, res) => {
  try {
    var result_mod = await getProducts().catch((err) => {
      res.status(404).send(String(err));
    });

    await getGenders()
      .then((result) => {
        result.forEach((r) => {
          result_mod.forEach((rmod) => {
            if (r.id == rmod.Genders.id) {
              rmod.Genders.name = r.name;
            }
          });
        });
      })
      .catch((err) => {
        res.status(404).send(String(err));
      });

    await getSizeProducts()
      .then((result) => {
        result.forEach((r) => {
          result_mod.forEach((rmod) => {
            if (r.id == rmod.SizeProducts.id) {
              rmod.SizeProducts.name = r.name;
            }
          });
        });
      })
      .catch((err) => {
        res.status(404).send(String(err));
      });

    await getTypeProducts()
      .then((result) => {
        result.forEach((r) => {
          result_mod.forEach((rmod) => {
            if (r.id == rmod.TypeProducts.id) {
              rmod.TypeProducts.name = r.name;
            }
          });
        });
      })
      .catch((err) => {
        res.status(404).send(String(err));
      });

    res.status(200).json(result_mod);
  } catch (error) {}
});

//router.route("/products/add").post(authorization, (req, res) => {
router.route("/products/add").post((req, res) => {
  insertProduct(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(String(err));
    });
});

//router.route("/products/del").delete(authorization, (req, res) => {
router.route("/products/del").delete((req, res) => {
  deleteProduct(req.body.id)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

//router.route("/products/edit").put(authorization, (req, res) => {
router.route("/products/put").put((req, res) => {
  updateProduct(req.body[0].id, mongoose.Types.ObjectId(req.body[1]))
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(String(err));
    });
});

//router.route("/products/find").get(authorization, (req, res) => {
router.route("/products/find").get(async (req, res) => {
  console.log(req.body)
  try {
    findProducts(new RegExp(req.body.name))
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).send(String(err));
      });
  } catch (error) {
    res.status(400).send(String(error));
  }
});


module.exports = router;
