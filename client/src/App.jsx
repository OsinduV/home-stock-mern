
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
import DashAddInventory from "./components/DashAddInventory.jsx";

export default function App() {
  

 
return (
    <BrowserRouter>
      <Header />
      <Routes>
         <Route
          path="/"
          element={
          
              <Home />
          
          }
        />
        <Route
          path="/sign-in"
          element={
           
              <SignIn />
          
          }
        />
        <Route
          path="/sign-up"
          element={
          
              <SignUp />
            
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
       
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} /> 
        </Route> 
        <Route path = "/add-inventory"element={<DashAddInventory/>}/>
      </Routes>

      <Toaster />

      <Footer />
    </BrowserRouter>
  );
}
