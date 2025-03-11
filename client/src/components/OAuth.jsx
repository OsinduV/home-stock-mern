import { app } from "../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({prompt: 'select_account'})  //always ask select an acoount
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.error("Couldn't sign in with Google", error);
    }
  };

  return (
    <button
      className="p-3 text-white uppercase bg-red-700 rounded-lg hover:opacity-95"
      type="button"
      onClick={handleGoogleClick}
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
