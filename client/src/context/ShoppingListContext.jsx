import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get the current user from Redux store
  const { currentUser } = useSelector(state => state.user);

  // Define fetchShoppingList function
const fetchShoppingList = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!currentUser) {
        console.log("No user logged in, skipping fetch");
        setShoppingList([]);
        return;
      }
      
      // Make sure axios is configured to send credentials with requests
      const response = await axios.get("/api/shopping-list", {
        withCredentials: true
      });
      
      console.log("Shopping list response:", response.data);
      setShoppingList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
      setError(error.response?.data?.message || "Failed to fetch shopping list");
      setShoppingList([]);
    } finally {
      setLoading(false);
    }
  };
  
  
  // Add a new item
const addItem = async (itemData) => {
    setLoading(true);
    setError(null);
    try {
      if (!currentUser?._id) {
        throw new Error("User not authenticated. Please sign in.");
      }
      
      const dataWithUser = {
        ...itemData,
        addedBy: currentUser._id
      };
      
      console.log("Sending data:", dataWithUser); // Debug what's being sent
      
      const response = await axios.post("/api/shopping-list", dataWithUser);
      setShoppingList([...shoppingList, response.data.data]);
      return response.data;
    } catch (error) {
      console.error("Error adding item:", error);
      setError(error.response?.data?.message || "Failed to add item");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  

  // Update an item
  const updateItem = async (id, itemData) => {
    setLoading(true);
    setError(null);
    try {
      if (!currentUser || !currentUser._id) {
        toast.error("You must be logged in to update items");
        throw new Error("User not authenticated");
      }
      
      const response = await axios.put(`/api/shopping-list/${id}`, itemData);
      setShoppingList(
        shoppingList.map((item) => (item._id === id ? response.data.data : item))
      );
      toast.success("Item updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error(error.response?.data?.message || "Failed to update item");
      setError(error.response?.data?.message || "Failed to update item");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    try {
      if (!currentUser || !currentUser._id) {
        toast.error("You must be logged in to delete items");
        throw new Error("User not authenticated");
      }
      
      await axios.delete(`/api/shopping-list/${id}`);
      setShoppingList(shoppingList.filter((item) => item._id !== id));
      toast.success("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error(error.response?.data?.message || "Failed to delete item");
      setError(error.response?.data?.message || "Failed to delete item");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update item order (for drag and drop)
  const updateItemOrder = async (reorderedItems) => {
    try {
      if (!currentUser || !currentUser._id) {
        toast.error("You must be logged in to reorder items");
        throw new Error("User not authenticated");
      }
      
      // Optimistically update the UI
      setShoppingList(reorderedItems);
      
      // Prepare data for API
      const itemsForApi = reorderedItems.map((item, index) => ({
        id: item._id,
        order: index
      }));
      
      // Send to API
      await axios.post("/api/shopping-list/reorder", { items: itemsForApi });
    } catch (error) {
      console.error("Error reordering items:", error);
      toast.error("Failed to reorder items");
      // Revert to original order if there's an error
      fetchShoppingList();
      throw error;
    }
  };

  // Toggle item status (purchased/not purchased)
  const toggleItemStatus = async (id, currentStatus) => {
    try {
      if (!currentUser || !currentUser._id) {
        toast.error("You must be logged in to update item status");
        throw new Error("User not authenticated");
      }
      
      await updateItem(id, { status: !currentStatus });
      toast.success(`Item marked as ${!currentStatus ? 'purchased' : 'not purchased'}`);
    } catch (error) {
      console.error("Error toggling item status:", error);
      toast.error("Failed to update item status");
      throw error;
    }
  };

  useEffect(() => {
    if (currentUser) {
      console.log("User is logged in, fetching shopping list");
      fetchShoppingList();
    } else {
      console.log("No user logged in, clearing shopping list");
      setShoppingList([]);
    }
  }, [currentUser]); // Re-fetch when user changes
  

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        loading,
        error,
        fetchShoppingList,
        addItem,
        updateItem,
        deleteItem,
        updateItemOrder,
        toggleItemStatus,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => useContext(ShoppingListContext);
