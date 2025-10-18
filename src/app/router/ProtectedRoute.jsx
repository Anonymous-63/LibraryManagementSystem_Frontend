import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

export const ProtectedRoute = ({ roles }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.some((r) => user.roles.includes(r))) {
    return <div className="p-6 text-red-600">403 — Forbidden</div>;
  }

  return <Outlet />;
};