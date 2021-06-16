var expressFunction = require("express");
const router = expressFunction.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//--------------------------------------------------------------------------
const authorization = require("../config/authorize");
const key = "MY_KEY"; //อันนี้แล้วแต่จะตั้ง ต้องเหมือนกันใน authorize ด้วย
const User = require("../model/user.model");
//--------------------------------------------------------------------------

const makeHash = async (plainText) => {
  const result = await bcrypt.hash(plainText, 10);
  return result;
};

const insertUser = async (dataUser) => {
  return new Promise((resolve, reject) => {
    const new_user = new User(dataUser);
    new_user.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert User to DB"));
      } else {
        resolve({ message: "Signup Successfully" });
      }
    });
  });
};

const compareHash = async (plainText, hashText) => {
  return new Promise((reslove, reject) => {
    bcrypt.compare(plainText, hashText, (err, data) => {
      if (err) {
        reject(new Error("Error bcrypt compare"));
      } else {
        reslove({ status: data });
      }
    });
  });
};

const findUser = async (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Email"));
      } else {
        if (data) {
          resolve({
            id: data.id,
            email: data.email,
            password: data.password,
            usertype_id: data.usertype_id,
          });
        } else {
          reject(new Error("Cannot find Email"));
        }
      }
    }).populate("usertype_id");
  });
};

//--------------------------------------------------------------------------

router.route("/signup").post((req, res) => {
  makeHash(req.body.password)
    .then((hashText) => {
      var payload = new User(req.body);
      payload.password = hashText;

      insertUser(payload)
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((err) => {
          res.status(400).send(String(err));
        });
    })
    .catch((err) => {});
});

router.route("/signin").post(async (req, res) => {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const result_data = await findUser(payload.email);
    const loginStatus = await compareHash(
      payload.password,
      result_data.password
    );

    const status = loginStatus.status;

    if (status) {
      const token = jwt.sign(result_data, key, { expiresIn: 60 * 20 });

      const result = {
        id: result_data.id,
        usertype: result_data.usertype_id.name,
      };

      res.status(200).json({ result, token, status });
    } else {
      res.status(404).json({ status });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//--------------------------------------------------------------------------

const findUserByID = async (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find User By ID"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot find User By ID"));
        }
      }
    }).populate("usertype_id");
  });
};

const updateUser = async (id, data) => {
  return new Promise((resolve, reject) => {
    if (id == undefined) {
      reject(new Error("Cannot update User"));
    }
    User.updateOne({ _id: id }, { $set: data }, (err, data) => {
      if (err) {
        reject(new Error("Cannot update User"));
      } else {
        resolve({ message: "User update successfully." });
      }
    });
  });
};

//--------------------------------------------------------------------------

router.route("/get/id/:ID").get(authorization, (req, res) => {
  findUserByID(req.params.ID)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send(String(err));
    });
});

router.route("/put").put(authorization, (req, res) => {
  //----req[0] ID, req[1] ช้อมูล
  updateUser(req.body[0].id, req.body[1])
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(String(err));
    });
});

module.exports = router;
