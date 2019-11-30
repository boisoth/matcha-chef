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
    // User ID is passed from auth middleware which exposed the token ID then used in Profile Schema user field type -- mongoose.Schema.Types.ObjectId
    // Once we find a profile with the user, we populate user, and a list of items we want to bring in.

    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
