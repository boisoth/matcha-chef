const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    // Middleware for validating
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters "
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // Check for errors from request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure body
    const { name, email, password } = req.body;

    // Check if the user exists
    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exist" }] });
      }

      // Setting gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mn" // for default user icon if no gravatar
      });

      // Create a new user
      user = new User({
        name,
        email,
        avatar,
        password
      });

      res.send("User route");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

// Get users gravatar

// Encrypt  password

// Return JWT
