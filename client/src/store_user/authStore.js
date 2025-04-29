import { create } from "zustand";
import axios from "axios";
import { errorHandler } from "../../../server/utils/error";

const API_URL = "http://localhost:5000/api/auth";

export const useAuthStore = create((set) => ({
  isLoading: false,
  error: null,
  user: null,
  isAuthenticated: false,
  message: null,

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error verifying email";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/check-auth`);

      if (response.data.user) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      } else {
        set({ isAuthenticated: false, user: null, isCheckingAuth: false });
      }
    } catch (error) {
      console.log("Error checking auth:", error);
      set({
        error: null,
        isCheckingAuth: false,
        isAuthenticated: false,
        user: null,
      });
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, 
       { email},
      {withCredentials:true});
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
