const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Blog = require("../models/Blog");

// @route   GET api/blog
// @desc    GET Blogs
// @access  Public
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();

    const latest = blogs.reverse().slice(0, 3);

    res.json(latest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/blog
// @desc    GET Blogs
// @access  Public
router.get("/all", auth, async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/blog
// @desc    POST Post
// @access  Public
router.post(
  "/",
  [[check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, name, image, url } = req.body;

    try {
      let blog = await Blog.findOne({ title });

      if (blog) {
        return res.status(400).json({ msg: "post already exists" });
      }

      const newBlog = new Blog({
        title,
        description,
        name,
        image,
        url,
      });

      blog = await newBlog.save();

      res.json(blog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
