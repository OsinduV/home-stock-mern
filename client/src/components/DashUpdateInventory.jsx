import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DashSidebar from "./DashSidebar";


const DashUpdateInventory = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQunatity] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get(`/api/v1/products/all-inventory/by-id/${id}`);
          // "/api/v1/products/all-inventory/by-id/" + id
        //);

        if (response) {
          const result = await response.data;
          setName(result.data.name);
          setCategory(result.data.category);
          setQunatity(result.data.quantity);
          setPrice(result.data.price);
          setSupplier(result.data.supplier);
          setDescription(result.data.description);
          console.log(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },[id]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!quantity || isNaN(quantity) || quantity <= 0) newErrors.quantity = "Quantity must be a valid positive number";
    if (!price || isNaN(price) || price <= 0) newErrors.price = "Price must be a valid positive number";
    if (!supplier.trim()) newErrors.supplier = "Supplier is required";
    return newErrors;
  };

  const updateData = async (e) => {
     //e.preventDefault();
    try {
      const update = await axios.put(
        `http://localhost:5000/api/v1/products/update-inventory/${id}`,
        { name:name, category:category, quantity:quantity, price:price,supplier:supplier, description:description }
      );

      if(update){
        alert("update successful.");
        navigate('/dashboard?tab=inventory');
       
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
        navigate("/dashboard?tab=inventory");
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
          Update Inventory
        </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Name */}
        <input
          type="text"
        
          className="p-3 border rounded-lg"
          id="name"
        //   placeholder={name}
          value = {name}
          onChange={(e)=>{setName(e.target.value)}}
        />
        {error?.name && <p className="text-red-500">{error.name}</p>}

        {/* Category */}
        <input
          type="text"
        //   placeholder="Category"
          className="p-3 border rounded-lg"
          id="category"
          value={category}
      
          onChange={(e)=>{setCategory(e.target.value)}}
          //value = {category}
        />
        {error?.category && <p className="text-red-500">{error.category}</p>}

        {/* Quantity */}
        <input
          type="number"
        //   placeholder="Quantity"
          className="p-3 border rounded-lg"
          id="quantity"
          value={quantity}
          onChange={(e)=>{setQunatity(e.target.value)}}
        />
        {error?.quantity && <p className="text-red-500">{error.quantity}</p>}

        {/* Price */}
        <input
          type="number"
          //placeholder="Price"
          className="p-3 border rounded-lg"
          id="price"
          //value={price}
          value={price}
          onChange={(e)=>{setPrice(e.target.value)}}
        />
        {error?.price && <p className="text-red-500">{error.price}</p>}

        {/* Supplier */}
        <input
          type="text"
          //placeholder="Supplier"
          className="p-3 border rounded-lg"
          id="supplier"
          //value={supplier}
          value={supplier}
          onChange={(e)=>{setSupplier(e.target.value)}}
        />
        {error?.supplier && <p className="text-red-500">{error.supplier}</p>}

        {/* Description */}
        <textarea
          //placeholder="Description"
          className="p-3 border rounded-lg"
          id="description"
          //value={description}
          value={description}
          onChange={(e)=>{setDescription(e.target.value)}}
        ></textarea>

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
          value={"Update Inventory"}
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95"
        />
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
    </div>
    </div>
    
  );
};

export default DashUpdateInventory;
