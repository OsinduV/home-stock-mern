import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeCreate = () => {
  const [homeName, setHomeName] = useState("");
  const [newName, setNewName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [home, setHome] = useState(null);
  const [members, setMembers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/home/my-home", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedHome = res.data.home;
        setHome(fetchedHome);
        setNewName(fetchedHome.name);
        fetchHomeMembers(fetchedHome._id);
      } catch {
        console.log("No home found or error fetching home");
      }
    };

    const fetchHomeMembers = async (homeId) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/home/members/${homeId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMembers(res.data.members);
      } catch {
        console.log("Error fetching home members");
      }
    };

    fetchHome();
  }, [token]);

  const createHome = async () => {
    if (!homeName) return toast.error("Please enter a home name.");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/home/create",
        { name: homeName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("🏡 Home created successfully!");
      const newHome = res.data;
      setHome(newHome);
      setNewName(newHome.name);
      fetchHomeMembers(newHome._id);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create home.");
    }
  };

  const updateHome = async () => {
    if (!newName) return toast.error("Enter new name to update.");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/home/edit/${home._id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("🏠 Home name updated!");
      setHome(res.data.home);
    } catch {
      toast.error("Failed to update home.");
    }
  };

  const sendInvite = async () => {
    if (!inviteEmail || !home?._id) {
      return toast.error("Email and Home ID required.");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/home/send",
        { email: inviteEmail, homeId: home._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("📧 Invitation sent!");
    } catch {
      toast.error("Failed to send invite.");
    }
  };

  const deleteHome = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your home?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/home/delete/${home._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("🏚️ Home deleted.");
      setHome(null);
      setHomeName("");
      setNewName("");
      setMembers([]);
    } catch {
      toast.error("Failed to delete home.");
    }
  };

  return (
    <div className="max-w-3xl p-5 mx-auto mt-10 border rounded-lg shadow-lg">
      <ToastContainer />

      {/* CREATE HOME */}
      {!home ? (
        <>
          <h2 className="mb-4 text-xl font-bold">🏡 Create a Home</h2>
          <input
            type="text"
            placeholder="Enter Home Name"
            value={homeName}
            onChange={(e) => setHomeName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            onClick={createHome}
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Create Home
          </button>
        </>
      ) : (
        <>
          <h2 className="mb-4 text-xl font-bold">🏠 Your Home Details</h2>
          <p>
            <strong>Name:</strong> {home.name}
          </p>

          {/* EDIT NAME */}
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">✏️ Edit Home Name</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <div className="flex gap-2">
              <button
                onClick={updateHome}
                className="flex-1 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700"
              >
                Update Name
              </button>
              <button
                onClick={deleteHome}
                className="flex-1 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete Home
              </button>
            </div>
          </div>

          {/* INVITE USER */}
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">📧 Send Invitation</h3>
            <input
              type="email"
              placeholder="Enter Email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <button
              onClick={sendInvite}
              className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Send Invitation
            </button>
          </div>

          {/* MEMBERS TABLE */}
          <div className="mt-8">
            <h3 className="mb-3 text-lg font-semibold">👥 Home Members</h3>
            {members.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border border-gray-300 rounded-lg">
                  <thead className="text-white bg-gray-700">
                    <tr>
                      <th className="px-4 py-2">No</th>
                      <th className="px-4 py-2">Username</th>
                      <th className="px-4 py-2">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => (
                      <tr
                        key={member._id}
                        className="odd:bg-gray-100 even:bg-white"
                      >
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{member.username}</td>
                        <td className="px-4 py-2">{member.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No members found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeCreate;
