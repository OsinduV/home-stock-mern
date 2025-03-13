
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import { Toaster } from "react-hot-toast";

import { useSelector } from "react-redux";

import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";


export default function App() {
  
const { currentUser, loading, error } = useSelector((state) => state.user);
console.log(currentUser);
// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  if (!currentUser) {
    return <Navigate to="/sign-in" replace />;
  }

  if (currentUser && !currentUser.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  if (currentUser && currentUser.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};
 
return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sign-in"
        element={
          <RedirectAuthenticatedUser>
            <SignIn />
          </RedirectAuthenticatedUser>
        }
      />

      <Route
        path="/sign-up"
        element={
          <RedirectAuthenticatedUser>
            <SignUp />
          </RedirectAuthenticatedUser>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route
        path="/forgot-password"
        element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>
        }
      />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>


<Route
path='/reset-password/:token'
element={

  <RedirectAuthenticatedUser>

<ResetPasswordPage/>

  </RedirectAuthenticatedUser>
}


/>


    </Routes>

    <Toaster />

    <Footer />
  </BrowserRouter>
);
}
