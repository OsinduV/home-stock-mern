import {errorHandler} from '../utils/error.js';

import User from "../models/user.model.js"

import bcryptjs from 'bcryptjs'
import { deleteMediaFromCloudinary, uploadMedia } from '../utils/cloudinary.js';



export const signout = (req, res, next) => {
    try {
      res
        .clearCookie('access_token')
        .status(200)
        .json('User has been signed out');
    } catch (error) {
      next(error);
    }
  };



export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found"));

    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};




export const updateUser = async (req, res, next) => {
  // Check if the user is updating their own account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    // Check if the request body contains valid fields
    const { username, email, password, avatar } = req.body;

    if (!username && !email && !password && !avatar) {
      return next(errorHandler(400, "No valid fields provided for update"));
    }

    // Fetch the current user document
    const currentUser = await User.findById(req.params.id);
    
    if (!currentUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Delete old avatar from Cloudinary only if it's a Cloudinary URL
    // if (
    //   currentUser.avatar &&
    //   currentUser.avatar.includes("cloudinary.com") // Check if the URL is from Cloudinary
    // ) {
    //   const publicId = currentUser.avatar.split("/").pop().split(".")[0]; // Extract public ID
    //   try {
    //     await deleteMediaFromCloudinary(publicId);
    //   } catch (error) {
    //     console.error("Error deleting old avatar:", error);
    //     // Log the error but continue with the update
    //   }
    // }

    // Upload new photo if provided
    // let photoUrl = currentUser.avatar; // Default to existing avatar
    // if (avatar) {
    //   try {
    //     const cloudResponse = await uploadMedia(avatar);
    //     photoUrl = cloudResponse.secure_url;
    //     console.log("New avatar URL:", photoUrl);
    //   } catch (error) {
    //     console.error("Error uploading new avatar:", error);
    //     return next(errorHandler(500, "Failed to upload new avatar"));
    //   }
    // }

    // Prepare the update object
    const updateFields = {
      username: username || currentUser.username,
      email: email || currentUser.email,
      avatar: avatar,
      password: password
        ? bcryptjs.hashSync(password, 10)
        : currentUser.password,
      isVerified: true, // Always set isVerified to true
    };

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    // Remove the password field from the response
    const { password: _, ...rest } = updatedUser._doc;

    // Send the updated user data in the response
    res.status(200).json(rest);
  } catch (error) {
    // Handle validation errors (e.g., duplicate username or email)
    if (error.code === 11000) {
      return next(errorHandler(400, "Username or email already exists"));
    }

    // Log the error for debugging
    console.error("Error updating user:", error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
