import { useState, useEffect } from "react";
import { api } from "../libs/axiosBase";
import { AuthenticatedUser, AuthenticationResponse, UserLogin } from "../commons/type";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
        token
      )}`;      
      setAuthenticated(true);
      setAuthenticatedUser(JSON.parse(user));
    }

    setLoading(false);
  }, []);

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = "";
    setAuthenticatedUser(undefined);
  }

  function handleLogin(response: AuthenticationResponse) {
    localStorage.setItem("token", JSON.stringify(response.token));
    localStorage.setItem("user", JSON.stringify(response.user));
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;
      setAuthenticatedUser(response.user);
      setAuthenticated(true);
  }

  return {
    authenticated,
    authenticatedUser,
    loading,
    setAuthenticated, 
    setAuthenticatedUser,
    handleLogin,
    handleLogout,
  };
}