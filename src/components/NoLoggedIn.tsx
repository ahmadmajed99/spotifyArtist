import { Outlet, Navigate } from "react-router";

export default function NoLoggedIn() {
  const token = localStorage.getItem("token");

  if (token === null || !token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
