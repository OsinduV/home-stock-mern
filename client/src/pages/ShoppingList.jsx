import { useState, useEffect } from "react";
import { useShoppingList } from "../context/ShoppingListContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrash, FaCheck, FaPlus, FaTimes, FaShoppingBasket } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import toast from "react-hot-toast";

export default function ShoppingList() {
  const {
    shoppingList,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    updateItemOrder,
    toggleItemStatus,
  } = useShoppingList();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: 1,
    priority: "Medium",
  });

  const [editingItem, setEditingItem] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, purchased
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [
    "Dairy",
    "Meat",
    "Vegetables",
    "Fruits",
    "Bakery",
    "Beverages",
    "Snacks",
    "Canned",
    "Frozen",
    "Household",
    "Other",
  ];

  const priorities = ["Low", "Medium", "High"];

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? parseInt(value) || "" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.itemName || !formData.category || !formData.quantity) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      if (editingItem) {
        await updateItem(editingItem._id, formData);
        toast.success("Item updated successfully");
        setEditingItem(null);
      } else {
        await addItem(formData);
        toast.success("Item added to shopping list");
      }
      setFormData({
        itemName: "",
        category: "",
        quantity: 1,
        priority: "Medium",
      });
      setIsFormVisible(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      itemName: item.itemName,
      category: item.category,
      quantity: item.quantity,
      priority: item.priority,
    });
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        toast.success("Item deleted successfully");
      } catch (error) {
        toast.error("Failed to delete item");
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleItemStatus(id, currentStatus);
    } catch (error) {
      toast.error("Failed to update item status");
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(shoppingList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateItemOrder(items);
  };

  const filteredItems = shoppingList.filter((item) => {
    // First filter by status
    if (filter === "pending" && item.status) return false;
    if (filter === "purchased" && !item.status) return false;
    
    // Then filter by category
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Dairy: "bg-blue-100",
      Meat: "bg-red-100",
      Vegetables: "bg-green-100",
      Fruits: "bg-yellow-100",
      Bakery: "bg-orange-100",
      Beverages: "bg-purple-100",
      Snacks: "bg-pink-100",
      Canned: "bg-gray-100",
      Frozen: "bg-indigo-100",
      Household: "bg-teal-100",
      Other: "bg-gray-100",
    };
    return colors[category] || "bg-gray-100";
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaShoppingBasket className="mr-2 text-green-600" />
          Shopping List
        </h1>
        <button
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            setEditingItem(null);
            setFormData({
              itemName: "",
              category: "",
              quantity: 1,
              priority: "Medium",
            });
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          {isFormVisible ? (
            <>
              <FaTimes className="mr-2" /> Cancel
            </>
          ) : (
            <>
              <FaPlus className="mr-2" /> Add Item
            </>
          )}
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? "Edit Item" : "Add New Item"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsFormVisible(false);
                  setEditingItem(null);
                }}
                className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingItem ? "Update Item" : "Add Item"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="flex mb-2 md:mb-0">
            <button
              onClick={() => setFilter("all")}
              className={`mr-2 px-3 py-1 rounded-md ${
                filter === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`mr-2 px-3 py-1 rounded-md ${
                filter === "pending"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("purchased")}
              className={`px-3 py-1 rounded-md ${
                filter === "purchased"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Purchased
            </button>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No items in your shopping list</p>
            <button
              onClick={() => setIsFormVisible(true)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              <FaPlus className="inline mr-2" /> Add Your First Item
            </button>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="shoppingList">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {filteredItems.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`border rounded-lg p-4 flex items-center justify-between ${
                            item.status ? "bg-gray-100" : "bg-white"
                          }`}
                        >
                          <div className="flex items-center flex-1">
                            <div
                              {...provided.dragHandleProps}
                              className="mr-3 text-gray-400 cursor-grab"
                            >
                              <MdDragIndicator size={20} />
                            </div>
                            
                            <button
                              onClick={() => handleToggleStatus(item._id, item.status)}
                              className={`mr-3 w-6 h-6 rounded-full flex items-center justify-center ${
                                item.status
                                  ? "bg-green-500 text-white"
                                  : "border-2 border-gray-300"
                              }`}
                            >
                              {item.status && <FaCheck size={12} />}
                            </button>
                            
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span
                                  className={`font-medium ${
                                    item.status ? "line-through text-gray-500" : ""
                                  }`}
                                >
                                  {item.itemName}
                                </span>
                                <span
                                  className={`ml-2 text-sm ${getPriorityColor(
                                    item.priority
                                  )}`}
                                >
                                  {item.priority}
                                </span>
                              </div>
                              <div className="flex items-center mt-1">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                                    item.category
                                  )}`}
                                >
                                  {item.category}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">
                                  Qty: {item.quantity}
                                </span>
                                <span className="ml-2 text-xs text-gray-400">
                                  {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-blue-500 hover:text-blue-700 mr-2"
                              title="Edit"
                            >
                              <FaEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete"
                            >
                              <FaTrash size={18} />
                            </button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
        
        {filteredItems.length > 0 && (
          <div className="mt-4 text-right text-sm text-gray-500">
            {filteredItems.filter(item => item.status).length} of {filteredItems.length} items purchased
          </div>
        )}
        
        {/* Share button */}
        {shoppingList.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <button
              onClick={() => {
                // Generate a shareable link or copy list to clipboard
                const listText = shoppingList
                  .map(item => `${item.itemName} (${item.quantity}) - ${item.category}`)
                  .join('\n');
                
                navigator.clipboard.writeText(listText)
                  .then(() => toast.success("Shopping list copied to clipboard!"))
                  .catch(() => toast.error("Failed to copy list"));
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Share List
            </button>
          </div>
        )}
      </div>
      
      {/* Statistics Section */}
      {shoppingList.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shopping List Stats</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold">{shoppingList.length}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Purchased</p>
              <p className="text-2xl font-bold">
                {shoppingList.filter(item => item.status).length}
              </p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold">
                {shoppingList.filter(item => !item.status).length}
              </p>
            </div>
          </div>
          
          {/* Category breakdown */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories
                .filter(category => 
                  shoppingList.some(item => item.category === category)
                )
                .map(category => {
                  const count = shoppingList.filter(
                    item => item.category === category
                  ).length;
                  return (
                    <div key={category} className={`p-2 rounded-md ${getCategoryColor(category)}`}>
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-xs ml-1 text-gray-600">({count})</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
