import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../utils/setCokie";

const ProtectedRoute = () => {
  const token = getCookie("token");
  const role = getCookie("role");

  return token && token !== "null" && role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-login" />
  );
};

export default ProtectedRoute;
