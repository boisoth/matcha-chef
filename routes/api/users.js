const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public

// Postman -- Register body as raw
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
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }

      // Setting gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm" // for default user icon if no gravatar
      });

      // Create a new user
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Create salt and hash
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // Save the user to DB
      await user.save();

      // Before signing a JWT, user.save() returns a promise from mongoose to use in payload
      // Payload will have a user object with the id
      // We then call jwt.sign() with the following arguments:
      // payload object,
      // config string that holds the secret,
      // expiration object set to 1 hour,
      // and a callback to recieve the token

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

// Get users gravatar

// Encrypt  password

// Return JWT
