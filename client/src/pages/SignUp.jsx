import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed import for react-router-dom
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({}); // Fixed typo from formaData to formData
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData, // Fixed typo here as well
      [e.target.id]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      setLoading(false);
      return;
    }

    setLoading(false);
    setError(null);
    setFormData({}); // Clear form data
    navigate("/verify-email"); // Redirect to sign-in page
  } catch (error) {
    setLoading(false);
    setError("Network error. Please check your connection and try again.");
  }
};

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="p-3 border rounded-lg"
          id="username"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          className="p-3 border rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="p-3 border rounded-lg"
          id="password"
          onChange={handleChange}
          disabled={loading}
        />

        <button
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p> {/* Fixed typo here */}
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignUp;
