import { create } from "zustand";
import {AuthState} from "@/types"


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  setAuth: (user, token) =>{
    localStorage.setItem("auth", JSON.stringify({ user, token }));
    set({ user, token, isLoading: false, error: null });
  },

  setError: (error) =>
    set({ error, isLoading: false }),

  clearError: () => set({ error: null }),

  logout: () => {
     localStorage.removeItem("auth");
    set({ user: null, token: null });
   
  },
}));

