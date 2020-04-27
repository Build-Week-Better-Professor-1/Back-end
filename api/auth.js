const express = require("express");
const bcrypt = require("bcryptjs");

const model = require("../router/router-model.js");
const secrets = require("../secrets.js");

const router = express.Router();

router.post("/register", validateUserObj(true), (req, res) => {
  const creds = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, secrets.hashRounds),
  };
  model
    .addUser(req.body)
    .then((user) => {
      // TODO: generate token and send with response
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to add user to database" });
    });
});

function validateUserObj(checkForName) {
  return function (req, res, next) {
    const missingFields = [];
    if (req.body.email === undefined) missingFields.push("email");
    if (req.body.password === undefined) missingFields.push("password");
    if (checkForName && req.body.name === undefined) missingFields.push("name");

    if (missingFields.length > 0) {
      res.status(404).json({
        errorMessage: `The following required fields are missing: ${missingFields}`,
      });
    }

    next();
  };
}

module.exports = {
  router,
};
