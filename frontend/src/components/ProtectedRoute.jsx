import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuth = localStorage.getItem("isAuth");

  // ✅ STRICT CHECK
  if (isAuth !== "true") {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
