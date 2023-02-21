const mongoose = require("mongoose")

const blogModel = mongoose.model("blog", mongoose.Schema({
    title: String,
    thumbnail: String,
    description: String,
    category: [],
    authorID: String,
    date: Date,

}))

module.exports = {blogModel}