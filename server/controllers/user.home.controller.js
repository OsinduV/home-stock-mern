import Home from "../models/user.home.model.js";
import User from "../models/user.model.js";
import Invite from "../models/user.invite.model.js";
import crypto from 'crypto'
import { sendInvitationEmail } from "../mailtrap/mailtrap.config.js";

// Create a new home
export const createHome = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Home name is required." });
  }

  try {
    // ✅ Check if the user already created a home
    const existingHome = await Home.findOne({ createdBy: req.user._id });

    if (existingHome) {
      return res
        .status(403)
        .json({ message: "You have already created a home." });
    }

    const home = new Home({
      name,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    await home.save();

    res.status(201).json({
      message: "Home created successfully.",
      homeId: home._id,
    });
  } catch (error) {
    console.error("Create Home Error:", error);
    res.status(500).json({ message: "Server error while creating home." });
  }
};

export const getUserHome = async (req, res) => {
  try {
    const home = await Home.findOne({ createdBy: req.user._id });

    if (!home) {
      return res.status(404).json({ message: "No home found for this user." });
    }

    res.status(200).json({
      message: "Home fetched successfully.",
      home,
    });
  } catch (error) {
    console.error("Get User Home Error:", error);
    res.status(500).json({ message: "Server error while fetching home." });
  }
};

// PUT /api/home/edit/:id
export const editHomeName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Home name is required." });
  }

  try {
    const home = await Home.findById(id);

    if (!home) {
      return res.status(404).json({ message: "Home not found." });
    }

    // Only the creator can edit the home
    if (home.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to edit this home." });
    }

    home.name = name;
    await home.save();

    res.status(200).json({ message: "Home name updated successfully.", home });
  } catch (error) {
    console.error("Edit Home Name Error:", error);
    res.status(500).json({ message: "Server error while updating home name." });
  }
};
// DELETE /api/home/delete/:id
export const deleteHome = async (req, res) => {
  const { id } = req.params;

  try {
    const home = await Home.findById(id);

    if (!home) {
      return res.status(404).json({ message: "Home not found." });
    }

    // Only the creator can delete the home
    if (home.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this home." });
    }

    // ✅ Correct: use the model to delete
    await Home.findByIdAndDelete(id);

    res.status(200).json({ message: "Home deleted successfully." });
  } catch (error) {
    console.error("Delete Home Error:", error);
    res.status(500).json({ message: "Server error while deleting home." });
  }
};



export const sendInvitation=async(req,res)=>
{
  const {email,homeId}=req.body;
   if (!email || !homeId) {
     return res
       .status(400)
       .json({ message: "Email and Home ID are required." });
   }

   try {

    const token = crypto.randomBytes(20).toString("hex");

    // Create a new invite document
    const invite = new Invite({
      email,
      homeId,
      token,
    });

    await invite.save();

    // Send invitation email
    await sendInvitationEmail({
      email,
      homeId,
      token,
    });

    res.status(200).json({ message: "Invitation sent successfully!" });
    
   } catch (error) {
     console.error("Error sending invitation:", error);
     res
       .status(500)
       .json({ message: "Server error while sending invitation." });
   }
}



export const acceptInvitation = async (req, res) => {
  const { token } = req.params;

  try {
    // Find the invite by token
    const invite = await Invite.findOne({ token });

    if (!invite) {
      return res.status(404).json({ message: "Invitation not found." });
    }

    // Check if the invite is already accepted or expired
    if (invite.status === "accepted") {
      return res
        .status(400)
        .json({ message: "You have already accepted this invitation." });
    }

    if (invite.status === "expired") {
      return res.status(400).json({ message: "This invitation has expired." });
    }

    // Find the home the invite is for
    const home = await Home.findById(invite.homeId);

    if (!home) {
      return res.status(404).json({ message: "Home not found." });
    }

    // Add the user to the home members
    const user = req.user; // Assuming the user is authenticated with middleware
    if (!home.members.includes(user._id)) {
      home.members.push(user._id);
      await home.save();
    }

    // Update the invite status to accepted
    invite.status = "accepted";
    await invite.save();

    res.status(200).json({ message: "Invitation accepted successfully!" });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    res
      .status(500)
      .json({ message: "Server error while accepting invitation." });
  }
};



// Controller to get all members in user's home
// Controller to get all members by homeId
export const getHomeMembers = async (req, res) => {
  try {
    const { homeId } = req.params;

    // Step 1: Find the home by homeId
    const home = await Home.findById(homeId);

    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    // Optional: Check if the current user is allowed to access this home
    //  // Optional: Check if the current user is allowed to access this home
    // const isMemberOrCreator =
    //   home.createdBy.toString() === req.user.id ||
    //   home.members.includes(req.user.id);

    // if (!isMemberOrCreator) {
    //   return res.status(403).json({ message: "Access denied" });
    // }
    // Step 2: Fetch user info for all members in the home
    const members = await User.find(
      { _id: { $in: home.members } },
      "username email"
    );

    return res.status(200).json({ members });
  } catch (error) {
    console.error("❌ Error fetching members:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


