import { Outlet, Navigate } from "react-router";

export default function NoLoggedIn() {
  const token = localStorage.getItem("access_token_spotify");

  if (token === null || !token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
