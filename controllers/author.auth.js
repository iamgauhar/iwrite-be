const jwt = require("jsonwebtoken");

require("dotenv").config();

const authorAuth = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1] || req.cookie?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        res.status(401).send({ msg: "Plz login again", err: err.message });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ msg: "Plz login again" });
  }
};

// module.exports = { authorAuth };
