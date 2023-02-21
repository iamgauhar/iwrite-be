const mongoose = require("mongoose");

const AuthorModel = mongoose.model(
  "author",
  mongoose.Schema(
    {
      author: {
        type: String,
        require: true,
      },
      username: {
        type: String,
        require: true,
        
      },
      email: {
        type: String,
        require: true,
        
      },
      password: {
        type: String,
        require: true,
      },
      profilePic: {
        type: String,
        default: "",
      },
      token: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { AuthorModel };
