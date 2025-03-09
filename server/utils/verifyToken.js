import jwt from 'jsonwebtoken'


export const verifyToken=(req,res,next)=>
{
  const token = req.cookies.access_token;

  if(!token) return res.status(401).json({success:false,message:"Unauthorized-o token provided"});
    

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded) return res.status(401).json({success:false,message:"Unauthrized-invalid token"});

    req.userId=decoded.userId;
    next();
    
  } catch (error) {

    console.log("Error in verifyToke",error);
    return res.status(500).json({success:false,message:"server error"});
    
  }
}