import { Products } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface for the PostState
interface PostState {
  post?: Products;
  savePost: (newPost: Products) => void;
}

// Wrap the `localStorage` with an adapter to match Zustand's expected storage type
const localStorageAdapter = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

// Create the store with Zustand's persist middleware using the adapter
export const usePost = create<PostState>()(
  persist(
    (set) => ({
      savePost: (newPost: Products) => set({ post: newPost }),
    }),
    {
      name: "post-storage", // Name of the storage key
      storage: localStorageAdapter, // Use the custom localStorage adapter
    }
  )
);
