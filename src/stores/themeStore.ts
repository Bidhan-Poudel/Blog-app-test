import { create } from "zustand";
import { ThemeState } from "@/types";


export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light", // Default without localStorage access
  setTheme: (newTheme) => set({ theme: newTheme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
