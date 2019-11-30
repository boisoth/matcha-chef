const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Auth route
// @access  Private

// auth middleware docodes and verify the jwt and sends back the req.user
// We then async await the callback to find a user with the req.user.id and select that
// object without the password

/** The user data decoded from the JWT verify method
 * {
    "_id": "5de1eb4053561348b41213bc",
    "name": "Boi Soth",
    "email": "boisoth@gmail.com",
    "avatar": "//www.gravatar.com/avatar/f2da00e8c5821e61f796feecf218941b?s=200&r=pg&d=mm",
    "date": "2019-11-30T04:08:32.208Z",
    "__v": 0
 * }
 */

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
