import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DashSidebar from "./DashSidebar";


const DashUpdateCategory = () => {
  const { id } = useParams();
  const [category_name, setCategory_Name] = useState("");
  

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get(`/api/v1/category/all-category/by-id/${id}`);
          // "/api/v1/products/all-inventory/by-id/" + id
        //);

        if (response) {
          const result = await response.data;
          setCategory_Name(result.data.category_name);
        
        }
      } catch (error) {
        //console.log(error);
      }
    };

    fetchData();
  },[id]);

  const validate = () => {
    const newErrors = {};
    if (!category_name.trim()) newErrors.name = "Name is required";
   
    return newErrors;
  };

  const updateData = async (e) => {
     //e.preventDefault();
    try {
      const update = await axios.put(
        `http://localhost:5000/api/v1/products/update-category/${id}`,
        { category_name:category_name }
      );

      if(update){
        alert("update successful.");
        navigate('/dashboard?tab=category');
       
      }
    } catch (error) {
      //console.log(error);
    }
  };

//   const handleChange = (e) => {
//     setName(e.target.value);  
//     setCategory(e.target.value);  
//     setQunatity(e.target.value);  
//     setPrice(e.target.value);  
//     setDescription(e.target.value);  
   
//   };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateData();
   
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      updateData();
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        updateData()

        //const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Something went wrong");
          setLoading(false);
          return;
        }
        navigate("/dashboard?tab=category");
        setLoading(false);
        setError(null);
        setFormData({}); // Clear form data
         navigate("/dashboard?tab=inventory-list"); // Redirect to the Inventory page
      } catch (error) {
        setLoading(false);
        setError("Network error. Please check your connection and try again.");
      }
    }
  };
  return (
    <div className="flex min-h-screen">
    {/* Sidebar */}
    <div className="w-1/5 bg-gray-800">
      <DashSidebar />
    </div>
  
    {/* Main Content */}
    <div className="flex-1 bg-gray-300 bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/i1_background.jpg')", backgroundOpacity: 0.5, transition: '0.5s' }}
    >
      <div className="max-w-lg p-5 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7 text-red-600">
          Update Category
        </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Name */}
        <input
          type="text"
        
          className="p-3 border rounded-lg"
          id="category_name"
        //   placeholder={name}
          value = {category_name}
          onChange={(e)=>{setName(e.target.value)}}
        />
        {error?.name && <p className="text-red-500">{error.name}</p>}

        {/* Category */}
       

        {/* Created At
        <input
          type="text"
          className="p-3 border rounded-lg bg-gray-100"
          //value={formData.createdAt}
          placeholder={}
          
        /> */}

        {/* Updated At */}
        {/* <input
          type="text"
          className="p-3 border rounded-lg bg-gray-100"
          value={formData.updatedAt}
          
        /> */}

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95"
          // disabled={loading}
          // aria-disabled={formData}
        >
          {loading ? "Loading..." : "Add Inventory"}
        </button> */}
        <input
          type="submit"
          value={"Update Category"}
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95"
        />
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
    </div>
    </div>
    
  );
};

export default DashUpdateCategory;
