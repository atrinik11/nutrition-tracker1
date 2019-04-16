const db = require("../Models");
const request = require("request");
const moment = require("moment");

module.exports = {
  findOneUser: (req, res) => {
    db.User.findOne()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  },
  createUser: (req, res) => {
    console.log("User to be saved(controller): ", req);
    const { userName, password } = req.body;

    //Adding the validation
    db.User.findOne({ userName: userName }, (err, userMatch) => {
      if (userMatch) {
        return res.json({ error: "Usernaem already taken. Try new!" });
      }
      db.User.create(req.body)
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.status(422).json(err);
        });
    });
  },
  getProfile: (req, res) => {
    db.User.findOne({ userName: req.params.user })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },
  updateUser: (req, res) => {
    db.User.findOneAndUpdate(
      { userName: req.body.user },
      {
        userName: req.body.user,
        age: req.body.age,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
        phoneNumber: req.body.phoneNumber,
        goal: req.body.goal,
        recommendedInTake: req.body.recommendedInTake
      },
      { new: true, upsert: true },
      (error, result) => {
        res.send(result);
      }
    );
  }
};
