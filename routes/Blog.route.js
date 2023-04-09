const express = require("express");
const { authorAuthentication } = require("../middlewares/authorAuthentication");
const { blogModel } = require("../models/Blog.model");

const BlogRoute = express.Router();

// -------------- {Fetching all Posts}------------------------------>

BlogRoute.get("/all-posts", async (req, res) => {
    const all_posts = await blogModel.find();
    res.json(all_posts);
});

// ------------{ Using author authentcation middleware here }---------------->
BlogRoute.use(authorAuthentication);



// ------------{ Fetching all post of a perticular author }---------------->

BlogRoute.get("/author-posts", async (req, res) => {
    const userID = req.body.authorID;
    const authorPost = await blogModel.find({ userID: userID });
    res.send(authorPost);
});

// ------------{ Here is the route for creating a blog post... }---------------->
BlogRoute.post("/create-blog-post", async (req, res) => {
    const article = req.body;
    try {
        const new_article = await new blogModel(article);
        new_article.save();
        res.json({ result: true, msg: "Blog Post created successfuly!" });
    } catch (err) {
        res.json({
            result: false,
            msg: "Please login/ Unable to create post.",
            err: err.message,
        });
    }
});

module.exports = { BlogRoute };
