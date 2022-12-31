const express = require("express");

const authorValidation = (req, res, next) => {
  if (req.method == "POST") {
    const info = req.body;
    if (info.author && info.username && info.email && info.password) {
      next();
    } else {
      res.status(400).send({ result: false, msg: "Field Required" });
    }
  } else {
    res.status(400).send({ result: false, msg: "Bad Request" });
  }
};

module.exports = { authorValidation };
