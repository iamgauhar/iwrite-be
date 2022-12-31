const express = require("express");
const { connection } = require("./configs/db");
const { authorAuth } = require("./controllers/author.auth");
const { AuthorRouter } = require("./routes/Author.route");

const app = express();
app.use(express.json());

app.use("/author", AuthorRouter);

app.get("/", (req, res) => {
  res.send("Hello BE");
});

app.get("/blogs", authorAuth, (req, res) => {
  return res.status(200).send({ reports: [{ "report 1": "asdfdas" }] });
});

app.listen(8090, async () => {
  try {
    await connection;
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
    console.log("DB ERROR");
  }
  console.log("Listing 8090");
});
