const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware to pass into protected routes before callback req/res
// After registration of users, JWT will sign a new token to that user
// We then pass that token in from the request header to authenticate
// When we recieve the token in the header, we call the jwt.verify() method
// with the token(user id etc) and the secret.
// We recieve a callback with the verified users, store it as the req.user and pass it
// to any other next() middleware within the chain

module.exports = function(req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    //
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);

    // Send decoded jwt to protected routes with _id
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token is not valid!!!!" });
  }
};
