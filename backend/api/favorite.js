var expressFunction = require("express");
const router = expressFunction.Router();

const authorization = require("../config/authorize");
const Favorite = require("../model/favorite.model");

//--------------------------------------------------------------------------

const getFavoritesByID = async (id) => {
  return new Promise((resolve, reject) => {
    Favorite.find({ user_id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot get Favorites"));
      } else {
        if (data.length != 0) {
          resolve(data);
        } else {
          reject(new Error("Cannot get Favorites"));
        }
      }
    })
      .populate("product_id")
      .populate({
        path: "product_id",
        model: "Products",
        populate: {
          path: "gender_id",
          model: "Genders",
        },
      })
      .populate({
        path: "product_id",
        model: "Products",
        populate: {
          path: "typeproduct_id",
          model: "TypeProducts",
        },
      });
  });
};

const insertFavorite = async (data) => {
  return new Promise((resolve, reject) => {
    const new_Favorite = new Favorite(data);
    new_Favorite.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Favorite to DB"));
      } else {
        resolve({ message: "Favorite added successfully." });
      }
    });
  });
};

const deleteFavorite = async (id) => {
  return new Promise((resolve, reject) => {
    Favorite.deleteOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot Delete Favorite"));
      } else {
        resolve({ message: "Favorite delete successfully." });
      }
    });
  });
};

//--------------------------------------------------------------------------
router.route("/get/id/:ID").get(authorization, (req, res) => {
  getFavoritesByID(req.params.ID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/add").post(authorization, (req, res) => {
  insertFavorite(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(String(err));
    });
});

router.route("/del/:id").delete(authorization, (req, res) => {
  deleteFavorite(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

module.exports = router;
