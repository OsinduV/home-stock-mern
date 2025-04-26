import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddInventoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
    description: "",
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0)
      newErrors.quantity = "Quantity must be a valid positive number";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Price must be a valid positive number";
    if (!formData.supplier.trim()) newErrors.supplier = "Supplier is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const res = await fetch("/api/v1/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          setError({ general: data.message || "Something went wrong" });
          setLoading(false);
          return;
        }

        setLoading(false);
        setFormData({
          name: "",
          category: "",
          quantity: "",
          price: "",
          supplier: "",
          description: "",
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        });

        navigate("/dashboard?tab=inventory");
      } catch (error) {
        setLoading(false);
        setError({ general: "Network error. Please check your connection and try again." });
      }
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Add Inventory</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {[
          { id: "name", type: "text", placeholder: "Name" },
          { id: "category", type: "text", placeholder: "Category" },
          { id: "quantity", type: "number", placeholder: "Quantity" },
          { id: "price", type: "number", placeholder: "Price" },
          { id: "supplier", type: "text", placeholder: "Supplier" },
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

        <textarea
          placeholder="Description"
          className="p-3 border rounded-lg w-full"
          id="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <input
          type="text"
          className="p-3 border rounded-lg bg-gray-100 w-full"
          value={formData.createdAt}
          readOnly
        />

        <input
          type="text"
          className="p-3 border rounded-lg bg-gray-100 w-full"
          value={formData.updatedAt}
          readOnly
        />

        <button
          type="submit"
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Adding..." : "Add Inventory"}
        </button>
      </form>

      {error.general && <p className="text-red-500 mt-3">{error.general}</p>}
    </div>
  );
};

export default AddInventoryForm;

