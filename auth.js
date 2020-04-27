const jwt = require("jsonwebtoken");
const secrets = require("./secrets.js");

module.exports = {
  generateToken,
  validateToken,
};

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
