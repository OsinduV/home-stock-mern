import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function DashInventory() {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/products/all-inventory');
    if (response) {
      const result = await response.data;
      // Sort items in descending order by createdAt
      const sorted = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setInventory(sorted);
    }
  };

  const handleAddInventory = () => {
    navigate("/add-inventory");
  };

  const handleEditInventory = (id) => {
    navigate(`/update-inventory/${id}`);
  };

  const handleDeleteInventory = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      axios.delete(`http://localhost:5000/api/v1/products/delete-inventory/${id}`)
        .then(() => {
          setInventory(inventory.filter(item => item._id !== id));
          alert('Inventory deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting inventory:', error);
        });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Inventory List</h2>
      </div>
      <br /><br />

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Supplier</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Updated At</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">Rs{item.price}/=</td>
                <td className="px-4 py-2">{item.supplier}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{new Date(item.updatedAt).toLocaleString()}</td>
                <td className="px-4 py-2 flex space-x-4 justify-center">
                  <button
                    onClick={() => handleEditInventory(item._id)}
                    className="text-yellow-600 hover:text-green-800"
                  >
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </button>
                  <button
                    onClick={() => handleDeleteInventory(item._id)}
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
  );
}
