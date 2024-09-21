interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEmployee: boolean;
  isPatient: boolean;
  loginMode: "patient" | "employee" | "admin";
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  setLoginMode: (mode: "patient" | "employee" | "admin") => void;
  login: (userData: any, mode: "patient" | "employee" | "admin") => void;
  logout: () => void;
}

export type {AuthState}