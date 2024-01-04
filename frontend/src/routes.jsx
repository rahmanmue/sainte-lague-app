import { Navigate, Outlet } from "react-router-dom";
import Layout from "./components/Layout/Index";
import { isRole } from "./utils";

export const ProtectedRoutes = () => {
  const userRole = isRole(localStorage.getItem("hashCode"));
  // console.log(userRole);
  return userRole === "user" || userRole === "admin" ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export const PublicRoute = () => {
  const userRole = isRole(localStorage.getItem("hashCode"));
  // console.log(userRole);
  return userRole === "user" || userRole === "admin" ? (
    <Navigate to="/home" />
  ) : (
    <Outlet />
  );
};
