const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Posts = require("../models/Posts");

// @route   GET api/business
// @desc    GET business details
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const post = await Posts.find({ user: req.user.id });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const post = await Posts.find();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/business
// @desc    GET business details
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/posts
// @desc    POST Post
// @access  Private
router.post(
  "/",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, name } = req.body;

    try {
      let post = await Posts.findOne({ title });

      if (post) {
        return res.status(400).json({ msg: "post already exists" });
      }

      const newPost = new Posts({
        title,
        description,
        name,
        user: req.user.id,
      });

      post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
