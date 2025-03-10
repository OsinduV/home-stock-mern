import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

import Header from './components/Header.jsx';
<<<<<<< HEAD
import EmailVerificationPage from './pages/EmailVerificationPage.jsx';
=======
import Footer from './components/Footer.jsx';
import EmailVerificationPage from './pages/EmailVerificationPage.jsx';

>>>>>>> 84167976ee908f471a8dd5d37ef83cfb3adfbb9a

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
<<<<<<< HEAD



=======
>>>>>>> 84167976ee908f471a8dd5d37ef83cfb3adfbb9a
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}
