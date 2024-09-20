/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// interface AuthStoreInterface {
//   authenticated: boolean; 
//   setAuthentication: (val: boolean) => void;
//   user: any; 
//   setUser: (user: any) => void; 
// }

// export const useAuthStore = create<AuthStoreInterface>((set) => ({
//   authenticated: false, 
//   user: {}, 
//   setAuthentication: (val) => set((state) => ({ authenticated: val })),
//   setUser: (user) => set({ user }),
// }));
// store.js

export const useAuthStore = create((set) => ({
  loginMode: "patient", // or 'employee'
  setLoginMode: (mode: any) => set({ loginMode: mode }),
}));
