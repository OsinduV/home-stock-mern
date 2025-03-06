import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";


const Header = () => {
  

  
  return (
    <header className="p-3 shadow-md bg-slate-200 ">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="flex-wrap text-sm font-bold sm:text-xl">
            <span className="text-slate-500">ITPM PROJECT</span>
            <span className="text-slate-700"> Y3S2</span>
          </h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden cursor-pointer sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden cursor-pointer sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            <Link to="sign-in">
              <li className="text-slate-700 hover:underline">Sign in</li>
            </Link>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
