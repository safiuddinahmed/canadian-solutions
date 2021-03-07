const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Comments = require("../models/Comments");

// @route   GET api/comments
// @desc    GET comments details
// @access  Private
router.post("/get", auth, async (req, res) => {
  try {
    const { post } = req.body;

    const comment = await Comments.find({
      post: post,
    });
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts
// @desc    POST Post
// @access  Private
router.post(
  "/",
  [auth, [check("description", "Comment is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, name, post } = req.body;

    try {
      const newComment = new Comments({
        post,
        description,
        name,
        user: req.user.id,
      });

      comment = await newComment.save();

      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
