import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

interface RequireAuthProps {
  allowedRoles: string[];
}

export function RequireAuth({ allowedRoles }: RequireAuthProps) { 
  let { authenticated, authenticatedUser } = useContext(AuthContext);
  const location = useLocation();

  var token = localStorage.getItem("token");
  var user  = localStorage.getItem("user");
  if (token && user !== null) {
    const obj = JSON.parse(user);
    (authenticated = true);
    (authenticatedUser = obj);
    console.log(authenticatedUser)
    console.log(allowedRoles)
  }

  return authenticatedUser  && allowedRoles?.includes(authenticatedUser?.role) ? (
    <Outlet />
  ) : authenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
