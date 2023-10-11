import { ReactNode } from "react";

export type AuthState = {
  isAuthenticated: boolean;
};

export type AuthAction =
  | { type: "LOGIN"; payload: UserData }
  | { type: "LOGOUT" }
  | { type: "SET_AUTH_STATE"; payload: boolean };

export type UserData = { username: string; password: string };

export type AuthProviderProps = {
  children: ReactNode;
};
export type AuthContextType = {
  state: AuthState;
  login: (userData: UserData) => void;
  logout: () => void;
};
