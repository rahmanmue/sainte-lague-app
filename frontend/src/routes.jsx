import { Navigate, Outlet } from "react-router-dom";
import Layout from "./components/Layout/Index";
import { isRole } from "./utils";
import { useSelector } from "react-redux";

const accessToLogin = () => {
  const state = useSelector((state) => state.rootReducer.data);
  const id = state.userId;
  const userRole = isRole(localStorage.getItem("hashCode"));

  return id && userRole ? true : false;
};

export const ProtectedRoutes = () => {
  const access = accessToLogin();
  const userRole = isRole(localStorage.getItem("hashCode"));

  return (access && userRole === "user") || (access && userRole === "admin") ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export const PublicRoute = () => {
  const access = accessToLogin();
  const userRole = isRole(localStorage.getItem("hashCode"));

  return (access && userRole === "user") || (access && userRole === "admin") ? (
    <Navigate to="/home" />
  ) : (
    <Outlet />
  );
};
