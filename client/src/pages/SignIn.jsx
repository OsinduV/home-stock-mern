import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
 
  const [formaData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formaData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formaData)
       
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));

        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <div className="flex gap-2 mt-0">
          
          <Link to="/forgot-password">
            <span className="text-blue-700">Forgot Password?</span>
          </Link>
        </div>
        <button
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Havent an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignIn;
