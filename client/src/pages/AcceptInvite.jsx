import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AcceptInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAcceptInvite = async () => {
    setIsAccepting(true);
    try {
     const backendUrl = "http://localhost:5000/api";

      const res = await axios.get(`${backendUrl}/home/accept/${token}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 Must be logged in
        },
      });

      toast.success("🎉 Invitation accepted successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      toast.error(errro);
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <ToastContainer />
      <h1 className="text-xl font-bold">You've been invited to join a Home!</h1>
      <p className="text-gray-600">
        Click the button below to accept your invitation.
      </p>
      <button
        onClick={handleAcceptInvite}
        disabled={isAccepting}
        className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isAccepting ? "Accepting..." : "Accept Invitation"}
      </button>
    </div>
  );
};

export default AcceptInvite;
