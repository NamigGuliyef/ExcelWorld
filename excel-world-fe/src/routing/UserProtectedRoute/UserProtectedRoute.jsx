import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../utils/setCokie";

const UserProtectedRoute = () => {
  const token = getCookie("token");
  const role = getCookie("role");

  return token && token !== "null" && role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default UserProtectedRoute;
