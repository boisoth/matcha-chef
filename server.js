const express = require("express");
const connectDB = require("./config/db");
const htmlRoutes = require("./routes/htmlRoutes");
const path = require("path");
const favicon = require("express-favicon");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Static Directory
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

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

// View Routes
app.use(htmlRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
