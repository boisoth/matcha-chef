const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// @route   GET api/auth
// @desc    Auth route
// @access  Private
router.get("/", auth, (req, res) => {
  // Auth middleware decoded/verified our jwt and passed the req.user back
  // Time to sleep. =)
});

module.exports = router;
