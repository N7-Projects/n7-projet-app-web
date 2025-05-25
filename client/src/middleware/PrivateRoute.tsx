import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider.tsx";

const PrivateRoute = () => {
  const user = useAuth();
  if (user != null && !user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
