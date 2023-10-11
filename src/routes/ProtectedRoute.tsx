import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const { state } = useContext(AuthContext);
  const { isAuth } = state;

  return isAuth ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
