import React from 'react'
import axios from 'axios'
  
export default function DashInventory() {
  return (
   <div>
     
    <div className="addInbentory-btn">
    <button
     
      className="absolute top-50 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out"
    >
      + Add Inventory
    </button>
    </div>
    
   </div>
  )
}

