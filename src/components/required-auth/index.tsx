import { useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

interface RequireAuthProps {
  allowedRoles: string[];
}

export function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { authenticated, authenticatedUser, verifyAuthentication, handleVerifyAuthentication } = useContext(AuthContext);
  const location = useLocation();




  return authenticatedUser  && allowedRoles?.includes(authenticatedUser?.role) ? (
    <Outlet />
  ) : authenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
