import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import "./App.css";
import { routes } from "./routes";

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
      </AuthProvider>
    </div>
  );
};

export default App;
