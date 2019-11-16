const express = require("express");
const connectDB = require("./config/db");
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/images" });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Static Directory
app.use(express.static("public"));

// EJS Config
app.set("views", "./views");
app.set("view engine", "ejs");

// Init Middleware
app.use(express.json({ extended: false }));

// API Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

app.post("/upload", upload.single("photo"), (req, res) => {
  if (req.file) {
    res.json(req.file);
  } else throw "error";
});

// Views
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
