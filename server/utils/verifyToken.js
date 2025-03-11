import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js"; // Ensure you have an error handler

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized: No token provided"));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }

    // Attach the decoded user ID to the request object
    req.user = { _id: decoded.userId }; // Use req.user instead of req.userId
    next();
  } catch (error) {
    console.error("Error in verifyToken:", error);
    return next(errorHandler(500, "Server error during token verification"));
  }
};
