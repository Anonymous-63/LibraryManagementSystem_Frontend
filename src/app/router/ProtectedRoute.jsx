import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAbac } from "../../features/dashboard/useAbac";

export const ProtectedRoute = ({ roles, abac }) => {
  const location = useLocation();
  const { user, policies } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based check
  if (roles && !roles.some((r) => user.roles.includes(r))) {
    return <div className="p-6 text-red-600">403 — Forbidden (Role)</div>;
  }

  // ✅ Always call the hook
  const isAllowed = useAbac(abac?.resource, abac?.action);

  // ABAC check
  if (abac && !isAllowed) {
    return <div className="p-6 text-red-600">403 — Forbidden (Permission)</div>;
  }

  return <Outlet />;
};