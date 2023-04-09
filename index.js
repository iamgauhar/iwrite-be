const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connection } = require("./configs/db");
const { authorAuth } = require("./controllers/author.auth");
const { AuthorRouter } = require("./routes/Author.route");
const { BlogRoute } = require("./routes/Blog.route");
const { authorAuthentication } = require("./middlewares/authorAuthentication");
const { blogModel } = require("./models/Blog.model");

require("dotenv").config();

mongoose.set("strictQuery", true);
const app = express();
app.use(express.json());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// ------------------{ All routes are used here }---------------------------->

app.use("/author", AuthorRouter);
app.use("/posts", BlogRoute);

app.get("/", async (req, res) => {
  res.json({ msg: "Welcome to my API" });
});

app.listen(process.env.PORT || 5000, async () => {
  try {
    await connection;
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
    console.log("DB ERROR");
  }
  console.log("Listing on 5000");
});
