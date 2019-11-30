const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }); // User ID is passed from auth middleware which exposed the ID then used in Profile Schema user field type -- mongoose.Schema.Types.ObjectId
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
