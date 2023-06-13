import { useState, useEffect } from "react";
import { api } from "../libs/axiosBase";
import { AuthenticatedUser, AuthenticationResponse } from "../commons/type";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    async function getVerify() {
      const token: string | null = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      let verified = false;
      try {
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
            token
          )}`; 
        }
        await api.get("/token/verify");
        verified  = true;
      } catch (error: unknown) {
        verified  = false;
      }
      if (token && user && verified) {
        api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
          token
        )}`;      
        setAuthenticated(true);
        setAuthenticatedUser(JSON.parse(user));
        verified  = true;
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setAuthenticated(false);
        setAuthenticatedUser(undefined);
        verified = false;
      }
    }

    getVerify();

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