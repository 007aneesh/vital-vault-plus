/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  loginMode: "patient", // or 'employee'
  setLoginMode: (mode: any) => set({ loginMode: mode }),
}));
