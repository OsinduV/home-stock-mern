import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
//import HoverEffectButton from './HoverEffectButton';

export default function DashInventory() {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  // const fetchInventory = () => {
  //   axios.get('http://localhost:5000/api/v1/products/all-inventory')
  //     .then(response => {
  //       console.log(response)
  //       if (Array.isArray(response.data)) {
  //         setInventory(response.data);
  //       } else {
  //         console.error('Invalid data format, expected an array');
  //       }

  //       console.log(response)
  //     })
  //     .catch(error => console.error('Error fetching inventory:', error));
  // };

  const fetchInventory = async()=>{
    const response = await axios.get('http://localhost:5000/api/v1/products/all-inventory');

    if(response){
      const result = await response.data;
      setInventory(result.data);
    }
  }

  const handleAddInventory = () => {
    navigate("/add-inventory");  // Redirect to Add Inventory page
  };

  const handleEditInventory = (id) => {
    navigate(`/update-inventory/${id}`);   // Redirect to Edit Inventory page with the item's ID
  };

  const handleDeleteInventory = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      axios.delete(`http://localhost:5000/api/v1/products/delete-inventory/${id}`)
        .then(() => {
          // Remove the item from the state after successful deletion
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
        {/* <HoverEffectButton onClick={handleAddInventory}>
           + Add Inventory
           </HoverEffectButton> */}
      </div> 
      <br/><br/>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {/* <th className="px-4 py-2 border-b">ID</th> */}
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Supplier</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Updated At</th>
              <th className="px-4 py-2 border-b">Actions</th> {/* New Actions Column */}
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                {/* <td className="px-4 py-2">{item._id}</td>  */}
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">Rs{item.price}/=</td>
                <td className="px-4 py-2">{item.supplier}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{new Date(item.updatedAt).toLocaleString()}</td>
                <td className="px-4 py-2 flex space-x-4 justify-center">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditInventory(item._id)}
                    className="text-yellow-600 hover:text-green-800"
                  >
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </button>
                  {/* Delete Button */}
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
