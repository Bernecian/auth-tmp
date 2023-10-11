import { ReactNode } from "react";

export type AuthState = {
  authLoading: boolean;
  authError: string | null;
  isAuth: boolean;
};

export type AuthAction =
  | { type: "SET_IS_AUTH"; payload: boolean }
  | { type: "SET_AUTH_LOADING"; payload: boolean }
  | { type: "SET_AUTH_ERROR"; payload: string | null };

export type UserData = { username: string; password: string };

export type AuthProviderProps = {
  children: ReactNode;
};
export type AuthContextType = {
  state: AuthState;
  login: (userData: UserData) => void;
  logout: () => void;
};
