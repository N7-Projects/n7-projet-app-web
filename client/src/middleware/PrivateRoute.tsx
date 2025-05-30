import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider.tsx";

const PrivateRoute = () => {
  const user = useAuth();
  if (user != null && !user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

const ProtectedEditTeam = () => {
  return <Outlet />;
};

export { PrivateRoute, ProtectedEditTeam };
