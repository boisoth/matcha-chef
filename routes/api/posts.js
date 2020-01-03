const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      // User model for new post
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private

// Response Object
// {
//   "_id": "5e0fb05b3456f18164e56998",
//   "text": "This is my post number 4",
//   "name": "Boi Soth 4",
//   "avatar": "//www.gravatar.com/avatar/2320318a92ab0afb2b6c9fe3de203557?s=200&r=pg&d=mm",
//   "user": "5e0e8148806afa220447fc86",
//   "likes": [],
//   "comments": [],
//   "date": "2020-01-03T21:21:31.116Z",
//   "__v": 0
// }

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({date: -1}); // 1 for oldest first
    res.json(posts);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id
// @desc    Get all posts
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({ msg: "Post not found"})
    }
    res.json(post);

  } catch (err) {
    console.error(err.message);

    if(err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found"})
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id
// @desc    Get all posts
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    
    // Make sure the user is the only one who can delete
    if(post.user.toString() !== req.user.id){
      return res.status(401).json({msg: "Unauthorized user"})
    }

    await post.remove();

    res.json({msg: 'Post removed'})

  } catch (err) {
    console.error(err.message);
    if(err.kind === "ObjectId") {
      return res.status(404).json({msg: 'Post not found'})
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/like:id
// @desc    Link a post
// @access  Private

router.put('/like/:id', auth, async (req, res)=>{
  try {
    const post = await Post.findById(req.params.id);

    // If current user already liked a post
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
      return res.status(400).json({msg: "Post already liked"})
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg: "Server Error"})
  }
})

module.exports = router;
