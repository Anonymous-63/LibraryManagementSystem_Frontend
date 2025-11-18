import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
import { refreshTokenSuccess } from "../../features/auth/authSlice";
import { useAbac } from "../../features/dashboard/useAbac";

export const ProtectedRoute = ({ resource, action }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const storedToken = localStorage.getItem("accessToken");
  let finalUser = user;

  // rehydrate user
  if (!finalUser && storedToken) {
    try {
      const decoded = jwtDecode(storedToken);
      finalUser = {
        id: decoded.userId,
        email: decoded.sub
      };
      dispatch(refreshTokenSuccess(storedToken));
    } catch (e) {
      console.error("Invalid token", e);
    }
  }

  // still no user → login
  if (!finalUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ABAC check
  const { check } = useAbac();
  if (!check(resource, action)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
