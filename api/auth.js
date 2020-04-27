const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const model = require("../router/router-model.js");
const secrets = require("../secrets.js");

const router = express.Router();

module.exports = {
  router,
  generateToken,
  validateToken,
};

router.post("/register", validateUserObj(true), (req, res) => {
  const creds = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, secrets.hashRounds),
  };
  model
    .addUser(creds)
    .then((user) => {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to add user to database" });
    });
});

router.post("/login", validateUserObj(false), (req, res) => {
  const creds = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, secrets.hashRounds),
  };
  model
    .findUserByEmail(req.body.email)
    .then((user) => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
      } else {
        res
          .status(404)
          .json({ errorMessage: "No user with the specified email" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: "Failed to retrieve list of users from database",
      });
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

function generateToken(user) {
  const payload = {
    id: user.id,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

// Middleware to check the token
function validateToken(req, res, next) {
  if (req.headers.authorization === undefined) {
    res.status(401).json({ message: "authorization header must be given" });
    return;
  }
  try {
    if (!jwt.verify(req.headers.authorization, secrets.jwtSecret)) {
      res.status(401).json({ message: "authorization header is invalid" });
      return;
    }
  } catch (err) {
    res.status(401).json({ message: "authorization header is invalid" });
    return;
  }
  req.token = jwt.decode(req.headers.authorization);
  next();
}