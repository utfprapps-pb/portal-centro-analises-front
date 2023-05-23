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

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
        token
      )}`;      
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = "";
    setAuthenticatedUser(undefined);
  }

  async function handleLogin(response: AuthenticationResponse) {
    localStorage.setItem("token", JSON.stringify(response.token));
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;
      console.log(response.user)
      setAuthenticatedUser(response.user);
      setAuthenticated(true);
      console.log("===")
      console.log(authenticatedUser)
  }

  return {
    authenticated,
    authenticatedUser,
    loading,
    handleLogin,
    handleLogout,
  };
}