/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {AuthState} from "@/@types/authStore"

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAdmin: false,
      isEmployee: false,
      isPatient: false,
      loginMode: "patient",
      user: null,

      setLoginMode: (mode: "patient" | "employee" | "admin") =>
        set({
          loginMode: mode,
        }),

      login: (userData, mode) => {
        set({
          isAuthenticated: true,
          user: userData,
          isAdmin: mode === "admin",
          isEmployee: mode === "employee",
          isPatient: mode === "patient",
        });
      },

      logout: () =>
        set({
          isAuthenticated: false,
          isAdmin: false,
          isEmployee: false,
          isPatient: false,
          user: null,
          loginMode: "patient",
        }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);