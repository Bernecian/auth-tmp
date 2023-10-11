import { createContext, useReducer, useEffect } from "react";
import type {
  AuthState,
  AuthAction,
  AuthContextType,
  AuthProviderProps,
  UserData,
} from "./types";

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      const { username, password } = action.payload;
      const isCredentialsCorrect = username === "Test" && password === "123";

      if (isCredentialsCorrect) {
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      }

      return { isAuthenticated: isCredentialsCorrect };

    case "SET_AUTH_STATE":
      return { isAuthenticated: action.payload };

    case "LOGOUT":
      localStorage.removeItem("isAuthenticated");

      return { isAuthenticated: false };
    default:
      return state;
  }
};

const initialState: AuthState = {
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const isAuth = storedAuth ? JSON.parse(storedAuth) : false;

    dispatch({ type: "SET_AUTH_STATE", payload: isAuth });
  }, []);

  const login = (userData: UserData) => {
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
