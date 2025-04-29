import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'
export const verifyToken=(req,res,next)=>
{
  const token=req.cookies.access_token;

if(!token)return next(errorHandler(401,'Unauthorized'));

// jwt.verify(token, process.env.JWT_SECRET,(err,user)=>
// {
//   if(err) return next(errorHandler(403,'Forbidden'));
//   req.user=user;
//   next();
// }  );
// }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }

    // Log the decoded token for debugging
    console.log("Decoded token:", decoded);

    // Attach the decoded user ID to the request object
    // Handle both possible formats: { id: ... } and { userId: ... }
    req.user = {
      _id: decoded.id,
      isAdmin:decoded.isAdmin
    };
    
    console.log("User ID set in request:", req.user._id);
    next();
  } catch (error) {
    console.error("Error in verifyToken:", error);
    return next(errorHandler(500, "Server error during token verification"));
  }
};

