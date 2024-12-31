const jwt = require("jsonwebtoken");

// Middleware to protect routes (authentication)
const protectedRoute = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from the Authorization header

  try {
    const decoded = jwt.verify(token, "your-secret-key"); // Verify the token and decode it
    req.userId = decoded.userId; // Attach userId from token payload to the request
    next(); // Token is valid, proceed to the next middleware/route handler
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

// Middleware to check if the user is already logged in (optional)
// This is useful to avoid allowing users to log in if they already have a valid token
const checkLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, "your-secret-key"); // Try to decode the token
      return res.status(400).json({ message: "You are already logged in" }); // If the token is valid, user is already logged in
    } catch (error) {
      return next(); // If the token is invalid, allow the login process to continue
    }
  }

  next(); // If no token is provided, continue to the next middleware (login route)
};

module.exports = {
  protectedRoute,
  checkLoggedIn,
};
