import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../store";

type ProtectedRouteProps = {
  redirectIfAuthenticated?: boolean;
};
const ProtectedRoute = ({ redirectIfAuthenticated = false }: ProtectedRouteProps) => {
  const { user } = useUser();
  if (user && redirectIfAuthenticated) return <Navigate to="/" replace />;
  if (!user && !redirectIfAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};
export default ProtectedRoute;
