import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import HoverEffectButton from './HoverEffectButton';

export default function DashCategory() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async()=>{
    const response = await axios.get('http://localhost:5000/api/v1/category/all-category');

    if(response){
      const result = await response.data;
      setCategory(result.data);
    }
  }

  const handleAddCategory = () => {
    navigate("/add-category");  // Redirect to Add Inventory page
  };

  const handleEditCategory = (id) => {
    navigate(`/update-category/${id}`);  // Redirect to Edit Inventory page with the item's ID
  };
  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      axios.delete(`http://localhost:5000/api/v1/category/delete-category/${id}`)
        .then(() => {
          // Remove the item from the state after successful deletion
          setCategory(category.filter(item => item._id !== id));
          alert('Category deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting category:', error);
        });
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6 min-h-screen bg-gray-300 bg-cover bg-center" 
    style={{ backgroundImage: "url('/images/i1_background.jpg')", backgroundOpacity: 0.5 }}>
            

      <div>
        <h2 className="text-3xl font-bold text-green-800">Category List</h2>
        <HoverEffectButton onClick={handleAddCategory}>
  + Add Category
           </HoverEffectButton>
      </div>

      <div className="flex items-center justify-center min-h-screen">
  <div className="overflow-x-auto w-3/4">
    <table className="w-full table-auto bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="px-4 py-2 border-b">ID</th>
          <th className="px-4 py-2 border-b">Category_Name</th>
          <th className="px-4 py-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {category.map(item => (
          <tr key={item._id} className="border-b hover:bg-gray-100">
            <td className="px-4 py-2">{item.category_id}</td> 
            <td className="px-4 py-2">{item.category_name}</td>
            <td className="px-4 py-2 flex space-x-4 justify-center">
              {/* Edit Button */}
              <button
                onClick={() => handleEditCategory(item._id)}
                className="text-yellow-600 hover:text-green-800"
              >
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </button>
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteCategory(item._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>

)
}
