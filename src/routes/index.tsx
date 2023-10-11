import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

export const routes = [
  { path: "/", element: <ProtectedRoute component={HomePage} /> },
  { path: "/login", element: <LoginPage /> },
];
