var expressFunction = require("express");
const router = expressFunction.Router();
const mongoose = require("mongoose");
const authorization = require("../config/authorize");

//-------------------------------------------------------------------------
//Schema
var Schema = require("mongoose").Schema;

//-------------------------------------------------------------------------
//Favorites
const favoriteSchema = Schema(
  {
    Users: {
      id: String,
      email: String,
      password: String,
      firstname: String,
      lastname: String,
      phone: String,
      address: String,
    },
    Products: {
      id: String,
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
  },
  {
    collection: "Favorites",
  }
);

let Favorite;
try {
  Favorite = mongoose.model("Favorites");
} catch (error) {
  Favorite = mongoose.model("Favorites", favoriteSchema);
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
//Users
const userSchema = Schema(
  {
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    phone: String,
    address: String,
  },
  {
    collection: "Users",
  }
);

let User;
try {
  User = mongoose.model("Users");
} catch (error) {
  User = mongoose.model("Users", userSchema);
}

Product = mongoose.model("Products");

//--------------------------------------------------------------------------

const findOneProduct = async (id) => {
  return new Promise((resolve, reject) => {
    Product.findOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Product"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find Products"));
        }
      }
    });
  });
};

const findOneUser = async (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find user"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot find user"));
        }
      }
    });
  });
};

const addFavorite = async (data) => {
  return new Promise((resolve, reject) => {
    const new_favorite = new Favorite(data);
    new_favorite.save((err, data) => {
      if (err) {
        reject(new Error("Cannot add Favorite to DB"));
      } else {
        resolve({ message: "Favorite added successfully." });
      }
    });
  });
};

const getFavorites = async () => {
    return new Promise((resolve, reject) => {
      Favorite.find({}, (err, data) => {
        if (err) {
          reject(new Error("Cannot get Favorite"));
        } else {
          if (data.length != 0) {
            resolve(data);
          } else {
            reject(new Error("Cannot get Favorite"));
          }
        }
      });
    });
  };

router.route("/findOne").get(async (req, res) => {
  try {
    findOneProduct(mongoose.Types.ObjectId(req.body.product_id))
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

router.route("/user").get(async (req, res) => {
  try {
    findOneUser(mongoose.Types.ObjectId(req.body.user_id))
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

router.route("/add").post(async (req, res) => {
  try {
    const product = await findOneProduct(
      mongoose.Types.ObjectId(req.body.product_id)
    ).catch((err) => {
      res.status(404).send(String(err));
    });
    const user = await findOneUser(
      mongoose.Types.ObjectId(req.body.user_id)
    ).catch((err) => {
      res.status(404).send(String(err));
    });

    favorite = {
      Users: user,
      Products: product,
    };

    addFavorite(favorite)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(400).send(String(error));
  }
});

router.route("/get").get(async (req, res) => {
    try {
        await getFavorites().then(result => {
            res.status(200).json(result)
        }).catch(err => {
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
});

module.exports = router;
