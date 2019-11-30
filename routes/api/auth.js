const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");

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

// Test auth route ****
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public

router.post(
  "/",
  [
    // Middleware for validating
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    // Check for errors from request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure body
    const { email, password } = req.body;

    // Check if the user exists
    try {
      // Returns the user object when email is found
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Password matching from req.password to the saved user.password from User.findOne
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
