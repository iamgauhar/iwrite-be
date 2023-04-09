const jwt = require("jsonwebtoken");
require("dotenv").config();
const authorAuthentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  // console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (decode) {
        const authorUsername = decode.username;
        req.body.authorID = authorUsername;
        next();
      } else {
        res.json({ msg: "Please login" });
      }
    });
  } else {
    res.json({ msg: "Please login" });
  }
};

module.exports = { authorAuthentication };
