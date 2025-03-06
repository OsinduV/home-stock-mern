import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
// import { sentVerificationEmail } from "../mailtrap/emails.js";




import {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../mailtrap/mailtrap.config.js";






export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All details are required" });
    }

    // Check if the user already exists
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    let newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 15* 60 * 1000, // 15 minutes expiration
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token and set cookie
    const restToken=generateTokenAndSetCookie(res, newUser._id);



    





    // Send verification email
    await sendEmail({
      email: newUser.email,
      subject: `Hello ${newUser.username}! Verify your email for HomeStock SignUp `,
      verificationToken: verificationToken,
      category:"Email Verification"
    });

    console.log("Verification Token:", verificationToken);

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);

    // Ensure we only delete the user if it was created
    if (newUser?._id) {
      await User.findByIdAndDelete(newUser._id);
    }

    next(error);
  }
};


export const verifyEmail = async (req, res) => {
const {code}=req.body;

try{
  const user=await User.findOne(
    {
      verificationToken:code,
      verificationTokenExpiresAt:{$gt:Date.now()}
    }
  );

  if(!user)
  {
    return res.status(400).json({
      success:false,
      message:"Invalid or expired verification code"
    })
  }
user.isVarified=true;
user.verificationToken=undefined;
user.verificationTokenExpiresAt=undefined;
await user.save();

 await sendWelcomeEmail({
   email: user.email,
   subject: `Hello ${user.username}! successfully Verified your email in HomeStock  `,
   username:user.username,
   category: "Email Verification",
 });
 res.status(200).json({success:true,
  message:'Email verified successfully',user
 })

}
catch(error)
{
  console.log('error verified email',email);
res.status(500).json({success:false,message:"user not verified server error"});
}



};





export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    // Compare passwords
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Optional: Add expiration time for security
    });

    // Exclude password from the response
    const { password: pass, ...rest } = validUser.toObject();

    // Send the token as an HTTP-only cookie and respond with user data
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};



export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(25).toString("hex");
    const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour expiration

    // Store the token in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    // Send the email with the reset link
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendPasswordResetEmail({
      email: user.email,
      subject: `Hello ${user.username}! Reset Your Password`,
      resetURL,
      category: "Password Reset",
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Password reset link sent to your email",
      });
  } catch (error) {
    console.log("Error in forgotPassword:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const {password}=req.body;

    // Find user with the given reset token & check expiration
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }, // Ensures the token is still valid
    });

    // Validate user & token
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update user details
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Remove reset token
    user.resetPasswordExpiresAt = undefined; // Remove expiration timestamp

    // Save changes to the database
    await user.save();

    // Send success email (optional)
    await sendResetSuccessEmail({email:user.email});

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log("Error in resetPassword:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
  }
};
