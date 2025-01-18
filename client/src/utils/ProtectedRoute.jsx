import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../store";

const ProtectedRoute = ({ redirectIfAuthenticated = false }) => {
  const { user } = useUser();
  if (user && redirectIfAuthenticated) return <Navigate to="/" replace/>;
  if (!user && !redirectIfAuthenticated) return <Navigate to="/login" replace/>;
  return <Outlet />;
};
export default ProtectedRoute;
