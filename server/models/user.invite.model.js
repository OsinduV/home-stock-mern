 import mongoose from "mongoose";
 
 const homeInviteSchema=({
  email: { type: String, required: true },
  homeId: { type: mongoose.Schema.Types.ObjectId, ref: "Home", required: true },
  token: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "expired"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now, expires: "1d" }, // auto-delete after 1 day
});

const Invite = mongoose.model("HomeInvite", homeInviteSchema);
export default Invite;
