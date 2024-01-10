import { Navigate, Outlet } from "react-router-dom";
import Layout from "./components/Layout/Index";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoutes = () => {
  const decoded = jwtDecode(localStorage.getItem("token"));
  const userRole = decoded.role;

  return userRole === "user" || userRole === "admin" ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export const PublicRoute = () => {
  const decoded = jwtDecode(localStorage.getItem("token"));
  const userRole = decoded.role;

  return userRole === "user" || userRole === "admin" ? (
    <Navigate to="/home" />
  ) : (
    <Outlet />
  );
};
