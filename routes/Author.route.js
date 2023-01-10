const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { authorValidation } = require("../middlewares/SignupVlidation");
const { AuthorModel } = require("../models/Author.model");
const { redis } = require("../controllers/redis.storage");

require("dotenv").config();

const AuthorRouter = express.Router();

// -----------------------------{ Signup route  }---------------------------->

AuthorRouter.post("/signup", authorValidation, async (req, res) => {
  const { author, username, email, password, profilePic } = req.body;
  const newAuthor = await AuthorModel.findOne({
    $or: [{ email: email }, { username: username }],
  });
  // console.log(newAuthor);
  if (newAuthor) {
    res.status(400).send({ result: false, msg: "Author already exist" });
  }
  try {
    bcrypt.hash(password, 7, async (err, hashed) => {
      if (err) {
        return res.status(400).send({ result: false, msg: "Try again later" });
      }
      const authorInfo = new AuthorModel({
        author: author,
        email: email,
        username: username,
        profilePic: profilePic,
        password: hashed,
      });
      await authorInfo.save();
      res.status(201).send({ result: true, msg: "Author Added" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: false, msg: "Try after some time" });
  }
});

// -----------------------------{ Login route  }---------------------------->

AuthorRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const author = await AuthorModel.findOne({
    $or: [{ email: email }, { username: email }],
  });
  if (author) {
    bcrypt.compare(password, author.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { email, username: author.username },
          process.env.JWT_KEY,
          { expiresIn: "30 days" }
        );

        const refreshedToken = jwt.sign({ email }, process.env.JWT_KEY_2, {
          expiresIn: "40 days",
        });

        // res.cookie("token", token, { httpOnly: true });
        // res.cookie("refreshToken", refreshedToken, { httpOnly: true });

        redis.set("token", token);
        redis.set("refToken", refreshedToken);

        redis.mget("token", "refToken", (err, result) => {
          if (err) {
            res.status(400).send({ result: false, msg: "Invalid Credential" });
          } else {
            console.log(result);
            res.status(200).send({
              result: true,
              msg: " Login Successfull",
              token: result[0],
              refToken: result[1],
            });
          }
        });
      } else {
        res.status(401).send({ result: false, msg: "Invalid Credential" });
      }
    });
  } else {
    res.status(401).send({ result: false, msg: "Invalid Credential" });
  }
});

// -----------------------------{ Token Refreshing  }---------------------------->

AuthorRouter.get("/refreshtoken", (req, res) => {
  const refreshedToken = req.headers?.authorization?.split(" ")[1];
  if (refreshedToken) {
    jwt.verify(refreshedToken, process.env.JWT_KEY_2, async (err, decode) => {
      if (err) {
        res.status(401).send("Please login again");
      } else {
        const { email } = decode;
        let author = await AuthorModel.findOne({ email });
        const newToken = jwt.sign(
          { email, username: author.username },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );

        res.cookie("token", newToken, { httpOnly: true });
        res.status(200).send({
          result: true,
          token: newToken,
        });
      }
    });
  }
});

module.exports = { AuthorRouter };
