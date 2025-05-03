import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify'
import DashSidebar from "./DashSidebar";


const AddInventoryForm = () => {
  const [formData, setFormData] = useState({
    category_id: "",
    category_name: "",
    
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.category_id.trim()) newErrors.category_id = "ID is required";
    if (!formData.category_name.trim()) newErrors.category_name = "Category Name is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

     if (Object.keys(validationErrors).length === 0) {
       try {
         setLoading(true);
         const res = await fetch("http://localhost:5000/api/v1/category/add-category", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
          body: JSON.stringify(formData),
          
         });

        const data = await res.json();
        console.log('Response Data:', data);

        if (!res.ok) {
          setError({ general: data.message || "Something went wrong" });
          setLoading(false);
          toast.error(data.msg);
          return;
        }

        setLoading(false);
        setFormData({
          category_id: "",
          category_name: "",
         
        });
        toast.success("Category added successfully!");
        setTimeout(() => {
          navigate("/dashboard?tab=category");
        }, 1000);
      } catch (error) {
        setLoading(false);
        setError({ general: "Network error. Please check your connection and try again." });
        toast.error("Network error. Please check your connection and try again.");
      }
    }
};
  
  return (
    <div className="flex">
       <DashSidebar/> 
    <div className="w-full max-w-screen-xl mx-auto p-6 min-h-screen bg-gray-300 bg-cover bg-center" 
    style={{ backgroundImage: "url('/images/i1_background.jpg')", backgroundOpacity: 0.5, transition:'0.5s'  }}>
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-yellow-300">Add Category</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {[
          { id: "category_id", type: "text", placeholder: "ID" },
          { id: "category_name", type: "text", placeholder: "Category Name" },
          
        ].map(({ id, type, placeholder }) => (
          <div key={id}>
            <input
              type={type}
              placeholder={placeholder}
              className="p-3 border rounded-lg w-full"
              id={id}
              value={formData[id]}
              onChange={handleChange}
            />
            {error[id] && <p className="text-red-500">{error[id]}</p>}
          </div>
        ))}

        {/* <input
          type="text"
          className="p-3 border rounded-lg bg-gray-100 w-full"
          value={formData.createdAt}
          placeholder="Created Date"
          id="created_date"
          readOnly
        />

        <input
          type="text"
          className="p-3 border rounded-lg bg-gray-100 w-full"
          value={formData.updatedAt}
          readOnly
        /> */}

        <button
          type="submit"
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95"
          disabled={loading}
          //  onClick={handleSubmit}
          
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
         <ToastContainer/> 
      </form>

      {error.general && <p className="text-red-500 mt-3">{error.general}</p>}
    </div>
    </div>
    </div>
  );
};

export default AddInventoryForm;

