const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const { connection } = require("./configs/db");
const { authorAuth } = require("./controllers/author.auth");
const { AuthorRouter } = require("./routes/Author.route");

require("dotenv").config();
mongoose.set('strictQuery', true);
const app = express();
app.use(express.json());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/author", AuthorRouter);

app.get("/", (req, res) => {
  res.send("Hello BE");
});

app.get("/blogs", authorAuth, (req, res) => {
  return res.status(200).send({ reports: [{ "report 1": "asdfdas" }] });
});

app.listen(process.env.PORT || 5000, async () => {
  try {
    await connection;
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
    console.log("DB ERROR");
  }
  console.log("Listing ");
});
