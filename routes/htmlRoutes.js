const express = require("express");
const router = express.Router();

// Views
router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

router.get("/form", (req, res) => {
  res.render("form", { title: "Form" });
});

module.exports = router;
