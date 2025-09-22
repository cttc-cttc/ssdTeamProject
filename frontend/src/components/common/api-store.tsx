import { create } from "zustand";

interface ApiStore {
  API_BASE: string;
}

export const useApiStore = create<ApiStore>(() => ({
  API_BASE: import.meta.env.MODE === "development" ? "" : import.meta.env.VITE_API_URL,
}));
