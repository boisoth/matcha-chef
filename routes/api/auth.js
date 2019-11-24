const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// @route   GET api/auth
// @desc    Auth route
// @access  Private
router.get("/", auth, (req, res) => {
  res.send("Auth route");
});

module.exports = router;
