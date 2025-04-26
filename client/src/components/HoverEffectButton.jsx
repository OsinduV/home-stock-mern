import React from "react";

const HoverEffectButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:bg-green-600 hover:scale-105"
    >
      {children}
    </button>
  );
};

export default HoverEffectButton;