import { createContext, useReducer } from "react";
import type {
  AuthState,
  AuthAction,
  AuthContextType,
  AuthProviderProps,
  UserData,
} from "./types";
import LocalStorageService from "../services/localStorage";

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_IS_AUTH":
      return {
        ...state,
        isAuth: action.payload,
      };

    case "SET_AUTH_LOADING":
      return {
        ...state,
        authLoading: action.payload,
      };

    case "SET_AUTH_ERROR":
      return {
        ...state,
        authError: action.payload,
      };

    default:
      return state;
  }
};

const { removeToken, setToken, getToken } = LocalStorageService;

const initialState: AuthState = {
  isAuth: !!getToken(),
  authError: null,
  authLoading: false,
};

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = (userData: UserData) => {
    try {
      dispatch({ type: "SET_AUTH_LOADING", payload: true });
      const { username, password } = userData;
      if (username === "Test" && password === "123") {
        dispatch({ type: "SET_IS_AUTH", payload: true });
        dispatch({ type: "SET_AUTH_ERROR", payload: null });
        setToken("sometoken");
      } else {
        throw new Error("Wrong credentials");
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "SET_AUTH_ERROR", payload: error.message });
      } else {
        dispatch({ type: "SET_AUTH_ERROR", payload: "Unexpected error" });
      }
    } finally {
      dispatch({ type: "SET_AUTH_LOADING", payload: false });
    }
  };

  const logout = () => {
    removeToken();
    dispatch({ type: "SET_IS_AUTH", payload: false });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
